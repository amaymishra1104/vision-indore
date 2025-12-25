const express = require('express');
const router = express.Router();
const { 
  analyzeInfrastructureIssue, 
  isValidBase64Image, 
  parseBase64DataUrl 
} = require('../services/geminiService');
const { saveIssue } = require('../services/firestoreService');

/**
 * POST /api/detect/analyze
 * Analyzes an image for infrastructure issues
 * Body: { image: base64String, lat: number, lng: number }
 */
router.post('/analyze', async (req, res) => {
  try {
    const { image, lat, lng } = req.body;

    // Validation
    if (!image) {
      return res.status(400).json({ 
        error: 'Image is required' 
      });
    }

    if (!lat || !lng) {
      return res.status(400).json({ 
        error: 'Location coordinates (lat, lng) are required' 
      });
    }

    if (!isValidBase64Image(image)) {
      return res.status(400).json({ 
        error: 'Invalid base64 image format' 
      });
    }

    // Parse base64 and mime type
    const { base64, mimeType } = parseBase64DataUrl(image);

    console.log(`📸 Analyzing image at coordinates: ${lat}, ${lng}`);

    // Analyze with Gemini AI
    const aiResult = await analyzeInfrastructureIssue(base64, mimeType);

    // If an issue is detected, save to Firestore
    if (aiResult.issue_type !== 'none' && aiResult.confidence_score > 0.5) {
      const issueData = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        issue_type: aiResult.issue_type,
        severity: aiResult.severity,
        description: aiResult.description,
        confidence_score: aiResult.confidence_score,
        image_url: null // In production, upload to Cloud Storage and save URL
      };

      const savedIssue = await saveIssue(issueData);

      return res.status(201).json({
        success: true,
        message: 'Issue detected and saved',
        detection: aiResult,
        issue: savedIssue
      });
    }

    // No issue detected
    return res.status(200).json({
      success: true,
      message: 'No infrastructure issues detected',
      detection: aiResult
    });

  } catch (error) {
    console.error('Error in /api/detect/analyze:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze image' 
    });
  }
});

/**
 * POST /api/detect/batch
 * Analyzes multiple images in batch (for "Simulate Drive" feature)
 * Body: { images: [{ image: base64, lat: number, lng: number }] }
 */
router.post('/batch', async (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ 
        error: 'Array of images is required' 
      });
    }

    if (images.length > 10) {
      return res.status(400).json({ 
        error: 'Maximum 10 images allowed per batch' 
      });
    }

    console.log(`📸 Batch analyzing ${images.length} images`);

    const results = [];

    // Process each image sequentially (to avoid rate limits)
    for (let i = 0; i < images.length; i++) {
      const { image, lat, lng } = images[i];

      try {
        if (!image || !lat || !lng) {
          results.push({
            index: i,
            success: false,
            error: 'Missing image or coordinates'
          });
          continue;
        }

        const { base64, mimeType } = parseBase64DataUrl(image);
        const aiResult = await analyzeInfrastructureIssue(base64, mimeType);

        // Save if issue detected
        if (aiResult.issue_type !== 'none' && aiResult.confidence_score > 0.5) {
          const issueData = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            issue_type: aiResult.issue_type,
            severity: aiResult.severity,
            description: aiResult.description,
            confidence_score: aiResult.confidence_score,
            image_url: null
          };

          const savedIssue = await saveIssue(issueData);

          results.push({
            index: i,
            success: true,
            detection: aiResult,
            issue: savedIssue
          });
        } else {
          results.push({
            index: i,
            success: true,
            detection: aiResult,
            message: 'No issue detected'
          });
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`Error processing image ${i}:`, error);
        results.push({
          index: i,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const issuesDetected = results.filter(r => r.success && r.issue).length;

    res.status(200).json({
      success: true,
      message: `Processed ${successCount}/${images.length} images, detected ${issuesDetected} issues`,
      results
    });

  } catch (error) {
    console.error('Error in /api/detect/batch:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process batch' 
    });
  }
});

module.exports = router;

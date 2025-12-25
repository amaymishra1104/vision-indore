const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes an image using Google Gemini 1.5 Flash for infrastructure issues
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} mimeType - MIME type of the image (e.g., 'image/jpeg')
 * @returns {Promise<Object>} - Detection result with issue details
 */
async function analyzeInfrastructureIssue(base64Image, mimeType = 'image/jpeg') {
  try {
    // Get the Gemini 2.5 Flash Lite model (higher free tier limits)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // System prompt for infrastructure auditing
    const systemPrompt = `You are an expert city infrastructure auditor specializing in road and urban maintenance issues.

Analyze the provided image VERY CAREFULLY for ANY of these issues:

1. POTHOLES - ANY holes, cracks, road damage, depressions, or deteriorated road surfaces (even small ones count!)
2. TRASH/GARBAGE - Overflowing bins, litter piles, waste accumulation, scattered garbage on streets
3. BROKEN STREETLIGHTS - Non-functional lights, damaged poles, broken fixtures, dark streetlights

CRITICAL INSTRUCTIONS:
- Be EXTREMELY SENSITIVE to detecting issues
- Even MINOR road damage should be flagged as a pothole
- Small cracks or surface deterioration = pothole
- Any visible road defect = pothole
- Err on the side of DETECTION rather than missing issues

If you detect ANY issue, return ONLY this JSON (no markdown, no extra text):
{
  "issue_type": "pothole",
  "severity": 7,
  "description": "Detailed description of what you see",
  "confidence_score": 0.85
}

Issue types: "pothole", "trash", "broken_light"
Severity: 1-10 (1=minor crack, 5=moderate pothole, 10=major road hazard)
Confidence: 0.0 to 1.0

If ABSOLUTELY NO infrastructure issues visible, return:
{
  "issue_type": "none"
}

Return ONLY valid JSON, no markdown formatting, no code blocks.`;

    // Prepare the image part
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    };

    // Generate content with the image and prompt
    const result = await model.generateContent([
      systemPrompt,
      imagePart
    ]);

    const response = await result.response;
    const text = response.text();
    
    console.log('🔍 Gemini Raw Response:', text);
    
    // Parse the JSON response
    let parsedResult;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Raw response:', text);
      
      // Fallback: try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Unable to parse AI response as JSON');
      }
    }

    // Validate and normalize the response
    const normalized = {
      issue_type: parsedResult.issue_type || 'none',
      severity: parsedResult.severity || 0,
      description: parsedResult.description || 'No issue detected',
      confidence_score: parsedResult.confidence_score || 0
    };

    console.log('✅ AI Analysis Complete:', normalized);
    return normalized;

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
}

/**
 * Validates if a base64 string is a valid image
 * @param {string} base64String - Base64 string to validate
 * @returns {boolean}
 */
function isValidBase64Image(base64String) {
  if (!base64String || typeof base64String !== 'string') {
    return false;
  }
  
  // Check if it's a data URL or raw base64
  const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
  const rawBase64Pattern = /^[A-Za-z0-9+/]+=*$/;
  
  return base64Pattern.test(base64String) || rawBase64Pattern.test(base64String);
}

/**
 * Extracts base64 data and mime type from a data URL
 * @param {string} dataUrl - Data URL string
 * @returns {Object} - Object with base64 and mimeType
 */
function parseBase64DataUrl(dataUrl) {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  
  if (matches) {
    return {
      mimeType: matches[1],
      base64: matches[2]
    };
  }
  
  // Default to JPEG if no mime type specified
  return {
    mimeType: 'image/jpeg',
    base64: dataUrl
  };
}

module.exports = {
  analyzeInfrastructureIssue,
  isValidBase64Image,
  parseBase64DataUrl
};

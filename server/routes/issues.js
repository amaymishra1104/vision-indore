const express = require('express');
const router = express.Router();
const { 
  getIssues, 
  updateIssueStatus, 
  getRoadHealthStats 
} = require('../services/firestoreService');

/**
 * GET /api/issues
 * Retrieves all issues with optional filters
 * Query params: status, issue_type, limit
 */
router.get('/', async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      issue_type: req.query.issue_type,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const issues = await getIssues(filters);

    res.status(200).json({
      success: true,
      count: issues.length,
      issues
    });
  } catch (error) {
    console.error('Error in GET /api/issues:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to retrieve issues' 
    });
  }
});

/**
 * PATCH /api/issues/:id/status
 * Updates an issue's status
 * Body: { status: 'Open' | 'In Progress' | 'Resolved' }
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Open', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: `Status must be one of: ${validStatuses.join(', ')}` 
      });
    }

    const updatedIssue = await updateIssueStatus(id, status);

    res.status(200).json({
      success: true,
      message: 'Issue status updated',
      issue: updatedIssue
    });
  } catch (error) {
    console.error('Error in PATCH /api/issues/:id/status:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to update issue status' 
    });
  }
});

/**
 * GET /api/issues/stats/health
 * Retrieves road health statistics
 */
router.get('/stats/health', async (req, res) => {
  try {
    const stats = await getRoadHealthStats();

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error in GET /api/issues/stats/health:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to retrieve health stats' 
    });
  }
});

module.exports = router;

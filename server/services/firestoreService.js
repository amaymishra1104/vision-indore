const { db } = require('../config/firebase');

/**
 * Saves a detected issue to Firestore
 * @param {Object} issueData - Issue data to save
 * @returns {Promise<Object>} - Saved issue with ID
 */
async function saveIssue(issueData) {
  try {
    const issuesRef = db.collection('issues');
    
    const newIssue = {
      lat: issueData.lat,
      lng: issueData.lng,
      issue_type: issueData.issue_type,
      severity: issueData.severity,
      description: issueData.description,
      confidence_score: issueData.confidence_score || 0,
      image_url: issueData.image_url || null,
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const docRef = await issuesRef.add(newIssue);
    
    console.log(`✅ Issue saved to Firestore with ID: ${docRef.id}`);
    
    return {
      id: docRef.id,
      ...newIssue
    };
  } catch (error) {
    console.error('❌ Error saving issue to Firestore:', error);
    throw new Error(`Failed to save issue: ${error.message}`);
  }
}

/**
 * Retrieves all issues from Firestore
 * @param {Object} filters - Optional filters (status, issue_type, etc.)
 * @returns {Promise<Array>} - Array of issues
 */
async function getIssues(filters = {}) {
  try {
    let query = db.collection('issues');
    
    // Apply filters
    if (filters.status) {
      query = query.where('status', '==', filters.status);
    }
    
    if (filters.issue_type) {
      query = query.where('issue_type', '==', filters.issue_type);
    }
    
    // Order by creation time (newest first)
    query = query.orderBy('created_at', 'desc');
    
    // Limit results if specified
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    
    const snapshot = await query.get();
    
    const issues = [];
    snapshot.forEach(doc => {
      issues.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Retrieved ${issues.length} issues from Firestore`);
    return issues;
  } catch (error) {
    console.error('❌ Error retrieving issues from Firestore:', error);
    throw new Error(`Failed to retrieve issues: ${error.message}`);
  }
}

/**
 * Updates an issue's status
 * @param {string} issueId - Issue ID
 * @param {string} status - New status ('Open', 'In Progress', 'Resolved')
 * @returns {Promise<Object>} - Updated issue
 */
async function updateIssueStatus(issueId, status) {
  try {
    const issueRef = db.collection('issues').doc(issueId);
    
    await issueRef.update({
      status: status,
      updated_at: new Date().toISOString()
    });
    
    const updatedDoc = await issueRef.get();
    
    console.log(`✅ Issue ${issueId} status updated to: ${status}`);
    
    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };
  } catch (error) {
    console.error('❌ Error updating issue status:', error);
    throw new Error(`Failed to update issue: ${error.message}`);
  }
}

/**
 * Calculates road health statistics
 * @returns {Promise<Object>} - Health statistics
 */
async function getRoadHealthStats() {
  try {
    const snapshot = await db.collection('issues')
      .where('status', '==', 'Open')
      .get();
    
    let totalIssues = 0;
    let potholeCount = 0;
    let trashCount = 0;
    let lightCount = 0;
    let totalSeverity = 0;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      totalIssues++;
      totalSeverity += data.severity || 0;
      
      if (data.issue_type === 'pothole') potholeCount++;
      if (data.issue_type === 'trash') trashCount++;
      if (data.issue_type === 'broken_light') lightCount++;
    });
    
    const avgSeverity = totalIssues > 0 ? totalSeverity / totalIssues : 0;
    
    // Calculate grade (A-F) based on issue density and severity
    let grade;
    if (totalIssues === 0) grade = 'A';
    else if (avgSeverity < 3 && totalIssues < 5) grade = 'A';
    else if (avgSeverity < 4 && totalIssues < 10) grade = 'B';
    else if (avgSeverity < 5 && totalIssues < 20) grade = 'C';
    else if (avgSeverity < 7 && totalIssues < 30) grade = 'D';
    else grade = 'F';
    
    return {
      totalIssues,
      potholeCount,
      trashCount,
      lightCount,
      avgSeverity: avgSeverity.toFixed(2),
      grade
    };
  } catch (error) {
    console.error('❌ Error calculating road health stats:', error);
    throw new Error(`Failed to calculate stats: ${error.message}`);
  }
}

module.exports = {
  saveIssue,
  getIssues,
  updateIssueStatus,
  getRoadHealthStats
};

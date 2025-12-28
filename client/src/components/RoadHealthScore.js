import React, { useState } from 'react';

const RoadHealthScore = ({ stats, issues = [], getIssueIcon, getSeverityColor }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!stats) {
    return (
      <div className="bg-slate-800 rounded-lg border-2 border-slate-700 p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-8 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getIssuesByType = (type) => {
    return issues.filter(issue => issue.issue_type === type);
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A':
        return '#39FF14'; // Neon Green
      case 'B':
        return '#7FFF00'; // Chartreuse
      case 'C':
        return '#FFBF00'; // Amber
      case 'D':
        return '#FF8C00'; // Dark Orange
      case 'F':
        return '#EF4444'; // Red
      default:
        return '#94a3b8'; // Slate
    }
  };

  const gradeColor = getGradeColor(stats.grade);

  return (
    <div className="bg-slate-800 rounded-lg border-2 border-slate-700">
      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
        <h2 className="text-lg font-semibold text-neon-green flex items-center">
          <span className="mr-2">📊</span>
          Road Health Score
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-slate-400 mb-2">Overall Grade</div>
            <div
              className="text-6xl font-bold"
              style={{ 
                color: gradeColor,
                textShadow: `0 0 20px ${gradeColor}`,
              }}
            >
              {stats.grade}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Avg Severity</div>
            <div className="text-2xl font-bold text-neon-amber">
              {stats.avgSeverity}/10
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Potholes Section */}
          <div 
            className="bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => toggleSection('pothole')}
          >
            <div className="p-3 text-center">
              <div className="text-3xl mb-1">🕳️</div>
              <div className="text-2xl font-bold text-white">{stats.potholeCount}</div>
              <div className="text-xs text-slate-400 mt-1">Potholes</div>
            </div>
            {expandedSection === 'pothole' && (
              <div className="bg-slate-800 border-t border-slate-600 p-3 max-h-64 overflow-y-auto">
                {getIssuesByType('pothole').length > 0 ? (
                  getIssuesByType('pothole').map((issue) => (
                    <div 
                      key={issue.id} 
                      className="mb-3 pb-3 border-b border-slate-600 last:border-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-semibold text-white">
                          Report #{issue.id.slice(-6)}
                        </span>
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: getSeverityColor(issue.severity),
                            color: issue.severity >= 7 ? '#fff' : '#000'
                          }}
                        >
                          {issue.severity}/10
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mb-1">{issue.description}</p>
                      <div className="text-xs text-slate-500">
                        📍 {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
                      </div>
                      <div className="text-xs text-slate-500">
                        🕒 {new Date(issue.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">No potholes detected</p>
                )}
              </div>
            )}
          </div>
          
          {/* Trash Section */}
          <div 
            className="bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => toggleSection('trash')}
          >
            <div className="p-3 text-center">
              <div className="text-3xl mb-1">🗑️</div>
              <div className="text-2xl font-bold text-white">{stats.trashCount}</div>
              <div className="text-xs text-slate-400 mt-1">Trash</div>
            </div>
            {expandedSection === 'trash' && (
              <div className="bg-slate-800 border-t border-slate-600 p-3 max-h-64 overflow-y-auto">
                {getIssuesByType('trash').length > 0 ? (
                  getIssuesByType('trash').map((issue) => (
                    <div 
                      key={issue.id} 
                      className="mb-3 pb-3 border-b border-slate-600 last:border-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-semibold text-white">
                          Report #{issue.id.slice(-6)}
                        </span>
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: getSeverityColor(issue.severity),
                            color: issue.severity >= 7 ? '#fff' : '#000'
                          }}
                        >
                          {issue.severity}/10
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mb-1">{issue.description}</p>
                      <div className="text-xs text-slate-500">
                        📍 {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
                      </div>
                      <div className="text-xs text-slate-500">
                        🕒 {new Date(issue.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">No trash detected</p>
                )}
              </div>
            )}
          </div>
          
          {/* Broken Lights Section */}
          <div 
            className="bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => toggleSection('broken_light')}
          >
            <div className="p-3 text-center">
              <div className="text-3xl mb-1">💡</div>
              <div className="text-2xl font-bold text-white">{stats.lightCount}</div>
              <div className="text-xs text-slate-400 mt-1">Broken Lights</div>
            </div>
            {expandedSection === 'broken_light' && (
              <div className="bg-slate-800 border-t border-slate-600 p-3 max-h-64 overflow-y-auto">
                {getIssuesByType('broken_light').length > 0 ? (
                  getIssuesByType('broken_light').map((issue) => (
                    <div 
                      key={issue.id} 
                      className="mb-3 pb-3 border-b border-slate-600 last:border-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-semibold text-white">
                          Report #{issue.id.slice(-6)}
                        </span>
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: getSeverityColor(issue.severity),
                            color: issue.severity >= 7 ? '#fff' : '#000'
                          }}
                        >
                          {issue.severity}/10
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mb-1">{issue.description}</p>
                      <div className="text-xs text-slate-500">
                        📍 {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
                      </div>
                      <div className="text-xs text-slate-500">
                        🕒 {new Date(issue.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">No broken lights detected</p>
                )}
              </div>
            )}
          </div>
        </div>

        {stats.grade === 'F' && (
          <div className="mt-4 bg-red-900/30 border border-red-600 rounded-lg p-3">
            <p className="text-sm text-red-400">
              ⚠️ Critical: Immediate attention required. High density of severe infrastructure issues detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadHealthScore;

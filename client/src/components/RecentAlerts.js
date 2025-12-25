import React from 'react';

const RecentAlerts = ({ issues, getIssueIcon, getSeverityColor }) => {
  return (
    <div className="bg-slate-800 rounded-lg border-2 border-slate-700">
      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
        <h2 className="text-lg font-semibold text-neon-green flex items-center">
          <span className="mr-2">📡</span>
          Recent Alerts
        </h2>
      </div>
      
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {issues.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            <p className="text-4xl mb-2">✨</p>
            <p>No issues detected yet</p>
            <p className="text-sm mt-2">Upload images to start monitoring</p>
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-slate-700 rounded-lg p-3 border-l-4 hover:bg-slate-600 transition-colors cursor-pointer"
                style={{ borderLeftColor: getSeverityColor(issue.severity) }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">
                      {getIssueIcon(issue.issue_type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold capitalize text-white">
                        {issue.issue_type.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-slate-300 mt-1">
                        {issue.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-xs text-slate-400">
                        <span>
                          Severity: <strong style={{ color: getSeverityColor(issue.severity) }}>
                            {issue.severity}/10
                          </strong>
                        </span>
                        <span>•</span>
                        <span>{new Date(issue.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      issue.status === 'Open' ? 'bg-red-600' :
                      issue.status === 'In Progress' ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}
                  >
                    {issue.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;

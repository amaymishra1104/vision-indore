import React from 'react';

const RoadHealthScore = ({ stats }) => {
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
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">🕳️</div>
            <div className="text-2xl font-bold text-white">{stats.potholeCount}</div>
            <div className="text-xs text-slate-400 mt-1">Potholes</div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">🗑️</div>
            <div className="text-2xl font-bold text-white">{stats.trashCount}</div>
            <div className="text-xs text-slate-400 mt-1">Trash</div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">💡</div>
            <div className="text-2xl font-bold text-white">{stats.lightCount}</div>
            <div className="text-xs text-slate-400 mt-1">Broken Lights</div>
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

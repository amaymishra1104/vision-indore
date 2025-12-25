import React, { useState } from 'react';
import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

const IssueMarker = ({ issue, icon, color }) => {
  const [showInfo, setShowInfo] = useState(false);

  const position = {
    lat: issue.lat,
    lng: issue.lng
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        onClick={() => setShowInfo(true)}
      >
        <div
          className="relative cursor-pointer transform transition-transform hover:scale-110"
          style={{
            animation: 'pulse-glow 2s infinite',
          }}
        >
          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: color,
              opacity: 0.3,
              transform: 'scale(2)',
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          
          {/* Marker */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-2"
            style={{
              backgroundColor: color,
              borderColor: '#fff',
              boxShadow: `0 0 20px ${color}`,
            }}
          >
            {icon}
          </div>
        </div>
      </AdvancedMarker>

      {showInfo && (
        <InfoWindow
          position={position}
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="bg-slate-800 text-white p-3 rounded-lg max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold capitalize">
                {issue.issue_type.replace('_', ' ')}
              </h3>
              <span
                className="px-2 py-1 rounded text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                Severity: {issue.severity}/10
              </span>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              {issue.description}
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Confidence: {(issue.confidence_score * 100).toFixed(1)}%</p>
              <p>Status: <span className="text-neon-green">{issue.status}</span></p>
              <p>Detected: {new Date(issue.created_at).toLocaleString()}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default IssueMarker;

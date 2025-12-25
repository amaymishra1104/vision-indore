import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { DEFAULT_MAP_CENTER } from '../config';
import { subscribeToIssues } from '../firebase';
import { analyzeBatch, getRoadHealthStats } from '../api';
import RecentAlerts from './RecentAlerts';
import RoadHealthScore from './RoadHealthScore';
import SimulateDrive from './SimulateDrive';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons with pulsing animation
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pulse" style="background: ${color}"></div>
      <div class="marker-pin" style="background: ${color}; box-shadow: 0 0 20px ${color}">
        <span style="font-size: 16px">${icon}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [healthStats, setHealthStats] = useState(null);
  const [mapCenter] = useState(DEFAULT_MAP_CENTER);
  const [isProcessing, setIsProcessing] = useState(false);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    console.log('🔥 Subscribing to Firestore updates...');
    
    const unsubscribe = subscribeToIssues((updatedIssues) => {
      console.log(`📊 Received ${updatedIssues.length} issues from Firestore`);
      setIssues(updatedIssues);
    });

    return () => {
      console.log('🔥 Unsubscribing from Firestore');
      unsubscribe();
    };
  }, []);

  // Fetch health stats periodically
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getRoadHealthStats();
        setHealthStats(response.stats);
      } catch (error) {
        console.error('Error fetching health stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle simulate drive
  const handleSimulateDrive = async (images) => {
    setIsProcessing(true);
    try {
      console.log(`🚗 Simulating drive with ${images.length} images...`);
      const response = await analyzeBatch(images);
      console.log('✅ Batch analysis complete:', response);
      alert(`Drive simulation complete! Detected ${response.results.filter(r => r.issue).length} issues.`);
    } catch (error) {
      console.error('Error during simulate drive:', error);
      alert('Error processing images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    if (severity >= 7) return '#EF4444';
    if (severity >= 4) return '#FFBF00';
    return '#39FF14';
  };

  // Get issue icon
  const getIssueIcon = (issueType) => {
    switch (issueType) {
      case 'pothole': return '🕳️';
      case 'trash': return '🗑️';
      case 'broken_light': return '💡';
      default: return '⚠️';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Custom CSS for polished Google Maps-like styling */}
      <style>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-pulse {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.6;
          animation: pulse 2s ease-out infinite;
          top: 0;
          left: 0;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .marker-pin {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          position: relative;
          z-index: 10;
          margin: 4px;
          transition: transform 0.2s;
        }
        
        .marker-pin:hover {
          transform: scale(1.2);
        }
        
        .leaflet-container {
          background: #0f172a !important;
        }
        
        .leaflet-tile {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
        }
        
        .leaflet-control-zoom a {
          background: #334155 !important;
          color: #39FF14 !important;
          border: 1px solid #475569 !important;
          font-size: 18px !important;
          font-weight: bold !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #475569 !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: #1e293b !important;
          color: white !important;
          border: 2px solid #39FF14 !important;
          border-radius: 8px !important;
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.3) !important;
        }
        
        .leaflet-popup-tip {
          background: #1e293b !important;
        }
        
        .leaflet-control-attribution {
          background: rgba(30, 41, 59, 0.8) !important;
          color: #94a3b8 !important;
          font-size: 10px !important;
        }
        
        .leaflet-control-attribution a {
          color: #39FF14 !important;
        }
      `}</style>

      {/* Header */}
      <header className="bg-slate-800 border-b-2 border-neon-green shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neon-green">
                VISION-INDORE
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Autonomous Urban Governance Command Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-400">Total Issues</div>
                <div className="text-2xl font-bold text-neon-amber">
                  {issues.length}
                </div>
              </div>
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-glow"></div>
              <span className="text-sm text-slate-400">LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Map Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Road Health Score */}
            <RoadHealthScore stats={healthStats} />

            {/* Interactive Map */}
            <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden shadow-2xl">
              <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
                <h2 className="text-lg font-semibold text-neon-green flex items-center">
                  <span className="mr-2">🗺️</span>
                  Live Infrastructure Map
                </h2>
              </div>
              <div style={{ height: '600px' }}>
                <MapContainer
                  center={[mapCenter.lat, mapCenter.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  
                  {/* Render issue markers with pulse animation */}
                  {issues.map((issue) => (
                    <Marker
                      key={issue.id}
                      position={[issue.lat, issue.lng]}
                      icon={createCustomIcon(
                        getSeverityColor(issue.severity),
                        getIssueIcon(issue.issue_type)
                      )}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg capitalize mb-2">
                            {issue.issue_type.replace('_', ' ')}
                          </h3>
                          <div className="mb-2">
                            <span
                              className="px-2 py-1 rounded text-xs font-bold"
                              style={{ 
                                backgroundColor: getSeverityColor(issue.severity),
                                color: '#000'
                              }}
                            >
                              Severity: {issue.severity}/10
                            </span>
                          </div>
                          <p className="text-sm mb-2">{issue.description}</p>
                          <div className="text-xs space-y-1 text-slate-300">
                            <p>Confidence: {(issue.confidence_score * 100).toFixed(1)}%</p>
                            <p>Status: <span className="text-neon-green">{issue.status}</span></p>
                            <p>Detected: {new Date(issue.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Simulate Drive */}
            <SimulateDrive 
              onSimulate={handleSimulateDrive} 
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <RecentAlerts 
              issues={issues.slice(0, 10)} 
              getIssueIcon={getIssueIcon}
              getSeverityColor={getSeverityColor}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t-2 border-slate-700 mt-12">
        <div className="container mx-auto px-6 py-4 text-center text-slate-400 text-sm">
          <p>Powered by Google Gemini AI • Interactive Maps • Firebase</p>
          <p className="mt-1">Building Smarter Cities, One Frame at a Time</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEFAULT_MAP_CENTER } from '../config';
import { subscribeToIssues } from '../firebase';
import { analyzeBatch, getRoadHealthStats } from '../api';
import RecentAlerts from './RecentAlerts';
import RoadHealthScore from './RoadHealthScore';
import SimulateDrive from './SimulateDrive';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when issues change
function MapUpdater({ issues }) {
  const map = useMap();
  
  useEffect(() => {
    if (issues.length > 0) {
      const bounds = issues.map(issue => [issue.lat, issue.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [issues, map]);
  
  return null;
}

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

    // Cleanup subscription on unmount
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
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Create custom marker icon
  const createCustomIcon = (severity) => {
    const color = getSeverityColor(severity);
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-wrapper">
          <div class="marker-pulse" style="background: ${color};"></div>
          <div class="marker-pin" style="background: ${color}; border: 3px solid #fff; box-shadow: 0 0 15px ${color};"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  // Handle simulate drive
  const handleSimulateDrive = async (images) => {
    setIsProcessing(true);
    try {
      console.log(`🚗 Simulating drive with ${images.length} images...`);
      const response = await analyzeBatch(images);
      console.log('✅ Batch analysis complete:', response);
      
      // Issues will automatically appear via Firestore subscription
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
      case 'pothole':
        return '🕳️';
      case 'trash':
        return '🗑️';
      case 'broken_light':
        return '💡';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Custom CSS for Leaflet markers */}
      <style>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-wrapper {
          position: relative;
          width: 30px;
          height: 30px;
        }
        
        .marker-pulse {
          position: absolute;
          width: 30px;
          height: 30px;
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
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: 5px;
          z-index: 10;
          transition: transform 0.2s;
        }
        
        .marker-pin:hover {
          transform: scale(1.3);
        }
        
        .leaflet-container {
          background: #0f172a !important;
          font-family: inherit;
        }
        
        .leaflet-popup-content-wrapper {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        .leaflet-popup-tip {
          background: #ffffff;
        }
        
        .leaflet-control-zoom {
          border: 2px solid #39FF14 !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        
        .leaflet-control-zoom a {
          background: #334155 !important;
          color: #39FF14 !important;
          border: none !important;
          font-weight: bold !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #475569 !important;
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
          {/* Main Map Section (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Road Health Score */}
            <RoadHealthScore 
              stats={healthStats} 
              issues={issues}
              getIssueIcon={getIssueIcon}
              getSeverityColor={getSeverityColor}
            />

            {/* Map */}
            <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
              <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
                <h2 className="text-lg font-semibold text-neon-green flex items-center">
                  <span className="mr-2">🗺️</span>
                  Live Infrastructure Map - Indore
                </h2>
              </div>
              <div className="relative bg-slate-900" style={{ height: '600px' }}>
                <MapContainer
                  center={[mapCenter.lat, mapCenter.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%', background: '#0f172a' }}
                  zoomControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  
                  <MapUpdater issues={issues} />
                  
                  {issues.map((issue) => (
                    <Marker
                      key={issue.id}
                      position={[issue.lat, issue.lng]}
                      icon={createCustomIcon(issue.severity)}
                    >
                      <Popup className="custom-popup">
                        <div style={{ minWidth: '200px' }}>
                          <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1e293b' }}>
                            {getIssueIcon(issue.issue_type)} {issue.issue_type.replace('_', ' ').toUpperCase()}
                          </h3>
                          <p style={{ margin: '4px 0', fontSize: '14px' }}>
                            <strong>Severity:</strong> <span style={{ color: getSeverityColor(issue.severity) }}>{issue.severity}/10</span>
                          </p>
                          <p style={{ margin: '4px 0', fontSize: '14px' }}>
                            <strong>Status:</strong> {issue.status}
                          </p>
                          <p style={{ margin: '4px 0', fontSize: '13px', color: '#475569' }}>
                            {issue.description}
                          </p>
                          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                            📍 {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
                          </p>
                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                            🕒 {new Date(issue.created_at).toLocaleString()}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                
                {/* Map Info Overlay */}
                {issues.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-70 pointer-events-none z-[1000]">
                    <div className="text-center text-white">
                      <p className="text-2xl mb-2">📍</p>
                      <p className="text-lg font-semibold">Upload images to see detections on map</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Simulate Drive Button */}
            <SimulateDrive 
              onSimulate={handleSimulateDrive} 
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Sidebar (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* Recent Alerts */}
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
          <p>Powered by Google Gemini AI • OpenStreetMap • Firebase</p>
          <p className="mt-1">Building Smarter Cities, One Frame at a Time</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

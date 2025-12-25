import React, { useState } from 'react';

const SimulateDrive = ({ onSimulate, isProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Sample coordinates in Indore (you can customize these)
  const indoreLocations = [
    { lat: 22.7196, lng: 75.8577 }, // City center
    { lat: 22.7241, lng: 75.8648 }, // Near Rajwada
    { lat: 22.7283, lng: 75.8714 }, // Near Treasure Island
    { lat: 22.7159, lng: 75.8490 }, // Near Palasia
    { lat: 22.7109, lng: 75.8626 }, // Near Vijay Nagar
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    setSelectedFiles(files);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSimulate = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    try {
      // Convert all files to base64
      const images = await Promise.all(
        selectedFiles.map(async (file, index) => {
          const base64 = await convertToBase64(file);
          const location = indoreLocations[index % indoreLocations.length];
          
          // Add small random offset to coordinates
          const lat = location.lat + (Math.random() - 0.5) * 0.01;
          const lng = location.lng + (Math.random() - 0.5) * 0.01;
          
          return {
            image: base64,
            lat,
            lng
          };
        })
      );

      await onSimulate(images);
      setSelectedFiles([]);
      
      // Reset file input
      document.getElementById('file-input').value = '';
      
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border-2 border-slate-700">
      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
        <h2 className="text-lg font-semibold text-neon-green flex items-center">
          <span className="mr-2">🚗</span>
          Simulate Drive
        </h2>
      </div>
      
      <div className="p-6">
        <p className="text-slate-300 mb-4">
          Upload up to 5 images of Indore streets to simulate a drive and watch AI detect issues in real-time.
        </p>

        <div className="mb-4">
          <label
            htmlFor="file-input"
            className="block w-full border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-neon-green transition-colors"
          >
            <div className="text-4xl mb-2">📸</div>
            <div className="text-slate-300">
              {selectedFiles.length > 0 
                ? `${selectedFiles.length} image(s) selected` 
                : 'Click to select images'}
            </div>
            <div className="text-sm text-slate-500 mt-2">
              Supports JPG, PNG (Max 10 images)
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Selected Files:</div>
            <ul className="text-sm text-slate-300 space-y-1">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-neon-green mr-2">✓</span>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSimulate}
          disabled={selectedFiles.length === 0 || isProcessing}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            selectedFiles.length === 0 || isProcessing
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-neon-green text-slate-900 hover:bg-green-400 hover:shadow-lg hover:shadow-neon-green/50'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            '🚀 Start Simulation'
          )}
        </button>

        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
          <p className="text-sm text-blue-400">
            💡 Tip: Use street-level images for best results. The AI will analyze each image and create markers on the map for detected issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulateDrive;

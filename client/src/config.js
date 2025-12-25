// Firebase configuration
// Replace with your Firebase project credentials from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyATHJOXOLitHcqUbPtrMWWicdoKRHmtuds",
  authDomain: "vision-indore.firebaseapp.com",
  projectId: "vision-indore",
  storageBucket: "vision-indore.firebasestorage.app",
  messagingSenderId: "106407782985588234345",
  appId: "1:106407782985588234345:web:your-app-id"
};

// Google Maps API Key
// Get your key from: https://console.cloud.google.com/google/maps-apis
const GOOGLE_MAPS_API_KEY = "AIzaSyATHJOXOLitHcqUbPtrMWWicdoKRHmtuds";

// Backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Default map center (Indore, India)
const DEFAULT_MAP_CENTER = {
  lat: 22.7196,
  lng: 75.8577
};

export {
  firebaseConfig,
  GOOGLE_MAPS_API_KEY,
  API_BASE_URL,
  DEFAULT_MAP_CENTER
};

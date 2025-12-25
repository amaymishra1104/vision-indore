# 🏙️ Vision-Indore: Autonomous Urban Governance Platform

An AI-powered platform that uses computer vision to detect and map urban infrastructure issues in real-time. Built for hackathons, this prototype demonstrates autonomous monitoring of potholes, trash, and broken streetlights using Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![Gemini](https://img.shields.io/badge/Google-Gemini%201.5-purple)

## 🎯 Features

- **AI Vision Detection**: Google Gemini 1.5 Flash analyzes images for infrastructure issues
- **Real-time Mapping**: Google Maps integration with animated markers for detected issues
- **Live Dashboard**: Command center-style UI with dark theme and neon accents
- **Real-time Updates**: Firebase Firestore subscription for instant notifications
- **Road Health Score**: AI-calculated grade (A-F) based on issue severity and density
- **Batch Processing**: "Simulate Drive" feature for processing multiple images
- **Responsive Design**: Tailwind CSS with mobile-first approach

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling with custom dark theme
- **Google Maps JavaScript API** - Advanced Markers & Map visualization
- **Firebase SDK** - Real-time Firestore subscriptions
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - REST API server
- **Google Gemini 1.5 Flash** - Multimodal AI for image analysis
- **Firebase Admin SDK** - Firestore database operations
- **CORS** - Cross-origin resource sharing

### Database
- **Firebase Firestore** - NoSQL real-time database

## 📁 Project Structure

```
vision-indore/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js         # Main dashboard component
│   │   │   ├── IssueMarker.js       # Map marker with pulse animation
│   │   │   ├── RecentAlerts.js      # Real-time alerts sidebar
│   │   │   ├── RoadHealthScore.js   # Health score widget
│   │   │   └── SimulateDrive.js     # Batch image upload
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css              # Tailwind + custom styles
│   │   ├── config.js              # Firebase & API configuration
│   │   ├── firebase.js            # Firestore real-time subscriptions
│   │   └── api.js                 # API client functions
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                    # Node.js backend
│   ├── config/
│   │   └── firebase.js            # Firebase Admin initialization
│   ├── routes/
│   │   ├── detect.js              # AI detection endpoints
│   │   └── issues.js              # CRUD operations for issues
│   ├── services/
│   │   ├── geminiService.js       # Gemini AI integration
│   │   └── firestoreService.js    # Firestore operations
│   ├── server.js                  # Express app entry point
│   ├── package.json
│   └── .env.example               # Environment variables template
│
└── .gitignore
```

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Google Cloud Account** with billing enabled
3. **Firebase Project**

### Step 1: Clone and Install

```bash
cd "vision indore"

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (Start in test mode for development)
4. Go to **Project Settings** → **Service Accounts**
5. Click **Generate New Private Key**
6. Save the JSON file as `server/config/firebase-service-account.json`
7. Copy the Firebase client config from **Project Settings** → **General** → **Your apps**

### Step 3: Google Cloud Setup

#### Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the API key

#### Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable these APIs:
   - Maps JavaScript API
   - Places API (optional)
3. Go to **Credentials** → **Create Credentials** → **API Key**
4. Restrict the key (recommended):
   - Application restrictions: HTTP referrers
   - API restrictions: Maps JavaScript API
5. Copy the API key

### Step 4: Configure Environment Variables

#### Server Configuration

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Service Account Path (relative to server directory)
FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json

# Client URL for CORS
CLIENT_URL=http://localhost:3000
```

#### Client Configuration

Edit `client/src/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
```

### Step 5: Run the Application

#### Start Backend Server

```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend (in a new terminal)

```bash
cd client
npm start
# App opens at http://localhost:3000
```

## 🎮 How to Use

### 1. Upload Images

Click the **"Simulate Drive"** section and upload 1-10 images of street scenes (ideally showing roads, infrastructure).

### 2. AI Analysis

The Gemini AI will analyze each image for:
- **Potholes** 🕳️
- **Trash/Garbage** 🗑️
- **Broken Streetlights** 💡

### 3. Watch Results

- Detected issues appear as **animated markers** on the map
- **Recent Alerts** panel shows details in real-time
- **Road Health Score** updates automatically (A-F grade)

### 4. View Issue Details

Click any marker to see:
- Issue type and severity (1-10)
- AI confidence score
- Description
- Detection timestamp
- Current status

## 🧪 API Endpoints

### Detection Endpoints

#### Analyze Single Image
```http
POST /api/detect/analyze
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,...",
  "lat": 22.7196,
  "lng": 75.8577
}
```

#### Batch Analysis
```http
POST /api/detect/batch
Content-Type: application/json

{
  "images": [
    { "image": "base64...", "lat": 22.7196, "lng": 75.8577 },
    { "image": "base64...", "lat": 22.7241, "lng": 75.8648 }
  ]
}
```

### Issues Endpoints

#### Get All Issues
```http
GET /api/issues?status=Open&limit=50
```

#### Update Issue Status
```http
PATCH /api/issues/:id/status
Content-Type: application/json

{
  "status": "Resolved"
}
```

#### Get Health Statistics
```http
GET /api/issues/stats/health
```

## 🎨 UI/UX Features

### Dark Theme with Neon Accents
- **Background**: Slate-900 (#0f172a)
- **Accents**: Neon Green (#39FF14), Neon Amber (#FFBF00)
- **Command Center**: High-tech government tool aesthetic

### Animated Markers
- Pulse animation on detected issues
- Color-coded by severity:
  - Red (7-10): Severe
  - Amber (4-6): Moderate
  - Green (1-3): Minor

### Real-time Updates
- Firestore `onSnapshot` listener
- Instant marker appearance
- Live alert feed

## 🏆 Hackathon "WOW" Factors

1. **Fully Autonomous**: No manual intervention needed
2. **Real-time AI**: Sub-5-second detection with Gemini Flash
3. **Production-Ready**: Firebase + Google Cloud architecture
4. **Scalable**: Can process thousands of images
5. **Visual Impact**: Cinematic dark UI with animations
6. **Smart Analytics**: AI-calculated Road Health Score

## 🔧 Customization

### Change Default Map Location

Edit `client/src/config.js`:

```javascript
const DEFAULT_MAP_CENTER = {
  lat: 22.7196,  // Your city latitude
  lng: 75.8577   // Your city longitude
};
```

### Modify AI System Prompt

Edit `server/services/geminiService.js` to customize detection logic.

### Add More Issue Types

1. Update `systemPrompt` in `geminiService.js`
2. Add icons in `Dashboard.js` `getIssueIcon()` function
3. Update UI components as needed

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `firebase-service-account.json` is in correct location
- Check Firestore rules (set to test mode for development)
- Ensure Firebase project has Firestore enabled

### Gemini API Errors
- Verify API key is valid
- Check billing is enabled on Google Cloud
- Ensure Generative Language API is enabled

### Map Not Loading
- Verify Google Maps API key
- Check browser console for errors
- Ensure Maps JavaScript API is enabled

### CORS Errors
- Verify `CLIENT_URL` in server `.env` matches frontend URL
- Check server is running on correct port

## 📊 Sample Test Data

For testing without images, you can use these coordinates in Indore:

```javascript
const testLocations = [
  { lat: 22.7196, lng: 75.8577, name: "City Center" },
  { lat: 22.7241, lng: 75.8648, name: "Rajwada" },
  { lat: 22.7283, lng: 75.8714, name: "Treasure Island" },
  { lat: 22.7159, lng: 75.8490, name: "Palasia" },
  { lat: 22.7109, lng: 75.8626, name: "Vijay Nagar" }
];
```

## 🚀 Deployment

### Backend (Google Cloud Run / App Engine)
```bash
cd server
gcloud app deploy
```

### Frontend (Firebase Hosting)
```bash
cd client
npm run build
firebase deploy --only hosting
```

## 📝 License

MIT License - Feel free to use for hackathons and educational purposes.

## 🤝 Contributing

This is a hackathon prototype. Feel free to fork and enhance!

## 📧 Support

For issues or questions, check:
- Firebase Console for database issues
- Google Cloud Console for API quotas
- Browser DevTools for client-side errors

---

**Built with ❤️ for Smart Cities**

*Powered by Google Gemini AI • Google Maps • Firebase*

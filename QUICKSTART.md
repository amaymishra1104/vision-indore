# 🚀 Quick Start Guide - Vision-Indore

## ⚡ 5-Minute Setup

### 1. Install Dependencies

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

### 2. Get Your API Keys

#### Gemini API Key (2 minutes)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

#### Google Maps API Key (3 minutes)
1. Visit: https://console.cloud.google.com/
2. Enable "Maps JavaScript API"
3. Create API Key in Credentials
4. Copy the key

#### Firebase Setup (5 minutes)
1. Visit: https://console.firebase.google.com/
2. Create new project
3. Enable Firestore Database (test mode)
4. Get service account JSON:
   - Settings → Service Accounts → Generate New Private Key
   - Save as `server/config/firebase-service-account.json`
5. Get web config:
   - Settings → General → Your apps → Web app
   - Copy config object

### 3. Configure

**Backend** - Create `server/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_key_here
FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json
CLIENT_URL=http://localhost:3000
```

**Frontend** - Edit `client/src/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "paste_your_firebase_api_key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const GOOGLE_MAPS_API_KEY = "paste_your_maps_key";
```

### 4. Run

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 5. Test

1. Open http://localhost:3000
2. Click "Simulate Drive" section
3. Upload 2-5 street images
4. Click "Start Simulation"
5. Watch markers appear on the map! 🎉

## 📸 Where to Get Test Images?

### Option 1: Google Images
Search: "pothole street view" or "street with trash"

### Option 2: Your Phone
Take photos of streets near you

### Option 3: Sample Datasets
- Kaggle: "Pothole Detection Dataset"
- Open Images Dataset

## 🎯 Hackathon Demo Tips

### The Perfect 3-Minute Demo

**Minute 1:** "The Problem"
- Show statistics about infrastructure issues in Indian cities
- Explain manual monitoring is slow and expensive

**Minute 2:** "The Solution - Live Demo"
- Upload 5 pre-selected images showing clear issues
- Watch the map populate in real-time
- Point out the pulsing markers and severity colors
- Show the Road Health Score updating

**Minute 3:** "The Technology & Impact"
- Mention Google Gemini AI, Firebase real-time updates
- Explain how this scales to thousands of cameras
- Show cost savings: 90% reduction in manual labor

### Pro Demo Tricks

1. **Pre-load 5-10 good test images** beforehand
2. **Have the map already centered** on your test area
3. **Clear the database** before demo: Delete all documents in Firestore
4. **Use images with OBVIOUS issues** for reliable detection
5. **Practice the upload → detection → marker flow** 3 times minimum

## ⚠️ Common Issues

### "Cannot find module 'firebase-admin'"
```bash
cd server
npm install
```

### "Firebase: Firebase App named '[DEFAULT]' already exists"
Clear browser cache or use incognito mode

### "Map not loading"
Check browser console - probably wrong Maps API key

### "AI returns 'none' for everything"
- Use clearer images with obvious issues
- Check Gemini API key is correct
- Verify billing is enabled on Google Cloud

### "CORS error"
Ensure backend is running on port 5000 and `CLIENT_URL` is set correctly

## 🎨 Customization for Your City

### Change City Name
Replace "Indore" with your city name in:
- `client/public/index.html` (title)
- `client/src/components/Dashboard.js` (header)
- `README.md`

### Change Default Location
Edit `client/src/config.js`:
```javascript
const DEFAULT_MAP_CENTER = {
  lat: YOUR_CITY_LAT,
  lng: YOUR_CITY_LNG
};
```

### Add Your Logo
1. Add logo image to `client/public/`
2. Update `client/src/components/Dashboard.js` header section

## 📊 Firestore Database Structure

Your issues collection will look like this:

```
issues/
  ├── document1/
  │   ├── lat: 22.7196
  │   ├── lng: 75.8577
  │   ├── issue_type: "pothole"
  │   ├── severity: 8
  │   ├── description: "Large pothole detected..."
  │   ├── confidence_score: 0.95
  │   ├── status: "Open"
  │   ├── created_at: "2025-12-25T..."
  │   └── updated_at: "2025-12-25T..."
```

## 🏆 Winning the Hackathon

### Judges Look For:

1. **Innovation** ✅
   - AI-powered urban governance is cutting-edge
   - Real-time detection is impressive

2. **Technical Excellence** ✅
   - Google Cloud stack (Gemini + Maps + Firebase)
   - Clean code architecture
   - Real-time updates

3. **User Experience** ✅
   - Command center UI is visually striking
   - Smooth animations
   - Intuitive interface

4. **Practical Impact** ✅
   - Solves real civic problems
   - Scalable solution
   - Cost-effective

5. **Demo Quality** ✅
   - Live, working prototype
   - No slides needed - show the product!

### Presentation Script

```
"Imagine if every street in Indore had eyes. 

[Open app]

Vision-Indore uses Google's Gemini AI to analyze street camera 
footage in real-time. Watch this:

[Upload images]

Each image is processed by AI in under 3 seconds. The system 
detects potholes, trash, and broken lights - then maps them 
instantly.

[Point to markers appearing]

Notice the pulsing markers? That's real-time Firebase. The 
severity color tells maintenance teams what to fix first.

[Show Road Health Score]

The platform even calculates a Road Health Score, giving 
city planners instant visibility into infrastructure quality.

This isn't a concept - it's working, right now. One camera van 
could map an entire city in a week. Multiply that by fixed 
cameras at every intersection?

We're talking about autonomous urban governance at scale.

Thank you."
```

## 🎬 Next Steps

After hackathon, you can enhance with:

1. **Mobile App** - React Native version
2. **Cloud Storage** - Save images to Firebase Storage
3. **Admin Dashboard** - Assign issues to teams
4. **Analytics** - Historical trends, charts
5. **Notifications** - Email/SMS alerts for critical issues
6. **Camera Integration** - Connect to live CCTV feeds

## 📞 Need Help?

Check these first:
1. All API keys are correct
2. Firebase is in test mode
3. Both servers are running
4. Using recent street images

Still stuck? Check:
- Browser console for errors
- Terminal for backend errors
- Firebase Firestore for data

---

**Good luck with your hackathon! 🚀**

Make sure to:
- ✅ Test the demo flow 3 times before presenting
- ✅ Have backup images ready
- ✅ Clear database before demo
- ✅ Practice your 3-minute pitch

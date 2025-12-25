# Vision-Indore Configuration Checklist

## ✅ Pre-Deployment Checklist

### Google Cloud APIs

- [ ] **Gemini API** (Generative Language API)
  - Visit: https://console.cloud.google.com/apis/library
  - Enable: "Generative Language API"
  - API Key created
  
- [ ] **Maps JavaScript API**
  - Visit: https://console.cloud.google.com/apis/library
  - Enable: "Maps JavaScript API"
  - API Key created and restricted
  
- [ ] **Billing Enabled**
  - Both APIs require billing to be enabled
  - Set up billing alerts (recommended: $10/day)

### Firebase Setup

- [ ] **Project Created**
  - Project name: ________________
  - Project ID: ________________

- [ ] **Firestore Database**
  - Database created
  - Location: ________________ (e.g., asia-south1)
  - Mode: Test (for development) / Production (for deployment)

- [ ] **Service Account JSON**
  - Downloaded from Firebase Console
  - Saved as: `server/config/firebase-service-account.json`
  - File NOT committed to git (.gitignore)

- [ ] **Web App Config**
  - Firebase web app created
  - Config copied to `client/src/config.js`

### Environment Variables

**Server (.env file created):**
- [ ] PORT
- [ ] GEMINI_API_KEY
- [ ] FIREBASE_SERVICE_ACCOUNT_PATH
- [ ] CLIENT_URL

**Client (config.js updated):**
- [ ] firebaseConfig (all 6 fields)
- [ ] GOOGLE_MAPS_API_KEY
- [ ] API_BASE_URL (if deployed)
- [ ] DEFAULT_MAP_CENTER

### Dependencies Installed

- [ ] Server: `cd server && npm install`
- [ ] Client: `cd client && npm install`

### Local Testing

- [ ] Backend starts without errors: `npm run dev`
- [ ] Frontend starts without errors: `npm start`
- [ ] Map loads correctly
- [ ] Can upload images
- [ ] AI detection works
- [ ] Markers appear on map
- [ ] Firestore updates in real-time

## 🔑 API Keys Quick Reference

| Service | Key Location | Get it from |
|---------|-------------|-------------|
| Gemini API | Server `.env` | https://makersuite.google.com/app/apikey |
| Google Maps | Client `config.js` | https://console.cloud.google.com/apis/credentials |
| Firebase Config | Client `config.js` | Firebase Console → Project Settings |
| Firebase Admin | Server `config/` | Firebase Console → Service Accounts |

## 🔒 Security Checklist (Before Making Public)

- [ ] All API keys in `.env` (not in code)
- [ ] `.gitignore` includes `.env` and service account JSON
- [ ] Firebase rules configured (not test mode)
- [ ] Google Maps API key has HTTP referrer restrictions
- [ ] Gemini API key has IP restrictions (if deploying to server)
- [ ] CORS configured for production domain
- [ ] Rate limiting implemented

## 📝 Firestore Security Rules

For development (test mode):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 1, 1);
    }
  }
}
```

For production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /issues/{issueId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 🌐 Deployment Checklist

### Backend (Cloud Run / App Engine)

- [ ] `app.yaml` created (if using App Engine)
- [ ] Environment variables set in Cloud Console
- [ ] Service account JSON uploaded securely
- [ ] Health check endpoint working
- [ ] CORS configured for production URL

### Frontend (Firebase Hosting)

- [ ] `firebase.json` created
- [ ] `npm run build` successful
- [ ] API_BASE_URL points to deployed backend
- [ ] `firebase deploy` successful
- [ ] Production URL working

## 🧪 Test Cases

### Manual Testing

- [ ] Upload 1 image with pothole → Detects correctly
- [ ] Upload 1 image with trash → Detects correctly
- [ ] Upload 1 image with broken light → Detects correctly
- [ ] Upload 1 clean street image → Returns "none"
- [ ] Upload 5 images in batch → All process correctly
- [ ] Markers appear in correct locations
- [ ] Click marker → Info window shows
- [ ] Recent alerts update in real-time
- [ ] Road health score calculates correctly
- [ ] Page refresh → Data persists

### Performance Testing

- [ ] Image upload < 5 seconds per image
- [ ] Map loads < 2 seconds
- [ ] 100+ markers render smoothly
- [ ] No console errors

## 📊 Firestore Data Validation

Check your `issues` collection has documents with:
- `lat` (number)
- `lng` (number)
- `issue_type` (string: pothole, trash, broken_light, none)
- `severity` (number: 1-10)
- `description` (string)
- `confidence_score` (number: 0.0-1.0)
- `status` (string: Open, In Progress, Resolved)
- `created_at` (timestamp string)
- `updated_at` (timestamp string)

## 🎯 Demo Preparation

- [ ] 10 test images prepared and tested
- [ ] Database cleared (for fresh demo)
- [ ] Map centered on demo area
- [ ] All API quotas checked
- [ ] Backup plan if internet fails (video recording)
- [ ] Presentation script practiced

## 📞 Emergency Contacts

- Firebase Support: https://firebase.google.com/support
- Google Cloud Support: https://cloud.google.com/support
- Stack Overflow: https://stackoverflow.com/questions/tagged/google-gemini

## 🔧 Troubleshooting Commands

```bash
# Check Node version
node --version  # Should be v16+

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check backend is running
curl http://localhost:5000/api/health

# Check Firestore connection
# (Run in server directory)
node -e "require('./config/firebase').db.collection('issues').limit(1).get().then(() => console.log('✅ Connected')).catch(e => console.log('❌', e))"
```

---

**Date Completed:** _______________

**Completed By:** _______________

**Ready for Hackathon:** [ ] YES / [ ] NO

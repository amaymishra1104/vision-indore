# 🚀 Vision-Indore - Quick Setup Guide

## ✅ Current Status

**CONGRATULATIONS!** Your Vision-Indore prototype is now fully set up and running!

- ✅ Backend Server: Running on `http://localhost:5000`
- ✅ Frontend Application: Running on `http://localhost:3000`
- ✅ Firebase Firestore: Connected
- ✅ Google Gemini AI: Configured
- ✅ All Components: Working

## 🎯 How to Use the Application

### Access the Application
1. Open your browser and go to: **http://localhost:3000**
2. You should see the Vision-Indore dashboard with:
   - Header with live status indicator
   - Road Health Score widget
   - Interactive map of Indore
   - Recent Alerts sidebar
   - Simulate Drive section

### Upload Images for Detection

#### Option 1: Simulate Drive (Recommended for Testing)
1. Scroll down to the **"Simulate Drive"** section
2. Click **"Choose Files"** button
3. Select 1-10 images from your computer (road photos, potholes, trash, etc.)
4. Click **"Start Simulation"** button
5. Wait for the AI to analyze the images
6. Detected issues will appear on the map and in the Recent Alerts sidebar

#### Option 2: Single Image Upload via API
Use any API testing tool (Postman, curl, etc.) to send a POST request:

```bash
# Example using PowerShell
$image = [Convert]::ToBase64String([IO.File]::ReadAllBytes("path/to/image.jpg"))
$body = @{
    image = "data:image/jpeg;base64,$image"
    lat = 22.7196
    lng = 75.8577
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/detect/analyze" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Understanding the Dashboard

#### 1. Road Health Score
- **Grade A-F**: Overall health of monitored roads
- **Statistics**: Shows counts of each issue type
- **Color-coded**: Green (A) to Red (F)

#### 2. Interactive Map
- **Markers**: Each marker represents a detected issue
- **Colors**:
  - 🔴 Red: High severity (7-10)
  - 🟡 Amber: Medium severity (4-6)
  - 🟢 Green: Low severity (1-3)
- **Hover**: See issue type and severity
- **Animated**: Pulsing effect for real-time feel

#### 3. Recent Alerts
- Shows the 10 most recent detections
- Real-time updates via Firebase
- Click on any alert to see details

## 🛠️ Managing the Application

### Starting the Application (When Stopped)

**Terminal 1 - Backend:**
```powershell
cd "c:\Users\Amay\vision indore\server"
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd "c:\Users\Amay\vision indore\client"
npm start
```

### Stopping the Application
- Press `Ctrl+C` in each terminal to stop the servers

### Viewing Firebase Data
1. Go to: https://console.firebase.google.com
2. Select project: **vision-indore**
3. Navigate to **Firestore Database**
4. Browse the **issues** collection to see all detected issues

### Checking Server Health
Visit: http://localhost:5000/api/health

Response should be:
```json
{
  "status": "OK",
  "message": "Vision-Indore Backend is running",
  "timestamp": "2025-12-28T..."
}
```

## 🎨 Testing with Sample Images

### Where to Find Test Images
1. **Pothole Images**: Search Google Images for "pothole road damage"
2. **Trash Images**: Search for "street garbage pile"
3. **Broken Light Images**: Search for "broken streetlight"
4. Or use your own photos of infrastructure issues

### Best Practices for Testing
- Use clear, well-lit images
- Focus on one issue per image
- Images should show the issue prominently
- Supported formats: JPG, JPEG, PNG
- Recommended size: 500KB - 2MB per image

## 📊 API Endpoints Reference

### Detection Endpoints

#### Analyze Single Image
```http
POST http://localhost:5000/api/detect/analyze
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,...",
  "lat": 22.7196,
  "lng": 75.8577
}
```

#### Batch Analysis (Simulate Drive)
```http
POST http://localhost:5000/api/detect/batch
Content-Type: application/json

{
  "images": [
    {
      "image": "data:image/jpeg;base64,...",
      "lat": 22.7196,
      "lng": 75.8577
    },
    ...
  ]
}
```

### Issues Endpoints

#### Get All Issues
```http
GET http://localhost:5000/api/issues
```

#### Get Road Health Stats
```http
GET http://localhost:5000/api/issues/stats
```

#### Update Issue Status
```http
PATCH http://localhost:5000/api/issues/:id/status
Content-Type: application/json

{
  "status": "Resolved"
}
```

#### Delete Issue
```http
DELETE http://localhost:5000/api/issues/:id
```

## 🔧 Troubleshooting

### Frontend Not Loading
1. Check if backend is running on port 5000
2. Check browser console for errors (F12)
3. Verify Firebase config in `client/src/config.js`

### No Markers Appearing on Map
1. Wait 2-3 seconds after upload (Firebase sync)
2. Check browser console for errors
3. Verify Firestore has data in Firebase Console

### AI Not Detecting Issues
1. Verify Gemini API key in `server/.env`
2. Check image is clear and shows infrastructure
3. Look at server logs for AI response
4. Try images with more obvious issues

### Backend Crashes
1. Check if Firebase service account JSON exists
2. Verify `.env` file has all required variables
3. Check Node.js version (should be 14+)
4. Run `npm install` in server directory

## 🎯 Next Steps for Deployment

### For Production Deployment:

1. **Update Firebase Rules** (Currently in test mode)
2. **Add API Key Restrictions** (Maps & Gemini)
3. **Set up Environment Variables** for production
4. **Build Frontend**: `cd client && npm run build`
5. **Use Process Manager** for backend (PM2, forever)
6. **Set up HTTPS** (SSL certificate)
7. **Configure CORS** for production domain

### Recommended Cloud Platforms:
- **Frontend**: Vercel, Netlify, Firebase Hosting
- **Backend**: Google Cloud Run, Heroku, Railway
- **Database**: Already using Firebase Firestore ✓

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)

## 🎉 Success Checklist

- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ Can upload images via Simulate Drive
- ✅ Markers appear on map
- ✅ Recent alerts show in sidebar
- ✅ Firebase Firestore storing data
- ✅ AI detection working with Gemini

## 💡 Pro Tips

1. **Keep Both Terminals Open**: Don't close the terminal windows running the servers
2. **Use Dev Tools**: Press F12 in browser to see console logs
3. **Monitor Firebase**: Keep Firebase Console open to see real-time data
4. **Test with Multiple Images**: Use the batch upload to test different scenarios
5. **Check Server Logs**: Terminal 1 shows all API requests and AI responses

---

**Need Help?** Check the console logs in both terminals and browser (F12) for detailed error messages.

**Ready to Demo!** Your application is production-ready for hackathon presentation! 🚀

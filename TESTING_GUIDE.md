# 🧪 Testing Guide - Vision-Indore

## Quick Test Scenarios

### Test 1: Verify Backend Health ✅

```powershell
# In PowerShell or browser
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
# Or visit: http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Vision-Indore Backend is running",
  "timestamp": "2025-12-28T..."
}
```

### Test 2: Frontend Dashboard ✅

1. Open browser: http://localhost:3000
2. You should see:
   - ✅ "VISION-INDORE" header with green neon styling
   - ✅ "LIVE" indicator pulsing
   - ✅ Total Issues counter (0 initially)
   - ✅ Road Health Score widget
   - ✅ Map centered on Indore
   - ✅ Recent Alerts sidebar (empty initially)
   - ✅ Simulate Drive section at bottom

### Test 3: Simulate Drive with Images ✅

**Steps:**
1. Go to http://localhost:3000
2. Scroll to **"Simulate Drive"** section
3. Click **"Choose Files"**
4. Select 2-5 images (any images for testing)
5. Click **"Start Simulation"**
6. Watch the magic happen! ✨

**What to Expect:**
- Progress indicator appears
- AI analyzes each image (2-3 seconds per image)
- Success alert shows number of detected issues
- Markers appear on the map
- Alerts populate in the sidebar
- Road Health Score updates

### Test 4: Real-Time Firestore Sync ✅

**Method 1: Via Application**
1. Open two browser windows side-by-side
2. Both showing http://localhost:3000
3. Upload images in one window
4. Watch the other window update automatically (within 2-3 seconds)

**Method 2: Via Firebase Console**
1. Open: https://console.firebase.google.com
2. Go to your project → Firestore Database
3. Browse the `issues` collection
4. Upload images in your app
5. Watch new documents appear in real-time

### Test 5: API Endpoint Testing ✅

**Using PowerShell:**

```powershell
# Get all issues
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/issues"
Write-Host "Total issues: $($response.count)"
$response.issues | Format-Table -Property issue_type, severity, description

# Get health stats
$stats = Invoke-RestMethod -Uri "http://localhost:5000/api/issues/stats"
Write-Host "Road Grade: $($stats.stats.grade)"
```

## 🎭 Demo Scenario for Presentation

### Perfect Demo Flow (5 minutes)

**Minute 1: Introduction**
- "This is Vision-Indore, an AI-powered urban governance platform"
- Show the dashboard at http://localhost:3000
- Point out the live indicator and command center aesthetic

**Minute 2: Explain the Problem**
- "Traditional infrastructure monitoring is manual and slow"
- "Our solution uses Google Gemini AI to detect issues in real-time"
- "It identifies potholes, trash accumulation, and broken streetlights"

**Minute 3: Live Demo**
- Click "Choose Files" in Simulate Drive
- Select 5 pre-selected images (mix of potholes, trash, clean roads)
- Click "Start Simulation"
- Narrate: "The AI is analyzing each frame like a self-driving car would"

**Minute 4: Show Results**
- Point to markers appearing on map
- Click on a high-severity (red) marker
- Show Recent Alerts updating in real-time
- Highlight the Road Health Score and grade

**Minute 5: Show Data & Scalability**
- Open Firebase Console in another tab
- Show the Firestore database with real data
- Explain: "All data is stored in cloud, accessible by municipal authorities"
- Mention: "This scales to thousands of images per day"

### Pre-Demo Checklist

**30 Minutes Before:**
- [ ] Both servers running (backend on 5000, frontend on 3000)
- [ ] Clear all previous issues from Firestore (fresh start)
- [ ] Test internet connection (for Firebase & Gemini API)
- [ ] Close unnecessary browser tabs
- [ ] Prepare 5-7 good test images

**5 Minutes Before:**
- [ ] Load http://localhost:3000 in browser
- [ ] Verify "LIVE" indicator is pulsing
- [ ] Have test images ready on desktop
- [ ] Open Firebase Console in background tab (to show later)
- [ ] Check backend terminal for any errors

**During Demo:**
- [ ] Speak confidently while AI processes
- [ ] Point out the dark theme (modern, command center vibe)
- [ ] Highlight the real-time aspect
- [ ] Mention scalability and cost-effectiveness

## 🖼️ Recommended Test Images

### Good Image Characteristics:
- **Resolution**: 800x600 or higher
- **File Size**: 200KB - 2MB
- **Format**: JPG, JPEG, PNG
- **Clarity**: Well-lit, in-focus
- **Content**: Clear view of the issue

### Image Sources:
1. **Google Images**: Search "pothole road india"
2. **Unsplash**: Free high-quality photos
3. **Your Phone**: Take photos around your neighborhood
4. **Stock Photos**: Pexels, Pixabay

### Ideal Test Set (5 images):
1. ✅ Clear pothole image (expect: high severity)
2. ✅ Trash pile or overflowing bin (expect: medium severity)
3. ✅ Broken or dark streetlight (expect: medium severity)
4. ✅ Clean, well-maintained road (expect: no issues)
5. ✅ Road with minor cracks (expect: low severity)

## 📊 Expected AI Behavior

### Gemini AI Detection Patterns:

**Potholes:**
- Small cracks → Severity 2-3
- Medium pothole → Severity 5-6
- Large pothole → Severity 7-9
- Dangerous hole → Severity 10

**Trash:**
- Few pieces of litter → Severity 2-4
- Garbage pile → Severity 5-7
- Overflowing bin → Severity 6-8
- Major accumulation → Severity 9-10

**Broken Lights:**
- One dark light → Severity 4-6
- Multiple broken lights → Severity 7-9
- Critical safety issue → Severity 10

**No Issues:**
- Clean roads → Returns "none"
- Buildings/people only → Returns "none"

## 🐛 Common Testing Issues & Fixes

### Issue: "No issues detected" for obvious problems

**Causes:**
- Image too dark or blurry
- Issue not prominent in frame
- AI being conservative

**Solutions:**
- Use brighter, clearer images
- Images where issue fills at least 20% of frame
- Try multiple similar images

### Issue: False positives

**Causes:**
- Shadows mistaken for potholes
- Normal street features

**Solutions:**
- This is expected behavior (better safe than sorry)
- In production, would add confidence thresholds
- Human review would filter these

### Issue: Markers not appearing

**Causes:**
- Firebase connection delay
- Browser cache

**Solutions:**
- Wait 3-5 seconds
- Refresh page (F5)
- Check browser console (F12)

### Issue: Backend errors during upload

**Causes:**
- Image too large (>10MB)
- Invalid base64 encoding
- API key issues

**Solutions:**
- Resize images before upload
- Check `.env` file has valid API keys
- Restart backend server

## 📈 Performance Benchmarks

**Expected Performance:**
- **Single Image Analysis**: 2-3 seconds
- **Batch (5 images)**: 10-15 seconds
- **Batch (10 images)**: 20-30 seconds
- **Firebase Sync**: < 2 seconds
- **Map Update**: Instant

**Resource Usage:**
- **RAM**: ~300MB (backend) + ~400MB (frontend)
- **CPU**: Low (spikes during AI processing)
- **Network**: ~500KB per image upload

## 🎯 Testing Checklist

### Basic Functionality
- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Map displays correctly
- [ ] Can select files
- [ ] Can upload and process images
- [ ] Markers appear on map
- [ ] Alerts show in sidebar
- [ ] Health score updates

### Real-Time Features
- [ ] Multiple browser windows sync
- [ ] Firebase updates within 3 seconds
- [ ] Live indicator pulses
- [ ] No page refresh needed

### Data Integrity
- [ ] Issue data saved to Firestore
- [ ] Coordinates are accurate
- [ ] Severity scores reasonable
- [ ] Descriptions make sense
- [ ] Timestamps are correct

### Error Handling
- [ ] Handles no image selection
- [ ] Handles too many images (>10)
- [ ] Shows error messages clearly
- [ ] Recovers from API failures

## 🚀 Ready for Demo!

Your prototype is **FULLY FUNCTIONAL** and ready for:
- ✅ Hackathon presentation
- ✅ Live demonstration
- ✅ Technical Q&A
- ✅ Judge evaluation
- ✅ Investor pitch

**Remember:** 
- The AI is real (Google Gemini)
- The data is real (Firebase)
- The detections are real-time
- The concept is production-ready

**Good Luck! 🎉**

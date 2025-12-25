const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  path.join(__dirname, 'firebase-service-account.json');

let db;

try {
  // Read the service account file
  const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
  const serviceAccount = JSON.parse(serviceAccountJson);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.log('💡 Make sure to:');
  console.log('   1. Download your Firebase service account JSON');
  console.log('   2. Place it in server/config/firebase-service-account.json');
  console.log('   3. Or set FIREBASE_SERVICE_ACCOUNT_PATH in .env');
}

module.exports = { admin, db };

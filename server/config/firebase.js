const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let db;

try {
  // For production (Render/Heroku), use environment variables
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
    console.log('✅ Firebase initialized with environment variables');
  } else {
    // For local development, use service account JSON
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
      path.join(__dirname, 'firebase-service-account.json');
    const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase initialized from JSON file');
  }

  db = admin.firestore();
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.log('💡 Set these environment variables in production:');
  console.log('   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
}

module.exports = { admin, db };

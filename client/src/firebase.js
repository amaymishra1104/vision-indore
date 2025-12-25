import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Subscribes to real-time updates of issues from Firestore
 * @param {Function} callback - Function to call when data changes
 * @param {number} limitCount - Maximum number of documents to retrieve
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToIssues = (callback, limitCount = 100) => {
  const issuesRef = collection(db, 'issues');
  const q = query(
    issuesRef,
    orderBy('created_at', 'desc'),
    limit(limitCount)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const issues = [];
    snapshot.forEach((doc) => {
      issues.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(issues);
  }, (error) => {
    console.error('Error subscribing to issues:', error);
  });

  return unsubscribe;
};

export { db };

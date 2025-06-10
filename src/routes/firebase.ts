import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDf1fNXGVFHli1OAJh7bPx4-8B8gie-eTw',
  authDomain: 'nwitter-reloaded-coco.firebaseapp.com',
  projectId: 'nwitter-reloaded-coco',
  storageBucket: 'nwitter-reloaded-coco.firebasestorage.app',
  messagingSenderId: '137946994407',
  appId: '1:137946994407:web:1a20c8ec11ea6d6f327442',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

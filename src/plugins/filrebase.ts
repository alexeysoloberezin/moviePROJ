import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from '@/firebaseConfig.js';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Export the Firebase authentication object
export const firestore = getFirestore(app); // Export the Firebase Firestore object

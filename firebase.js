// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd6ZsF836jSEzyNfSuQnOCAH2iV4S-0O8",
    authDomain: "skintric.firebaseapp.com",
    projectId: "skintric",
    storageBucket: "skintric.firebasestorage.app",
    messagingSenderId: "48145313608",
    appId: "1:48145313608:web:022fda51e8e299ef554d7d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

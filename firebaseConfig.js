// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCgr1JpIhHd81fzzq7eamD_vN99ir5LEbk",
    authDomain: "legendmobile-454b6.firebaseapp.com",
    projectId: "legendmobile-454b6",
    storageBucket: "legendmobile-454b6.firebasestorage.app",
    messagingSenderId: "548892187070",
    appId: "1:548892187070:web:56e3d26a0767d0c05b01ef",
    measurementId: "G-2ELQWLXFCX"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

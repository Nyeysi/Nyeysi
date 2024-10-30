const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0oSaTA4N7yhRFHw7IaAjRf8XSFp9BUkU",
    authDomain: "appointment-bc12e.firebaseapp.com",
    projectId: "appointment-bc12e",
    storageBucket: "appointment-bc12e.appspot.com",
    messagingSenderId: "395862541041",
    appId: "1:395862541041:web:10e3a82afc6f2652cfdf50",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

async function getAdminAccount() {
    try {
        const adminDoc = await db.collection('admin').doc('admin').get();
        if (adminDoc.exists) {
            return adminDoc.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching admin account:', error);
        return null;
    }
}

module.exports = { auth, db, getAdminAccount };



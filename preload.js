const { contextBridge } = require('electron');
const firebase = require('./firebase');

contextBridge.exposeInMainWorld('auth', {
    signInWithEmailAndPassword: (email, password) => firebase.auth().signInWithEmailAndPassword(email, password),
    signOut: () => firebase.auth().signOut(),
    onAuthStateChanged: (callback) => firebase.auth().onAuthStateChanged(callback)
});
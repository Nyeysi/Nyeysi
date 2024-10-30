const { app, BrowserWindow } = require('electron');
const path = require('path');
const firebase = require('./firebase'); // Import your firebase configuration

// index.js


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Function to get admin data
async function getAdminData() {
    try {
        const adminDoc = await firebase.firestore().collection('admins').doc('adminId').get();
        if (adminDoc.exists) {
            console.log('Admin Data:', adminDoc.data());
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error getting document:', error);
    }
}

// Example login function
async function login(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('User logged in:', userCredential.user);
        await getAdminData();
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

// Example usage
login('admin@example.com', 'adminPassword');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { getAdminData } = require('./firebase');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('renderer/assets/index.html');

    // Fetch admin data when the window is ready
    mainWindow.webContents.on('did-finish-load', async () => {
        try {
            const adminData = await getAdminData();
            console.log('Admin Data:', adminData);
            // You can send the admin data to the renderer process if needed
            mainWindow.webContents.send('admin-data', adminData);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    });
}

app.whenReady().then(createWindow);

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

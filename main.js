const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#050505',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: "persist:skilltracker" // Ensures session survives restarts
    }
  });

  // Always load home first
  win.loadFile(path.join(__dirname, "views", "home.html"));
  
  // Optional: Open DevTools to catch errors
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
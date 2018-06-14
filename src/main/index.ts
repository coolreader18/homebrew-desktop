import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import isDev from "common/isDev";

app.setName("homebrew-desktop");

let mainWindow: BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    backgroundColor: "#fafafa",
    show: false,
    icon: path.join(__static, "icons/png/64x64.png"),
    title: "Homebrew Desktop"
  });
  // mainWindow.setMenu(null)
  if (isDev) mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : `file://${path.join(__dirname, "index.html")}`
  );

  ipcMain.once("ready-to-show", () => {
    mainWindow!.show();
  });
  // Emitted when the window is closed.
  mainWindow.once("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

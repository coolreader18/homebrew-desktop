import { app, BrowserWindow } from "electron";
import * as path from "path";
// import icon from "static/icons/png/64x64.png";

app.setName("homebrew-desktop");

let mainWindow: BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#fafafa",
    icon: path.join(__dirname, "../../static/icons/png/64x64.png")
  });
  //mainWindow.setMenu(null)
  // and load the index.html of the app.
  mainWindow.loadURL(
    `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
  );

  BrowserWindow.addDevToolsExtension(
    "/home/coolreader18/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0/"
  );
  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
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
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

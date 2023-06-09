const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { exec } = require('child_process');


function runScriptAndCaptureOutput(scriptPath) {
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        reject(error);
        return;
      }
      
      resolve(stdout.trim());
    });
  });
}

async function handleFileOpen () {
   
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    try {
      const output = await runScriptAndCaptureOutput(`test.js ${filePaths[0]}`);
      return output
      // Further processing with the output
    } catch (error) {
      console.error('An error occurred:', error);
      return error
    }


      };
      
    
     
     
  }
  



function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
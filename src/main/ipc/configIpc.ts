import { ipcMain } from 'electron';
import { saveConfig, getConfig } from '../db/configDb';

ipcMain.handle('save-config', async (_, config) => {
  return await saveConfig(config);
});

ipcMain.handle('get-config', async () => {
  return await getConfig();
});

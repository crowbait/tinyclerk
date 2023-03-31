/* eslint no-unused-vars: off */
import fs from 'fs';
import { finished } from 'stream/promises';
import { dialog, ipcMain } from "electron";
import { parse } from 'csv-parse';
import Store from 'electron-store';

const ipcCallbacks = () => {
  ipcMain.on('error', async (event, args) => {
    const message = args[0];
    console.log(`ipc: Error: ${message}`);
    dialog.showErrorBox("Error", message);
  });



  ipcMain.on('read-store', async (event, args) => {
    args = args[0];
    console.log(`ipc: Read Store: ${args.store}: ${args.variable}`);
    const store = new Store({name: args.store});
    event.reply('read-store', store.get(args.variable, "") as string);
  });
  ipcMain.on('write-store', async (event, args) => {
    args = args[0];
    console.log(`ipc: Write Store: ${args.store}: ${args.variable}`);
    const store = new Store({name: args.store});
    store.set(args.variable, args.value);
  });



  ipcMain.on('read-csv', async (event, args) => {
    args = args[0];
    console.log(`ipc: Read CSV: ${args.path}`);

    const readCSV = async () => {
      const records: any[] = [];
      const parser = fs.createReadStream(args.path).pipe(parse({
        // CSV options: https://csv.js.org/parse/options/
        columns: true,
        delimiter: args.delimiter
      }));
      parser.on('readable', () => {
        let record: any;
        // lint flags assignments in loop but it is the most efficient method in this case
        // eslint-disable-next-line
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      });
      await finished(parser);
      return records;
    }

    try {
      event.reply('read-csv', await readCSV());
    } catch (error: any) {
      dialog.showErrorBox("Error", error.message);
      event.reply('read-csv', 'error');
    }
  });
}

export default ipcCallbacks;

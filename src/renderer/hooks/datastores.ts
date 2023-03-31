type validStores = "settings" | "data";

export const readStore = ({store, variable}: {store: validStores, variable: string}): Promise<string> => {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('read-store', (args) => {
      console.log(args);
      resolve(args as string);
    });
    window.electron.ipcRenderer.sendMessage('read-store', [{store: `tinyclerk-${store}`, variable: variable}]);
  });
}

export const writeStore = ({store, variable, value}: {store: validStores, variable: string, value: string}) => {
  window.electron.ipcRenderer.sendMessage('write-store', [{store: `tinyclerk-${store}`, variable: variable, value: value}]);
}

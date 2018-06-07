import Store from "electron-store";
import { join } from "path";
import { app, remote } from "electron";

const appRemote = app || remote.app;

const config = new Store<AppConfig>({
  cwd: join(appRemote.getPath("appData"), appRemote.getName())
});
export const setConfig = (newConfig: Partial<AppConfig>) => {
  config.store = { ...config.store, ...newConfig };
};
export const getConfig = () => config.store;
export interface AppConfig {
  repositories: string[];
  currentRepository: number;
  directory: string;
}

import Store from "electron-store";
import { join } from "path";
import electron, { remote } from "electron";

const app = electron.app || remote.app;

export interface ReposConfig {
  repo: string;
  key: string;
}

export interface AppConfig {
  repositories: ReposConfig[];
  directory: string;
}
const config = new Store<AppConfig>({
  cwd: join(app.getPath("appData"), app.getName())
});
export const setConfig = (newConfig: Partial<AppConfig>) => {
  config.store = { ...config.store, ...newConfig };
};
export const getConfig = () => config.store;

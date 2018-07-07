import Store from "electron-store";
import electron, { remote } from "electron";

const app = electron.app || remote.app;

export interface ReposConfig {
  repo: string;
  key: string;
}

export interface AppConfig {
  /**
   * The list of repositories that the app will fetch.
   */
  repositories: ReposConfig[];
  /**
   * The base SD card directory or other directory to store apps in.
   */
  directory: string;
}
const config = new Store<AppConfig>();
export const setConfig = (newConfig: Partial<AppConfig>) => {
  config.store = { ...config.store, ...newConfig };
};
export const getConfig = () => config.store;

import Store from "electron-store";

export interface ReposConfig {
  repo: string;
  key: string;
}

export type HomebrewDirectory =
  | { type: "dir"; path: string }
  | { type: "ftp"; host: string; port?: number };

export interface AppConfig {
  /**
   * The list of repositories that the app will fetch.
   */
  repositories: ReposConfig[];
  /**
   * The base SD card directory or other directory to store apps in.
   */
  directory: HomebrewDirectory;
}

const config = new Store<AppConfig>();
export const setConfig = (newConfig: Partial<AppConfig>) => {
  config.store = { ...config.store, ...newConfig };
};
export const getConfig = () => config.store;

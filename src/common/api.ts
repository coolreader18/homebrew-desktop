import axios from "axios";
import * as path from "path";
import Stream from "stream";
import * as fs from "fs-extra-promise";
import { ReposConfig } from "common/config";

/**
 * Get the repositories at the specified urls, and normalize them
 * @param repositories - URLs of the repositories to fetch
 * @returns The normalized and parsed repositories
 */
export const getRepositories = async (...repositories: ReposConfig[]) => {
  const repos = await Promise.all(
    repositories.map(({ repo }) =>
      axios.get<HBASDirectory>(`${repo}/directory.json`)
    )
  );
  return repos.reduce((arr, cur, i) => {
    const { apps } = cur.data;
    for (const app of apps) {
      app.repository = repositories[i].repo;
      app.long_desc = app.long_desc.replace(/\\(?:n|t|v)/g, a =>
        JSON.parse(`"${a}"`)
      );
    }
    return arr.concat(apps);
  }, Array<HBASApp>());
};

/**
 * Download an app to an SD card or other directory.
 * @param baseDirectory - The base directory for the SD card or wherever else the
 * app is to be downloaded.
 * @param app - The HBASApp to be downloaded.
 */
export const downloadApp = async (
  baseDirectory: string,
  { directory, binary, repository }: HBASApp
) => {
  const appDirectory = path.join(baseDirectory, "wiiu/apps", directory);
  await fs.mkdirpAsync(appDirectory);
  await Promise.all(
    ["meta.xml", "icon.png", binary].map(async cur => {
      const { data } = await axios.get<Stream>(
        `${repository}/apps/${directory}/${cur}`,
        { responseType: "stream" }
      );
      data.pipe(fs.createWriteStream(path.join(appDirectory, cur)));
      await new Promise(res => data.once("end", res));
    })
  );
};

/**
 * Delete an app from from an SD card or other directory.
 * @param baseDirectory - The base directory for the SD card or wherever else the
 * app is to be removed from.
 * @param app - The HBASApp to be removed.
 */
export const removeApp = async (
  baseDirectory: string,
  { directory }: HBASApp
) => {
  await fs.removeAsync(`${baseDirectory}/wiiu/apps/${directory}`);
};

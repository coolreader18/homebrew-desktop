import axios from "axios";
import * as path from "path";
import * as fs from "fs-extra-promise";
import { ReposConfig, HomebrewDirectory } from "common/config";
import PromiseFtp from "promise-ftp";

/**
 * Get the repositories at the specified urls, and normalize them
 * @param repositories - URLs of the repositories to fetch
 * @returns the normalized and parsed repositories
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
  baseDirectory: HomebrewDirectory,
  { directory, binary, repository }: HBASApp
) => {
  const pipeFiles = async (
    stream: (file: string, stream: NodeJS.ReadableStream) => Promise<any> | void
  ) =>
    await Promise.all(
      ["meta.xml", "icon.png", binary].map(async cur => {
        const { data } = await axios.get<NodeJS.ReadableStream>(
          `${repository}/apps/${directory}/${cur}`,
          { responseType: "stream" }
        );
        const done = new Promise(res => data.once("end", res));
        const str = stream(cur, data);
        if (str) await str;
        else await done;
      })
    );

  switch (baseDirectory.type) {
    case "dir":
      const appDirectory = path.join(
        baseDirectory.path,
        "wiiu/apps",
        directory
      );
      await fs.mkdirpAsync(appDirectory);
      await pipeFiles((file, data) => {
        data.pipe(fs.createWriteStream(path.join(appDirectory, file)));
      });
      break;

    case "ftp":
      const ftp = new PromiseFtp();
      try {
        await ftp.connect(baseDirectory);
        const dir = path.join("/sd/wiiu/apps", directory);
        await ftp.mkdir(dir);
        await pipeFiles(async (file, data) => {
          try {
            await ftp.put(data, path.join(dir, file));
          } catch (e) {
            if (e.message !== "Success") throw e;
          }
        });
        await ftp.end();
      } catch {}
      break;
  }
};

/**
 * Delete an app from from an SD card or other directory.
 * @param baseDirectory - The base directory for the SD card or wherever else the
 * app is to be removed from.
 * @param app - The HBASApp to be removed.
 */
export const removeApp = async (
  baseDirectory: HomebrewDirectory,
  { directory }: HBASApp
) => {
  switch (baseDirectory.type) {
    case "dir":
      await fs.removeAsync(
        path.join(baseDirectory.path, "wiiu/apps", directory)
      );
      break;

    case "ftp":
      const ftp = new PromiseFtp();
      await ftp.connect(baseDirectory);
      await ftp.rmdir(path.join("/sd/wiiu/apps", directory), true);
      await ftp.end();
      break;
  }
};

export const listApps = async (directory: HomebrewDirectory) => {
  let dirs: string[];
  switch (directory.type) {
    case "dir":
      dirs = await fs.readdirAsync(path.join(directory.path, "wiiu/apps"));
      break;

    case "ftp":
      const ftp = new PromiseFtp();
      await ftp.connect(directory);
      const list = await ftp.list("/sd/wiiu/apps");
      dirs = list.filter(f => f.type === "d").map(f => f.name);
      await ftp.end();
      break;
  }
  return dirs!;
};

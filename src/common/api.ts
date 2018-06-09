import axios from "axios";
import * as path from "path";
import Stream from "stream";
import * as fs from "fs-extra-promise";

export const getRepositories = async (...repositories: string[]) =>
  (await Promise.all(
    repositories.map(cur => axios.get<HBASDirectory>(`${cur}/directory.json`))
  )).reduce((arr, cur, i) => {
    const { apps } = cur.data;
    for (const app of apps) {
      app.repository = repositories[i];
      app.long_desc = app.long_desc.replace(/\\(?:n|t|v)/g, a =>
        JSON.parse(`"${a}"`)
      );
    }
    return arr.concat(apps);
  }, Array<HBASApp>());

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

export const removeApp = async (
  baseDirectory: string,
  { directory }: HBASApp
) => {
  await fs.removeAsync(`${baseDirectory}/wiiu/apps/${directory}`);
};

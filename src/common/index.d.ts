declare interface HBASApp {
  updated: string;
  long_desc: string;
  web_hits: number;
  app_hits: number;
  desc: string;
  binary: string;
  name: string;
  author: string;
  url: string;
  cat: string;
  version: string;
  filesize: number;
  directory: string;
  type: string;
  channel: string;
}

declare interface HBASDirectory {
  updated: string;
  apps: HBASApp[];
}

declare module "*/repo.json" {
  const value: HBASDirectory;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

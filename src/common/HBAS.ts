export interface HBASApp {
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

export interface HBASDirectory {
  updated: string;
  apps: HBASApp[];
}

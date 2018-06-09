import { Container } from "unstated";
import { AppConfig, setConfig, getConfig } from "common/config";
import * as fs from "fs-extra-promise";
import * as path from "path";

export class EventContainer<State extends object> extends Container<State> {
  stateDidUpdate?(prevState: State): PromiseLike<void> | void;
  async setState<K extends keyof State>(
    state:
      | ((prevState: Readonly<State>) => Partial<State> | State | null)
      | (Partial<State> | State | null),
    callback?: (() => void) | null,
    stateDidUpdateShouldTrigger: boolean = true
  ) {
    const prevState = this.state;
    await Container.prototype.setState.call(this, state, callback);
    if (this.stateDidUpdate && stateDidUpdateShouldTrigger) {
      await this.stateDidUpdate(prevState);
    }
  }
}

export class ConfigContainer extends EventContainer<AppConfig> {
  state = getConfig();

  async stateDidUpdate(prev: AppConfig) {
    const { state } = this;
    setConfig(state);
    if (state.directory !== prev.directory) {
      appsInfoContainer.loadFromDirectory();
    }
  }
}

export const configContainer = new ConfigContainer();

export interface AppInfo {
  loading: boolean;
  installed: boolean;
}

export interface AppsInfo {
  [key: string]: AppInfo;
}

export class AppsInfoContainer extends Container<AppsInfo> {
  state: AppsInfo = {};
  assign = (app: string, newVal: Partial<AppInfo>) => {
    this.setState(prev => ({ ...prev, [app]: { ...prev[app], ...newVal } }));
  };
  constructor() {
    super();
    this.loadFromDirectory();
  }
  reset(newVal: AppsInfo = {}) {
    return this.setState(() => (this.state = newVal));
  }
  async loadFromDirectory() {
    const dirs = await fs.readdirAsync(
      path.join(configContainer.state.directory, "wiiu/apps")
    );
    appsInfoContainer.reset(
      dirs.reduce((obj: AppsInfo, cur) => {
        obj[cur] = { loading: false, installed: true };
        return obj;
      }, {})
    );
  }
}

export const appsInfoContainer = new AppsInfoContainer();

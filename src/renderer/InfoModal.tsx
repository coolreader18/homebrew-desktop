import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { ModalProps } from "@material-ui/core/Modal";
import * as icons from "@material-ui/icons";
import cn from "classnames";
import { HBASApp } from "common/HBAS";
import React, { PureComponent } from "react";
import CenteredModal from "./CenteredModal";
import { appsInfoContainer, AppsInfoContainer, AppInfo } from "./state";
import { AppStyles } from "./styles";
import { Subscribe } from "unstated";

const defaultAppInfo: AppInfo = {
  loading: false,
  installed: false
};

export default class InfoModal extends PureComponent<
  ModalProps &
    AppStyles & {
      info: HBASApp | null;
      download: (app: HBASApp) => Promise<void>;
      repository: string;
    }
> {
  download = async () => {
    const app = this.props.info!.directory;
    appsInfoContainer.assign(app, { loading: true });
    await this.props.download(this.props.info!);
    appsInfoContainer.assign(app, { installed: true, loading: false });
  };
  render() {
    const { info, classes, download, repository, ...props } = this.props;
    return (
      <CenteredModal {...props}>
        {info && (
          <Card className={classes.modalCard}>
            <CardMedia
              image={`${repository}/apps/${info.directory}/icon.png`}
              title={`Image for ${info.name}`}
              className={classes.modalCardImage}
            />
            <CardContent>
              <Typography variant="title">{info.name}</Typography>
              <Typography variant="subheading">by {info.author}</Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.paragraph}
              >
                {info.long_desc}
              </Typography>
            </CardContent>
            <CardActions dir="rtl">
              <Subscribe to={[appsInfoContainer]}>
                {({
                  state: {
                    [info.directory]: { loading, installed } = defaultAppInfo
                  }
                }: AppsInfoContainer) => (
                  <div className={classes.wrapper}>
                    <Button
                      variant="outlined"
                      className={cn(classes.button, {
                        [classes.buttonSuccess]: installed
                      })}
                      onClick={this.download}
                      disabled={loading}
                    >
                      <icons.FileDownload className={classes.leftIcon} />
                      {installed && "re"}download
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={cn(classes.buttonProgress, {
                          [classes.buttonProgressInstalled]: installed
                        })}
                      />
                    )}
                  </div>
                )}
              </Subscribe>
            </CardActions>
          </Card>
        )}
      </CenteredModal>
    );
  }
}

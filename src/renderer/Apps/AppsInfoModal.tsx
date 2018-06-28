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
import React, { PureComponent } from "react";
import CenteredModal from "../CenteredModal";
import {
  appsInfoContainer,
  AppsInfoContainer,
  AppInfo,
  configContainer
} from "../state";
import { Subscribe } from "unstated";
import { downloadApp, removeApp } from "common/api";
import { AppsStyles } from "./appsStyles";

const defaultAppInfo: AppInfo = {
  loading: false,
  installed: false
};

export default class InfoModal extends PureComponent<
  ModalProps &
    AppsStyles & {
      info: HBASApp;
    }
> {
  download = async () => {
    const { directory } = this.props.info;
    appsInfoContainer.assign(directory, { loading: true });
    await downloadApp(configContainer.state.directory, this.props.info);
    appsInfoContainer.assign(directory, { installed: true, loading: false });
  };
  remove = async () => {
    const app = this.props.info!.directory;
    await removeApp(configContainer.state.directory, this.props.info!);
    appsInfoContainer.assign(app, { installed: false });
  };
  render() {
    const {
      info: { directory, repository, name, author, long_desc },
      classes,
      ...props
    } = this.props;
    return (
      <CenteredModal {...props}>
        <Card className={classes.modalCard}>
          <CardMedia
            image={`${repository}/apps/${directory}/icon.png`}
            title={`Image for ${name}`}
            className={classes.modalCardImage}
          />
          <CardContent>
            <Typography variant="title">{name}</Typography>
            <Typography variant="subheading">by {author}</Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.paragraph}
            >
              {long_desc}
            </Typography>
          </CardContent>
          <Subscribe to={[appsInfoContainer]}>
            {({
              state: { [directory]: { loading, installed } = defaultAppInfo }
            }: AppsInfoContainer) => (
              <CardActions dir="rtl">
                <div className={classes.wrapper}>
                  <Button
                    variant="outlined"
                    className={cn(classes.button, {
                      [classes.buttonSuccess]: installed
                    })}
                    onClick={this.download}
                    disabled={loading}
                  >
                    {installed && "re"}download
                    <icons.FileDownload className={classes.leftIcon} />
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
                {installed && (
                  <div className={classes.wrapper}>
                    <Button
                      variant="outlined"
                      onClick={this.remove}
                      className={classes.button}
                    >
                      remove
                      <icons.Delete className={classes.leftIcon} />
                    </Button>
                  </div>
                )}
              </CardActions>
            )}
          </Subscribe>
        </Card>
        )}
      </CenteredModal>
    );
  }
}

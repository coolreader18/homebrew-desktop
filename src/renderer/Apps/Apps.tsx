import { withStyles } from "@material-ui/core";
import { WithWidthProps } from "@material-ui/core/withWidth";
import deepEqual from "deep-equal";
import React, { Component } from "react";
import AppsGrid from "./AppsGrid";
import AppsInfoModal from "./AppsInfoModal";
import appsStyles, { AppsStyles } from "./appsStyles";

type AppsProps = AppsStyles &
  WithWidthProps & {
    directory: HBASApp[];
  };

interface AppsState {
  modal: HBASApp;
  modalOpen: boolean;
}

class Apps extends Component<AppsProps, AppsState> {
  constructor(props: AppsProps) {
    super(props);
  }
  state: AppsState = {
    modal: this.props.directory[0],
    modalOpen: false
  };
  openModal = (index: number) => (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const app = this.props.directory[index];
    this.setState({ modal: app, modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const {
      props,
      state: { modal, modalOpen }
    } = this;
    const { classes } = props;
    return (
      <>
        <AppsGrid {...props} onClick={this.openModal} />
        <AppsInfoModal
          info={modal}
          open={modalOpen}
          onClose={this.closeModal}
          {...{ classes }}
        />
      </>
    );
  }
  shouldComponentUpdate(newProps: AppsProps, newState: AppsState) {
    return (
      newState.modalOpen !== this.state.modalOpen ||
      !deepEqual(newProps.directory, this.props.directory)
    );
  }
}

export default withStyles(appsStyles)(Apps);

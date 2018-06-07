import React, { PureComponent } from "react";
import { StylesConsumer } from "./styles";
import { Modal } from "@material-ui/core";
import { ModalProps } from "@material-ui/core/Modal";

export default class CenteredModal extends PureComponent<
  ModalProps & { children?: any }
> {
  render() {
    const { children, ...props } = this.props;
    return (
      <StylesConsumer>
        {classes => (
          <Modal {...props}>
            <div className={classes.modalBase}>{children}</div>
          </Modal>
        )}
      </StylesConsumer>
    );
  }
}

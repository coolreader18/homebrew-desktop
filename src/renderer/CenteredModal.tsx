import React from "react";
import { Modal, withStyles } from "@material-ui/core";
import { ModalProps } from "@material-ui/core/Modal";
import cn from "classnames";
import baseStyles, { BaseStyles } from "./baseStyles";

type CenteredModalProps = BaseStyles & ModalProps & { children?: any };

const CenteredModal: React.SFC<CenteredModalProps> = ({
  children,
  classes,
  ...props
}) => (
  <Modal {...props}>
    <div className={cn(classes.flexBase, classes.modalBase)}>{children}</div>
  </Modal>
);

export default withStyles(baseStyles)<CenteredModalProps>(CenteredModal);

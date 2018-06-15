import { createStyles, Theme, WithStyles, colors } from "@material-ui/core";
import React from "react";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

const styles = (theme: Theme) =>
  createStyles({
    clickable: {
      cursor: "pointer"
    },
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    flexBase: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modalBase: {
      pointerEvents: "none"
    },
    modalCard: {
      pointerEvents: "auto",
      maxWidth: "75vw"
    },
    gridList: {
      width: "100%"
    },
    paragraph: {
      whiteSpace: "pre-line"
    },
    menuIcon: {
      marginLeft: -12,
      marginRight: 20
    },
    modalCardImage: {
      height: "15vw",
      width: "100%",
      backgroundSize: "cover"
    },
    appBar: {
      top: 0,
      position: "fixed"
    },
    progress: {
      margin: theme.spacing.unit * 2
    },
    buttonProgress: {
      color: colors.green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    buttonProgressInstalled: {
      color: colors.lightGreen[200]
    },
    buttonSuccess: {
      backgroundColor: colors.green[500],
      "&:hover": {
        backgroundColor: colors.green[700]
      }
    },
    wrapper: {
      margin: 0,
      position: "relative"
    },
    unclickable: {
      userDrag: "none",
      userSelect: "none"
    },
    pointer: { cursor: "default" },
    gridListImg: {
      left: "50%",
      height: "100%",
      position: "relative",
      transform: "translateX(-50%)"
    },
    list: { width: 200 },
    reposList: { maxHeight: 500, overflow: "auto", maxWidth: 300 }
  });

const nullAny: any = null;
export type AppStyles = WithStyles<typeof styles>;
export type AppClasses = AppStyles["classes"];
const stylesContext = React.createContext<AppClasses>(nullAny);
export const {
  Consumer: StylesConsumer,
  Provider: StylesProvider
} = stylesContext;
const widthContext = React.createContext<Breakpoint>(nullAny);
export const {
  Consumer: WidthConsumer,
  Provider: WidthProvider
} = widthContext;
export default styles;

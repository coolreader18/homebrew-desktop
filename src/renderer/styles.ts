import { createStyles, Theme, WithStyles, colors } from "@material-ui/core";
import React from "react";

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
    modalBase: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      pointerEvents: "none",
      justifyContent: "center"
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
      margin: theme.spacing.unit,
      position: "relative"
    }
  });

export type AppStyles = WithStyles<typeof styles>;
export type AppClasses = AppStyles["classes"];
const stylesContext = React.createContext<AppClasses>(<any>{});
export const {
  Consumer: StylesConsumer,
  Provider: StylesProvider
} = stylesContext;
export default styles;

import { createStyles, Theme, WithStyles, colors } from "@material-ui/core";
import baseStyles from "../baseStyles";

const appsStyles = (theme: Theme) =>
  createStyles({
    ...baseStyles(theme),
    gridList: {
      width: "100%"
    },
    gridListImg: {
      left: "50%",
      height: "100%",
      position: "relative",
      transform: "translateX(-50%)",
      cursor: "pointer"
    },
    paragraph: {
      whiteSpace: "pre-line"
    },
    button: {
      margin: theme.spacing.unit
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
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    modalCard: {
      pointerEvents: "auto",
      maxWidth: "75vw"
    },
    modalCardImage: {
      height: "15vw",
      width: "100%",
      backgroundSize: "cover"
    }
  });

export type AppsStyles = WithStyles<typeof appsStyles>;
export type AppsClasses = AppsStyles["classes"];

export default appsStyles;

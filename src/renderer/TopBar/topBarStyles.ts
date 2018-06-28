import { createStyles, Theme, WithStyles } from "@material-ui/core";
import baseStyles from "../baseStyles";

const topBarStyles = (theme: Theme) =>
  createStyles({
    ...baseStyles(theme),
    list: { width: 200 },
    appBar: {
      top: 0,
      position: "fixed"
    },
    menuIcon: {
      marginLeft: -12,
      marginRight: 20
    }
  });

export type TopBarStyles = WithStyles<typeof topBarStyles>;
export type TopBarClasses = TopBarStyles["classes"];

export default topBarStyles;

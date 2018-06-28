import { createStyles, Theme, WithStyles } from "@material-ui/core";
import baseStyles from "../baseStyles";

const configStyles = (theme: Theme) =>
  createStyles({
    ...baseStyles(theme),
    reposList: {
      maxHeight: 500,
      overflow: "auto",
      maxWidth: 300
    }
  });

export type ConfigStyles = WithStyles<typeof configStyles>;
export type ConfigClasses = ConfigStyles["classes"];

export default configStyles;

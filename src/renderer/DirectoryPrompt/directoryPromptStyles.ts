import { createStyles, Theme, WithStyles } from "@material-ui/core";
import baseStyles from "../baseStyles";

const directoryPromptStyles = (theme: Theme) =>
  createStyles({
    ...baseStyles(theme),
    textField: { margin: 10 },
    flex: {
      display: "flex"
    },
    hostField: {
      flex: "0 1 80%"
    },
    ipField: {
      flex: "0 1 22%"
    }
  });

export type DirectoryPromptStyles = WithStyles<typeof directoryPromptStyles>;
export type DirectoryPromptClasses = DirectoryPromptStyles["classes"];

export default directoryPromptStyles;

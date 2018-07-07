import { Theme, createStyles, WithStyles } from "@material-ui/core";

/**
 * The base styles for the app, kinda like atomic CSS classes,
 * injected into all the other styles for the different sections.
 */
const baseStyles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: 0,
      position: "relative"
    },
    modalBase: {
      pointerEvents: "none"
    },
    flexBase: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

export type BaseStyles = WithStyles<typeof baseStyles>;
export type BaseClasses = BaseStyles["classes"];

export default baseStyles;

import { createMuiTheme, colors } from "@material-ui/core";
import Color from "color";

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.cyan[500]
    },
    secondary: {
      main: Color(colors.lightBlue[500])
        .alpha(0.7)
        .string()
    }
  }
});

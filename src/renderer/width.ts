import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import React from "react";

const widthContext = React.createContext<Breakpoint>(null as any);
export const {
  Consumer: WidthConsumer,
  Provider: WidthProvider
} = widthContext;

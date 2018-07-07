import { PureComponent, SFC } from "react";

/**
 * Convert a functional component to a PureComponent class.
 * @param funcComponent - The functional component to convert to a PureComponent
 * @param name - A name to give to the returned PureComponent class.
 */
const pureFunction = <P extends any = {}>(
  funcComponent: SFC<P>,
  name: string = ""
) => {
  const comp = class FunctionalPureComponent extends PureComponent<P> {
    render() {
      return funcComponent(this.props);
    }
  };
  Object.defineProperty(comp, "name", { value: name });
  return comp;
};

export default pureFunction;

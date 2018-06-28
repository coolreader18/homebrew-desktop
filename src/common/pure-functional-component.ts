import { PureComponent, SFC } from "react";

const pureFunction = (name: string) => <P extends any = {}>(
  funcComponent: SFC<P>
) => {
  const [comp] = [
    class extends PureComponent<P> {
      render() {
        return funcComponent(this.props);
      }
    }
  ];
  Object.defineProperty(comp, "name", { value: name });
  return comp;
};

export default pureFunction;

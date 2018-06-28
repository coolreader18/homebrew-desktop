import React from "react";

export const MultiProvider = ({
  providers,
  children
}: {
  providers: [React.Provider<any>, any][];
  children: React.ReactNode;
}) =>
  providers.reduce(
    (prev, [Cur, value]) => <Cur value={value}>{prev}</Cur>,
    children
  );

export class MultiConsumer<
  A extends { [k: string]: React.Consumer<any> },
  B extends {
    [k in keyof A]: A[k] extends (React.Consumer<infer G>) ? G : never
  }
> extends React.Component<{
  consumers: A;
  children: (obj: B) => React.ReactNode;
}> {
  render() {
    const { consumers, children } = this.props;
    const ret: { [k: string]: any } = {};
    Object.entries(consumers).reduce(
      (prev, [name, Cur]) => {
        <Cur>
          {cur => {
            ret[name] = cur;
            return prev;
          }}
        </Cur>;
      },
      (() => children(ret as B)) as any
    );
    return null;
  }
  shouldComponentUpdate() {
    return false;
  }
}

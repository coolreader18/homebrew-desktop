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

export const MultiConsumer = ({
  consumers,
  children
}: {
  consumers: React.Consumer<any>[];
  children: (...args: any[]) => React.ReactNode;
}) => {
  const ret = Array(consumers.length);
  consumers.reduce(
    (prev, Cur, i) => {
      <Cur>
        {cur => {
          ret[i] = cur;
          return prev;
        }}
      </Cur>;
    },
    (() => children(ret)) as any
  );
};

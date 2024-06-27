import React, { ReactNode } from "react";
const style = {
  background: "white",
};

type Props = {
  children: ReactNode;
};

const BodyWrapper = ({ children }: Props) => {
  return <div style={style}>{children}</div>;
};

export default BodyWrapper;

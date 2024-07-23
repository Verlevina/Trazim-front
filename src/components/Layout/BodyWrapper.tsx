import React from "react";
import SideFilterPanel from "../MainData/SideFilterPanel";
const style = {
  background: "white",
  margin: 0,
  padding: 0,
};

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const BodyWrapper = ({ children }: Props) => {
  return (
    <div style={style}>
      <SideFilterPanel>{children}</SideFilterPanel>
    </div>
  );
};

export default BodyWrapper;

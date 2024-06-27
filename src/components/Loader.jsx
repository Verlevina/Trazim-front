import React from "react";
import { LineWave } from "react-loader-spinner";
import { baseColor } from "../constants/colors";
const Loader = () => (
  <LineWave
    visible={true}
    height="100"
    width="100"
    color={baseColor}
    ariaLabel="line-wave-loading"
    wrapperStyle={{}}
    wrapperClass=""
    firstLineColor=""
    middleLineColor=""
    lastLineColor=""
  />
);

export default Loader;

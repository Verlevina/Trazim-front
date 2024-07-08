import React from "react";
import { LineWave } from "react-loader-spinner";
import { baseColor } from "../../constants/colors";
import { Grid } from "@mui/material";
const Loader = () => (
  <Grid container columns={{ xs: 12 }}>
    <Grid item alignContent={"center"} alignSelf={"stretch"}>
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
    </Grid>
  </Grid>
);

export default Loader;

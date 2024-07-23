import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to={""}>Trazim</Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;

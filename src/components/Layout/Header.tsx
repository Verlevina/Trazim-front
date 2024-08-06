import React from "react";
import AccountMenu from "./UserMenu";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguagePicker from "./LanguagesPicker";
import { useDispatch } from "react-redux";
import { setInitFilter } from "../../store/filter/filter";
import { HeaderHeight } from "../../constants/common";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: HeaderHeight,
}));

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Item>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}>
          <Button
            onClick={() => {
              dispatch(setInitFilter());
              navigate(`/list`);
            }}
          >
            Tražim
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          <LanguagePicker />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            <AccountMenu />
          </Box>
        </Grid>
      </Grid>
    </Item>
  );
};

export default Header;

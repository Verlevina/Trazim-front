import React from 'react';
import AccountMenu from './UserMenu';
import { Grid, Paper, styled } from '@mui/material';
import Logo from '../logo.svg';
import SideBar from './SideBar';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const H3 = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const Header: React.FC = () => {
  return (
    <Item>   
      <Grid container spacing={2}>
        <Grid item xs={4}>
        {/* <img  height="100" width = "100" src={Logo} alt="Tražim" /> */}
            <H3>Tražim</H3>
        </Grid>
        <Grid item xs={8} alignItems={'end'}>
            <AccountMenu/>
        </Grid>
      </Grid>
    </Item>
  );
};

export default Header;
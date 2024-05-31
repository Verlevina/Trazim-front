import React from 'react';
import AccountMenu from './UserMenu';
import { Box, Grid, Paper, styled } from '@mui/material';

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
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}>
        {/* <img  height="100" width = "100" src={Logo} alt="Tražim" /> */}
            <H3>Tražim</H3>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'center' , flexGrow: 1}}>      
          <AccountMenu/>
        </Box>
      </Grid>
    </Item>
  );
};

export default Header;
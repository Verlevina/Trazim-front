import React from 'react';
import AccountMenu from './UserMenu';
import { Box, Grid, Paper, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import LanguagePicker from './LanguagesPicker';

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
            <H3><Link to={`/`}>Tražim</Link></H3>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' , flexGrow: 1}}>   
          <LanguagePicker/>   
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'center' , flexGrow: 1}}>   
            <AccountMenu/>
          </Box>
        </Grid>
      </Grid>
    </Item>
  );
};

export default Header;
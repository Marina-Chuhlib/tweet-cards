import { NavLink } from 'react-router-dom';
import { AppBar, Container, Toolbar } from '@mui/material';
import { Home } from '@mui/icons-material';

import css from './NavBar.module.css';

const NavBar = () => {
  return (
    <>
      <AppBar
        position="static"
        component="header"
        sx={{
          background: '#d2cae6',
          position: 'fixed',
          top: 0,
          zIndex: '1',
          marginBottom: '20px',
          paddingLeft: '30px',
          paddingRight: '50px',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters component="nav">
            <Home sx={{ display: { md: 'flex' }, mr: 1, color: '#471CA9' }} />
            <NavLink
              to="/"
              className={css.link}
              style={{ marginRight: 'auto' }}
            >
              Home
            </NavLink>
            <NavLink to="/tweets" className={css.link}>
              Tweets
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;

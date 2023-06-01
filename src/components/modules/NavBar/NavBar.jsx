import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

const NavBar = () => {
  return (
    <>
      <AppBar
        position="static"
        component="header"
        sx={{ background: '#d2cae6' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters component="nav">
            <Home sx={{ display: { md: 'flex' }, mr: 1, color: '#471CA9' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/tweet-cards"
              sx={{
                mr: 'auto',
                display: { md: 'flex' },
                fontFamily: 'inherit',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#471CA9',
                textDecoration: 'none',
              }}
            >
              Home
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/tweet-cards/tweets"
              sx={{
                mr: 12,
                display: { md: 'flex' },
                fontFamily: 'inherit',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: '#471CA9',
                textDecoration: 'none',
                marginRight: '26px',
              }}
            >
              Tweets
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../reducers/reducer';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import ListItemText from '@material-ui/core/ListItemText';

class Header extends Component {
  componentDidMount() {}

  logout = () => {
    this.props.logout();
  };

  render() {
    const { reducer } = this.props;

    return (
      <Grid>
        {reducer.authenticated ? (
          <header>
            <AppBar style={styles.appbar} position="static" color="default">
              <Toolbar>
                <Grid
                  container
                  style={styles.container}
                  alignItems="center"
                  spacing={16}
                >
                  <Grid item style={styles.logo}>
                    <Link to="/" style={styles.link}>
                      <Typography variant="headline">
                        cl<span style={styles.ai}>
                          <u>ai</u>
                        </span>re.
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item style={styles.house}>
                    <Link to="/amazon-scape" style={styles.link}>
                      <Button
                        style={styles.nav}
                        color="secondary"
                        variant="extendedFab"
                      >
                        amazon-scape
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item style={styles.house}>
                    <Link to="/twitter-scape" style={styles.link}>
                      <Button
                        style={styles.nav}
                        color="secondary"
                        variant="extendedFab"
                      >
                        twitter-scape
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item style={styles.logout}>
                    <Link to="/" style={styles.link}>
                      <Button
                        onClick={this.logout}
                        style={styles.nav}
                        color="secondary"
                        variant="extendedFab"
                      >
                        logout
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </header>
        ) : null}
      </Grid>
    );
  }
}

export default connect(
  state => {
    return { reducer: state.reducer };
  },
  { logout }
)(Header);

const styles = {
  appbar: { backgroundColor: '#ffffff' },
  logo: { backgroundColor: '#fff59d', marginRight: 10, padding: 10 },
  house: {},
  link: {
    textDecoration: 'none',
    color: '#212121',
    textTransform: 'lowercase'
  },
  nav: {
    textTransform: 'lowercase'
  },
  logout: { position: 'absolute', right: 20 }
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Credentials from './Credentials';
import { login, register } from '../../reducers/reducer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Register component
// <Grid item xs={4} style={styles.box}>
//   <Credentials
//     credentials={this.login_credentials}
//     cta={'Register'}
//     submit={this.register}
//     email_error={this.registerEmailError}
//     password_error={this.registerPasswordError}
//     header={'Sign Up'}
//   />
// </Grid>

class reducerentication extends Component {
  state = { email: '', password: '' };

  login_credentials = e => {
    const updated = { ...this.state, [e.target.name]: e.target.value };
    this.setState(updated);
  };

  login = () => {
    this.props.login(this.state);
  };

  register = () => {
    this.props.register(this.state);
  };

  emailError = () => {
    const { reducer } = this.props;
    if (reducer.login && reducer.login.email) {
      return (
        <Typography style={styles.error} variant="subheading" color="error">
          {reducer.login.email}
        </Typography>
      );
    }
  };

  passwordError = () => {
    const { reducer } = this.props;
    if (reducer.login && reducer.login.password) {
      return (
        <Typography style={styles.error} variant="subheading" color="error">
          {reducer.login.password}
        </Typography>
      );
    }
  };

  failed = () => {
    const { reducer } = this.props;
    if (reducer.login && reducer.login.failed) {
      return (
        <Typography style={styles.error} variant="subheading" color="error">
          {reducer.login.failed}
        </Typography>
      );
    }
  };

  // Register error checks
  // registerEmailError = () => {
  //   const { reducer } = this.props;
  //   if (reducer.register && reducer.register.email) {
  //     return <div>{reducer.register.email}</div>;
  //   }
  // };
  //
  // registerPasswordError = () => {
  //   const { reducer } = this.props;
  //   if (reducer.register && reducer.register.password) {
  //     return <div>{reducer.register.password}</div>;
  //   }
  // };

  render() {
    return (
      <Grid
        style={{ height: '100%' }}
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item style={styles.logo}>
          <Typography variant="headline">
            cl<span>
              <u>ai</u>
            </span>re.
          </Typography>
        </Grid>
        <Grid item xs={4} style={styles.box}>
          <Credentials
            credentials={this.login_credentials}
            cta={'Login'}
            submit={this.login}
            email_error={this.emailError}
            password_error={this.passwordError}
            failed={this.failed}
            header={'Sign In'}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  state => {
    return { reducer: state.reducer };
  },
  { login, register }
)(reducerentication);

const styles = {
  logo: { backgroundColor: '#fff59d', padding: 10, marginTop: 40 },
  error: { paddingTop: 15 },
  box: { marginBottom: 30 }
};

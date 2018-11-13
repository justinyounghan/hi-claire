import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { analyzeTwitter } from '../../reducers/reducer';

class Twitter extends Component {
  state = {
    handle: '',
    loading: false
  };

  body = () => {
    return (
      <Grid container>
        <Grid item style={styles.amazon} xs={12}>
          <Typography variant="headline">
            <span style={styles.name}>twitter-scape</span> :
          </Typography>
          {this.handleInput()}
        </Grid>
      </Grid>
    );
  };

  handleInput = () => {
    return (
      <Grid container>
        <Grid item xs={8}>
          <TextField
            value={this.state.value}
            name="twitter"
            label="Twitter Handle"
            margin="normal"
            onChange={input => this.inputValue(input)}
            style={styles.input}
          />
        </Grid>

        <Grid container alignItems="center" direction="row" spacing={8}>
          <Grid item>
            <Button
              onClick={this.submitHandle}
              variant="contained"
              color="secondary"
              style={styles.button}
            >
              <u>analyze</u>
            </Button>
            {this.state.loading && !this.props.reducer.twitter ? (
              <CircularProgress
                style={styles.loading}
                thickness={7}
                size={30}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  inputValue = e => {
    e.preventDefault();
    this.setState({ ...this.state, handle: e.target.value });
  };

  submitHandle = async () => {
    if (this.state.handle !== '') {
      await this.setState({
        loading: true
      });
      await this.props.analyzeTwitter({
        handle: this.state.handle
      });
      await this.setState({
        handle: ''
      });
    }
  };

  content = () => {
    return this.body();
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center">
        {this.content()}
      </Grid>
    );
  }
}

export default connect(
  state => {
    return { reducer: state.reducer };
  },
  { analyzeTwitter }
)(Twitter);

const styles = {
  container: {},
  name: { backgroundColor: '#fff59d', padding: 10 },
  input: { width: '100%' },
  button: { textTransform: 'lowercase' },
  created: { textAlign: 'center' },
  loading: { position: 'absolute', left: 175, marginTop: 4 }
};

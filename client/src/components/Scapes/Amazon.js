import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { analyzeAmazon, fetchAmazonResults } from '../../reducers/reducer';

class Amazon extends Component {
  state = {
    asin: ''
  };

  body = () => {
    return (
      <Grid container>
        <Grid item style={styles.amazon} xs={12}>
          <Typography variant="headline">
            <span style={styles.name}>amazon-scape</span> :
          </Typography>
          {this.asinInput()}
        </Grid>
      </Grid>
    );
  };

  asinInput = () => {
    return (
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <TextField
            value={this.state.value}
            name="amazon"
            label="ASIN #"
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
            {this.inQueue()}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  inQueue = () => {
    if (this.props.reducer.loading) {
      return (
        <CircularProgress style={styles.loading} thickness={7} size={30} />
      );
    }

    return null;
  };

  inputValue = e => {
    e.preventDefault();
    this.setState({ ...this.state, asin: e.target.value });
  };

  submitHandle = async () => {
    if (this.state.asin !== '') {
      await this.props.analyzeAmazon({
        asin: this.state.asin
      });
      try {
        await this.props.fetchAmazonResults({
          id: this.props.reducer.amazon_request.id
        });
      } catch (error) {
        console.log(error);
      }
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
  { analyzeAmazon, fetchAmazonResults }
)(Amazon);

const styles = {
  container: {},
  name: { backgroundColor: '#fff59d', padding: 10 },
  input: { width: '100%' },
  button: { textTransform: 'lowercase' },
  created: { textAlign: 'center' },
  loading: { position: 'absolute', left: 175, marginTop: 4 }
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authentication from './Authentication';
import Todo from './Todo';
import Newsfeed from './Newsfeed';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
  body = () => {
    return (
      <Grid container style={styles.container}>
        <Grid item style={styles.todo} xs={6}>
          <Todo />
        </Grid>
        <Grid item style={styles.newsfeed} xs={6}>
          <Newsfeed />
        </Grid>
      </Grid>
    );
  };

  dashboard = () => {
    const { reducer } = this.props;
    if (reducer.authenticated) {
      return this.body();
    }
    return <Authentication />;
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center">
        {this.dashboard()}
      </Grid>
    );
  }
}

export default connect(
  state => {
    return { reducer: state.reducer };
  },
  null
)(Home);

const styles = {
  container: {
    height: '100%'
  },
  todo: {
    padding: 30
  },
  newsfeed: {
    padding: 30,
    height: 600,
    overflow: 'auto'
  }
};

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

import Authentication from './Authentication';
import Twitter from './Scapes/Twitter';
import Consumption from './Personality/Consumption';
import Needs from './Personality/Needs';
import Personality from './Personality/Personality';
import Values from './Personality/Values';

class TwitterScape extends Component {
  body = () => {
    const { twitter } = this.props.reducer;

    return (
      <Grid container style={styles.container}>
        <Grid item style={styles.box} xs={6}>
          <Twitter />
        </Grid>
        <Grid item style={styles.box} xs={12}>
          {twitter && !twitter.err ? (
            <div style={styles.gridList}>
              <GridList cellHeight={'auto'} cols={2}>
                <GridListTile cols={2} style={styles.box}>
                  <Consumption data={twitter} />
                </GridListTile>
                <GridListTile cols={2} style={styles.box}>
                  <Needs data={twitter} />
                  <Personality data={twitter} />
                  <Values data={twitter} />
                </GridListTile>
              </GridList>
            </div>
          ) : null}
          {twitter && twitter.err ? (
            <Grid item style={styles.box} xs={12}>
              <Typography variant="title">There was an Error</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    );
  };

  content = () => {
    const { reducer } = this.props;
    if (reducer.authenticated) {
      return this.body();
    }
    return <Authentication />;
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
  null
)(TwitterScape);

const styles = {
  container: {
    height: '100%'
  },
  box: { padding: 30 },
  title: { padding: 0 },
  gridList: { width: '100%' }
};

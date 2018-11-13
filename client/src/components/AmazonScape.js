import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

import Authentication from './Authentication';
import Amazon from './Scapes/Amazon';
import Consumption from './Personality/Consumption';
import Needs from './Personality/Needs';
import Personality from './Personality/Personality';
import Values from './Personality/Values';

class AmazonScape extends Component {
  state = { value: 0 };

  tab = (event, value) => {
    this.setState({ value });
  };

  body = () => {
    const { amazon } = this.props.reducer;

    return (
      <Grid container style={styles.container}>
        <Grid item style={styles.box} xs={6}>
          <Amazon />
        </Grid>
        <Grid item style={styles.box} xs={12}>
          <Tabs value={this.state.value} onChange={this.tab}>
            {amazon &&
              amazon.results &&
              amazon.results.profile !== null &&
              amazon.results.profile.map((personalities, i) => {
                if (personalities) {
                  return <Tab key={i} label={personalities.rating} />;
                } else {
                  return <Tab key={i} label="No Ratings" />;
                }
              })}
          </Tabs>
        </Grid>
        <Grid item style={styles.box} xs={12}>
          {amazon &&
            amazon.results &&
            amazon.results.profile !== null &&
            amazon.results.profile &&
            amazon.results.profile.map((personalities, i) => {
              if (personalities) {
                if (i === this.state.value) {
                  return (
                    <div key={i} style={styles.gridList}>
                      <Grid container>
                        <Grid item style={styles.box} xs={12}>
                          <Typography style={styles.title} variant="title">
                            Consumer Personality: @{personalities.rating}(s)
                          </Typography>
                        </Grid>
                      </Grid>
                      <GridList cellHeight={'auto'} cols={2}>
                        <GridListTile cols={2} style={styles.box}>
                          <Consumption data={personalities} />
                        </GridListTile>
                        <GridListTile cols={2} style={styles.box}>
                          <Needs data={personalities} />
                          <Personality data={personalities} />
                          <Values data={personalities} />
                        </GridListTile>
                      </GridList>
                    </div>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <div key={i} style={styles.gridList}>
                    <Grid container>
                      <Grid item style={styles.box} xs={12}>
                        <Typography style={styles.title} variant="headline">
                          Rating Unavailable
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                );
              }
            })}
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
)(AmazonScape);

const styles = {
  container: {
    height: '100%'
  },
  box: { padding: 30 },
  title: { padding: 0 },
  gridList: { width: '100%' }
};

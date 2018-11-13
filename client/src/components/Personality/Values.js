import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaletteIcon from '@material-ui/icons/Palette';

import ValuesChart from './Charts/ValuesChart';

export default ({ data }) => {
  return (
    <Grid
      container
      style={styles.container}
      alignItems="center"
      justify="center"
    >
      <Grid item style={styles.body} xs={12}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="title" style={styles.title}>
                <span style={styles.title_content}>personal values</span>{' '}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Grid
          container
          style={styles.container}
          alignItems="center"
          justify="center"
        >
          <Grid item style={styles.body} xs={12}>
            <ValuesChart
              values_data={data.profile.values.map(
                ({ name, percentile }, i) => {
                  return { name, value: percentile };
                }
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {},
  title: {
    paddingTop: 20,
    paddingBottom: 20
  },
  title_content: { backgroundColor: '#fff59d', padding: 10 },
  body: {},
  children: { marginTop: 20 }
};

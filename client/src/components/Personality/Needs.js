import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';

import NeedsChart from './Charts/NeedsChart';

export default ({ data }) => {
  return (
    <Grid
      container
      direction="row"
      style={styles.container}
      alignItems="center"
      justify="center"
    >
      <Grid item style={styles.body} xs={12}>
        <List>
          <ListItem>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="title" style={styles.title}>
                <span style={styles.title_content}>
                  [<u>emotional</u>]
                </span>{' '}
                landscape
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <NeedsChart
          needs_data={data.profile.needs.map(({ name, percentile }, i) => {
            return { name, percentile };
          })}
        />
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
  rating: {},
  name: {}
};

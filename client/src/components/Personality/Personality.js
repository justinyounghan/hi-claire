import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SmileIcon from '@material-ui/icons/SentimentSatisfied';
import LinearProgress from '@material-ui/core/LinearProgress';

const colors = [
  '#FF7961',
  '#FF7070',
  '#FF6880',
  '#FF6090',
  '#E75EB9',
  '#D05CE3'
];

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
              <SmileIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="title" style={styles.title}>
                <span style={styles.title_content}>personality</span>{' '}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Grid
          container
          style={styles.container}
          direction="row"
          justify="space-evenly"
        >
          {data.profile.personality.map(({ name, percentile, children }, i) => {
            return (
              <Grid item key={i} style={styles.body} xs={2}>
                <Typography variant="title">
                  <span
                    style={{
                      padding: 10,
                      backgroundColor: colors[i],
                      color: '#ffffff'
                    }}
                  >
                    {name}
                  </span>
                </Typography>
                <div>
                  <LinearProgress
                    value={Math.round(percentile * 100)}
                    style={{ height: 10, backgroundColor: 'transparent' }}
                    variant="determinate"
                  />
                </div>
                {children.map(({ name, percentile }, j) => {
                  return (
                    <Grid key={j} container spacing={16}>
                      <Grid item style={styles.children} xs={12}>
                        <Typography variant="subheading">
                          <span
                            style={{
                              padding: 15,
                              textTransform: 'lowercase'
                            }}
                          >
                            _{name}
                          </span>
                        </Typography>
                        <LinearProgress
                          value={Math.round(percentile * 100)}
                          style={{
                            height: 10,
                            backgroundColor: colors[i]
                          }}
                          variant="determinate"
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: { marginBottom: 30 },
  title: {
    paddingTop: 20,
    paddingBottom: 20
  },
  title_content: { backgroundColor: '#fff59d', padding: 10 },
  body: {},
  children: { marginTop: 20 }
};

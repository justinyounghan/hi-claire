import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const colors = [
  '#FF7961',
  '#FF726C',
  '#FF6C78',
  '#FF6684',
  '#FF6090',
  '#EF5EAB',
  '#DF5DC7',
  '#D05CE3'
];

export default ({ data }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="title" style={styles.title}>
                <span style={styles.title_content}>
                  [<u>consumer</u>]
                </span>{' '}
                behavior
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <List component="nav" style={styles.nav}>
          {data &&
            data.profile.consumption_preferences.map((consumption, i) => (
              <div key={i}>
                <ListSubheader
                  style={{
                    backgroundColor: colors[i],
                    paddingTop: 10,
                    paddingBottom: 10,
                    textTransform: 'lowercase'
                  }}
                >
                  <Typography style={styles.name} variant="title">
                    {consumption.name}
                  </Typography>
                </ListSubheader>
                {consumption.consumption_preferences.map((preferences, j) => {
                  return (
                    <ListItem key={j}>
                      <IconButton>
                        {preferences.score === 0 ? (
                          <CloseIcon color="error" />
                        ) : preferences.score > 0.5 ? (
                          <StarIcon color="secondary" />
                        ) : (
                          <StarHalfIcon color="primary" />
                        )}
                      </IconButton>
                      <ListItemText>
                        <Typography variant="body2">
                          {preferences.name}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </div>
            ))}
        </List>
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
  nav: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400
  },
  name: { color: '#ffffff' }
};

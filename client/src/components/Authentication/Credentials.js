import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default ({
  submit,
  cta,
  credentials,
  email_error,
  password_error,
  failed,
  header
}) => {
  return (
    <Grid container style={styles.container}>
      <Typography style={{ color: '#212121' }} variant="headline">
        {header}
      </Typography>
      <Grid item xs={12}>
        <TextField
          name="email"
          label="Email"
          margin="normal"
          onChange={input => credentials(input)}
          style={styles.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="password"
          label="Password"
          margin="normal"
          type="password"
          onChange={input => credentials(input)}
          style={styles.input}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={data => submit(data)}
          variant="contained"
          color="secondary"
          style={styles.button}
        >
          {cta}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {email_error()}
      </Grid>
      <Grid item xs={12}>
        {password_error()}
      </Grid>

      {failed ? (
        <Grid item xs={12}>
          {failed()}
        </Grid>
      ) : null}
    </Grid>
  );
};

const styles = {
  container: { padding: 30 },
  input: { paddingBottom: 30, width: '100%' },
  button: { textTransform: 'lowercase' }
};

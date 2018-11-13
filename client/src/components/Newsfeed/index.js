import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { fetchNews, queryNews } from '../../reducers/reducer';

class Newsfeed extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.props.fetchNews();
  }

  body = () => {
    return this.feed();
  };

  inputValue = e => {
    e.preventDefault();
    this.setState({ ...this.state, value: e.target.value });
  };

  enterQuery = async e => {
    if (e.keyCode === 13) {
      await this.props.queryNews({
        value: this.state.value
      });
    }
  };

  query = async () => {
    await this.props.queryNews({
      value: this.state.value
    });
  };

  feed = () => {
    const { news } = this.props.reducer;

    if (news) {
      return (
        <div style={{ height: 100 }}>
          <Grid container alignItems="center" direction="row" spacing={8}>
            <Grid item xs={3}>
              <Typography variant="headline">
                <span style={styles.name}>newsfeed</span> :
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                value={this.state.value}
                name="todo"
                label="Search News"
                margin="normal"
                onChange={input => this.inputValue(input)}
                style={styles.input}
                onKeyDown={enter => this.enterQuery(enter)}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={this.query}
                variant="fab"
                color="primary"
                style={styles.button}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            overflow="hidden"
          >
            {news.articles.map(
              ({ author, title, description, url, urlToImage, source }, i) => {
                return (
                  <Grid item xs={12} key={i} style={styles.news}>
                    <Card>
                      <CardActionArea
                        style={styles.card}
                        onClick={() => window.open(url)}
                      >
                        <CardContent>
                          <Grid container spacing={16}>
                            <Grid item xs={2}>
                              <CardMedia
                                style={styles.media}
                                image={
                                  urlToImage ||
                                  'https://images.unsplash.com/photo-1527239441953-caffd968d952?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d0365a6545c5e5d54b2450e461cea5c4&auto=format&fit=crop&w=668&q=80'
                                }
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                gutterBottom
                                variant="title"
                                component="h2"
                              >
                                {title}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container spacing={16}>
                            <Grid item xs={12}>
                              <Typography
                                style={styles.description}
                                variant="subheading"
                              >
                                {description}
                              </Typography>
                              <Typography
                                style={styles.source}
                                variant="caption"
                              >
                                source: {source.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </div>
      );
    }
    return <Typography variant="title">Loading...</Typography>;
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
  {
    fetchNews,
    queryNews
  }
)(Newsfeed);

const styles = {
  container: {},
  name: { backgroundColor: '#fff59d', padding: 10 },
  news: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15
  },
  title: { paddingBottom: 10 },
  source: { paddingBottom: 10 },
  description: { paddingBottom: 10 },
  url: { paddingBottom: 10 },
  card: { border: 'solid 1px #fff59d', width: '100%' },
  media: {
    height: 50
  },
  input: { width: '100%', position: 'relative', top: -30 },
  button: { backgroundColor: '#fff59d' }
};

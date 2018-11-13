import React, { Component } from 'react';
import { BarChart, Bar, Cell, LabelList } from 'recharts';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import keys from './keys/needsKeys.js';

const colors = [
  '#FF7961',
  '#FF7468',
  '#FF7070',
  '#FF6C78',
  '#FF6880',
  '#FF6488',
  '#FF6090',
  '#F75F9D',
  '#EF5EAB',
  '#E75EB9',
  '#DF5DC7',
  '#D75CD5',
  '#D05CE3'
];

class NeedsChart extends Component {
  state = { activeIndex: '', activeName: '' };

  onBarEnter = (data, index) => {
    this.setState({
      activeIndex: index,
      activeName: data.name
    });
  };

  onBarLeave = (data, index) => {
    this.setState({
      activeIndex: ''
    });
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center" style={styles.chart}>
        <Grid item xs={8}>
          <BarChart
            barCategoryGap={1}
            width={875}
            height={500}
            data={this.props.needs_data}
          >
            <Bar
              dataKey="percentile"
              onMouseEnter={this.onBarEnter}
              onMouseLeave={this.onBarLeave}
            >
              {this.props.needs_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    this.state.activeIndex === index ? '#eeeeee' : colors[index]
                  }
                />
              ))}
              <LabelList dataKey="name" position="top" />
            </Bar>
          </BarChart>
        </Grid>
        <Grid item xs={4}>
          {keys.map(({ name, definition }, i) => {
            return (
              <List key={i} style={styles.need}>
                {this.state.activeIndex ===
                this.props.needs_data.findIndex(data => data.name === name) ? (
                  <div>
                    <ListItem style={styles.item}>
                      <div
                        style={{
                          backgroundColor:
                            colors[
                              this.props.needs_data.findIndex(
                                data => data.name === name
                              )
                            ],
                          height: 20,
                          width: 20
                        }}
                      />
                      <ListItemText>
                        <Typography variant="subheading">{name}</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem style={styles.item}>
                      <Typography
                        variant="subheading"
                        style={{
                          backgroundColor:
                            colors[
                              this.props.needs_data.findIndex(
                                data => data.name === name
                              )
                            ],
                          padding: 10,
                          color: '#fafafa',
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10
                        }}
                      >
                        {definition}
                      </Typography>
                    </ListItem>
                  </div>
                ) : (
                  <ListItem style={styles.item}>
                    <div
                      style={{
                        backgroundColor:
                          colors[
                            this.props.needs_data.findIndex(
                              data => data.name === name
                            )
                          ],
                        height: 20,
                        width: 20
                      }}
                    />

                    <ListItemText>
                      <Typography variant="subheading">{name}</Typography>
                    </ListItemText>
                  </ListItem>
                )}
              </List>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default NeedsChart;

const styles = {
  chart: { height: 600 },
  title: {
    padding: 15,
    marginLeft: 15,
    marginBottom: 15
  },
  title_content: {
    backgroundColor: '#fff59d',
    padding: 10
  },
  need: { marginLeft: 30 },
  item: { padding: 0 },
  explanation: { padding: 10, backgroundColor: '#fff59d' }
};

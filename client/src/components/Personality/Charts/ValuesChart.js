import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import keys from './keys/valuesKeys.js';

const colors = [
  '#FF7961',
  '#FF7070',
  '#FF6880',
  '#FF6090',
  '#E75EB9',
  '#D05CE3'
];

class ValueChart extends Component {
  state = { activeIndex: '', activeName: '' };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
      activeName: data.name
    });
  };

  onPieLeave = (data, index) => {
    this.setState({
      activeIndex: ''
    });
  };
  render() {
    return (
      <Grid container alignItems="center" justify="center" style={styles.chart}>
        <Grid item xs={8}>
          <PieChart width={800} height={600}>
            <Pie
              data={this.props.values_data}
              cx={400}
              cy={300}
              startAngle={360}
              endAngle={0}
              innerRadius={60}
              outerRadius={250}
              fill="#8884d8"
              paddingAngle={5}
              onMouseEnter={this.onPieEnter}
              onMouseLeave={this.onPieLeave}
              dataKey="value"
            >
              {this.props.values_data.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </Grid>
        <Grid item xs={4}>
          {keys.map(({ name, description, definition }, i) => {
            return (
              <List key={i} style={styles.need}>
                {this.state.activeIndex ===
                this.props.values_data.findIndex(data => data.name === name) ? (
                  <div>
                    <ListItem style={styles.item}>
                      <div
                        style={{
                          backgroundColor:
                            colors[
                              this.props.values_data.findIndex(
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
                        variant="caption"
                        style={{
                          backgroundColor: '#ffffff',
                          padding: 10
                        }}
                      >
                        {description}
                      </Typography>
                    </ListItem>
                    <ListItem style={styles.item}>
                      <Typography
                        variant="subheading"
                        style={{
                          backgroundColor:
                            colors[
                              this.props.values_data.findIndex(
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
                            this.props.values_data.findIndex(
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

export default ValueChart;

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

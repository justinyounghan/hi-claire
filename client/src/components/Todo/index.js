import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import moment from 'moment';

import { addTodo, getTodos, deleteTodo } from '../../reducers/reducer';

class Todo extends Component {
  state = {
    value: ''
  };

  body = () => {
    return (
      <Grid container>
        <Grid item style={styles.todo} xs={12}>
          <Typography variant="headline">
            <span style={styles.name}>daily tasks</span> :
          </Typography>
          {this.todoInput()}
        </Grid>
        <Grid item style={styles.list} xs={12}>
          {this.list()}
        </Grid>
      </Grid>
    );
  };

  todoInput = () => {
    return (
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TextField
            value={this.state.value}
            name="todo"
            label="To-do"
            margin="normal"
            onChange={input => this.inputValue(input)}
            style={styles.input}
            onKeyDown={enter => this.enterValue(enter)}
          />
        </Grid>
        <Grid container alignItems="center" direction="row" spacing={8}>
          <Grid item>
            <IconButton
              onClick={this.addTodo}
              variant="fab"
              color="primary"
              style={styles.button}
            >
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="caption">or press ENTER</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  inputValue = e => {
    e.preventDefault();
    this.setState({ ...this.state, value: e.target.value });
  };

  enterValue = async e => {
    if (this.state.value !== '') {
      if (e.keyCode === 13) {
        const { id } = this.props.reducer;
        await this.props.addTodo({
          id,
          todo: this.state.value
        });
        await this.setState({
          value: ''
        });
      }
    }
  };

  addTodo = async () => {
    if (this.state.value !== '') {
      const { id } = this.props.reducer;
      await this.props.addTodo({
        id,
        todo: this.state.value
      });
      await this.setState({
        value: ''
      });
    }
  };

  delete = task_id => {
    const { id } = this.props.reducer;
    this.props.deleteTodo({ task_id, id });
  };

  content = () => {
    return this.body();
  };

  list = () => {
    const { todos } = this.props.reducer;
    return (
      <List>
        {todos.map(({ todo, task_id, created }, i) => {
          return (
            <Grid container key={i}>
              <Grid item xs={12}>
                <ListItem style={styles.item}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={10}>
                      <Grid item xs={12}>
                        <Typography variant="subheading">{todo}</Typography>
                        <Typography variant="caption" style={styles.created}>
                          <span style={{ color: '#62757f' }}>cr.</span>{' '}
                          {moment(created).calendar()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                      <IconButton
                        onClick={() => this.delete(task_id)}
                        style={styles.button}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
            </Grid>
          );
        })}
      </List>
    );
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
  { addTodo, getTodos, deleteTodo }
)(Todo);

const styles = {
  container: {},
  name: { backgroundColor: '#fff59d', padding: 10 },
  input: { width: '100%' },
  item: {
    borderBottom: '1px solid #fff59d'
  },
  created: {},
  button: { backgroundColor: '#fff59d' }
};

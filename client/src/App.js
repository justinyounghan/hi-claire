import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import Button from '@material-ui/core/Button';
import Header from './components/Header';
import './App.css';

//Components
import Home from './components/Home.js';
import TwitterScape from './components/TwitterScape.js';
import AmazonScape from './components/AmazonScape.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />

        <div className="body">
          <Route exact path="/" component={Home} />
          <Route exact path="/twitter-scape" component={TwitterScape} />
          <Route exact path="/amazon-scape" component={AmazonScape} />
        </div>
      </div>
    );
  }
}

export default App;

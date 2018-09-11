import React, { Component } from 'react';
import { Button } from 'antd';
import logo from './goddess.jpg';
import './App.css';
import List from './List/List';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
          <List></List>
          <div className="masklayer"></div>
      </div>
    );
  }
}

export default App;

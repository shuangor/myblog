import React, { Component } from 'react';
import axios from 'axios';
import Adminmessage from './Adminmessage.js';
import Login from '../Admin/login.js';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Admin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    axios.get('/admin').then(res => {
        console.log(res.data);
        if (res.data.code === 1) {
          this.setState({
            data: res.data.data
          })
        } else {
          this.setState({
            redirect: true
          });
        }
    })
  }

  render() {

      if (this.state.redirect) {
        return <Redirect  push to="/adminlogin" />
      }

      return (
        <div>
            <Adminmessage></Adminmessage>
        </div>
      )
  }
}

export default Admin;

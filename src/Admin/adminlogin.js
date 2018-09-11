import React, { Component } from 'react';
import { message, Input, Icon, Button } from 'antd';
import './adminlogin.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Adminlogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.clickLogin = this.clickLogin.bind(this);
  }

  info() {
    message.info("用户名和密码的长度要大于3位字符");
  }

  info1() {
    message.info("密码错误");
  }

  info2() {
    message.info("权限不够");
  }

  info3() {
    message.info("用户不存在");
  }

  clickLogin() {
    var _this = this;
    if (this.state.username.length > 3  && this.state.password.length > 3) {
      axios.get('/admin/login', {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      }).then((res) => {
        if (res.data.data == null) {
          _this.info3();
        } else {
          if (res.data.data == "密码错误") {
            _this.info1();
          } else {
            if (res.data.data == "权限不够") {
              _this.info2();
            } else {
              if (res.data.data == "success") {
                this.setState({
                  redirect: true
                });
              }
            }
          }
        }
      })
    } else {
      _this.info();
    }
  }

  handleChange(key, val) {
    this.setState({
     [key]: val.target.value
   })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect  push to="/admin" />
    }

    return (
      <div className="login">

          <Input placeholder="输入用户名" onChange={v => this.handleChange('username', v)}  style={{ marginTop: "30px" }}/>
          <Input placeholder="输入密码" onChange={v => this.handleChange('password', v)} type="password" style={{ marginTop: "30px" }} />
          <Button type="primary" style={{ marginTop: "30px" }} onClick={this.clickLogin} block>登录</Button>
      </div>
    )
  }
}

export default Adminlogin;

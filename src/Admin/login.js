import React, { Component } from 'react';
import './login.css';
import { message, Input, Icon, Button } from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class Login extends React.Component {

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

  info3() {
    message.info("用户不存在");
  }

  clickLogin() {
    var _this = this;
    if (this.state.username.length > 3  && this.state.password.length > 3) {
      axios.get('/login', {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      }).then((res) => {
        if (res.data.data == "用户不存在") {
          _this.info3();
        } else {
          if (res.data.data == "密码错误") {
            _this.info1();
          } else {
            if (res.data.data == "success") {
              this.setState({
                redirect: true
              });
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
      return <Redirect  push to="/message" />
    }

    return (
      <div className="login" style={{"height": "350px"}}>
          <Input placeholder="输入用户名" onChange={v => this.handleChange('username', v)}  style={{ marginTop: "30px" }}/>
          <Input placeholder="输入密码" onChange={v => this.handleChange('password', v)} type="password" style={{ marginTop: "30px" }} />
          <Button type="primary" style={{ marginTop: "30px" }} onClick={this.clickLogin} block>登录</Button>
          <Button type="primary" style={{ marginTop: "30px" }} block><Link to="/adminlogin" style={{ "width": "100%", "height": "100%", "color": "white" }}>跳转到管理员登录</Link></Button>
          <Button type="primary" style={{ marginTop: "30px" }} block><Link to="/register" style={{ "width": "100%", "height": "100%", "color": "white" }}>跳转去注册</Link></Button>
      </div>
    )
  }
}

export default Login;

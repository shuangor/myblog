import React, { Component } from 'react';
import './register.css';
import { message, Input, Icon, Button } from 'antd';
import PropTypes from "prop-types";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      password: "",
      repassword: ""
    }
    this.clickRegister = this.clickRegister.bind(this);
  }

  info() {
    message.info('两次密码不一致');
  }

  info1() {
    message.info('用户名已存在');
  }

  info2() {
    message.info("用户名和密码的长度要大于3位字符");
  }

  clickRegister() {
    if (this.state.username.length > 3  && this.state.password.length > 3 &&  this.state.repassword.length > 3 ) {
      if (this.state.password == this.state.repassword) {
        axios.get('/register', {
          params: {
            username: this.state.username,
            password: this.state.password
          }
        }).then((res) => {
          if (res.data.data == "用户名已存在") {
            this.info1();
          } else if (res.data.data == "success") {
            this.setState({
              redirect: true
            });
          }
        })
      } else {
        this.info();
      }
    } else {
      this.info2();
    }
  }

  handleChange(key, val) {
    this.setState({
     [key]: val.target.value
   })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect  push to="/login" />
    }


    return (
      <div className='register'>
        <Input placeholder="输入用户名"  onChange={v => this.handleChange('username', v)} style={{ marginTop: "30px" }}/>
        <Input placeholder="输入密码"  onChange={v => this.handleChange('password', v)} type="password" style={{ marginTop: "30px" }} />
        <Input placeholder="确认密码"  onChange={v => this.handleChange('repassword', v)} type="password" style={{ marginTop: "30px" }} />
        <Button type="primary" style={{ marginTop: "30px" }} onClick={this.clickRegister} block>确认注册</Button>
      </div>
    )
  }
}

export default Register;

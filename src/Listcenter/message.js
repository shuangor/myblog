import React, { Component } from 'react';
import "./message.css";
import { Pagination, List, Avatar, Icon, Tag} from 'antd';
import Listheader from '../Listheader/Listheader.js';
import Listfooter from '../Listfooter/Listfooter.js';
import axios from 'axios';
import { Input, message, Button, Skeleton } from 'antd';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const { TextArea } = Input;

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      textarea: "",
      initLoading: true,
      loading: false,
      list: []
    }
    this.clickSpeak = this.clickSpeak.bind(this);
  }

  componentDidMount() {
    axios.get('/message').then(res => {
      if (res.data.code == 1) {
        this.setState({
          code: true
        })
      } else {
        this.setState({
          code: false
        })
      }
      this.setState({
        data: res.data.data
      })
    })
  }

  info() {
    message.info('输入内容不能为空');
  }

  info1() {
    message.info('回复失败');
  }

  handleChange(key, val) {
    this.setState({
     [key]: val.target.value
   })
  }

  clickSpeak() {
     if (this.state.textarea) {
       axios.get('/message/create', {
         params: {
           username_content: this.state.textarea
         }
       }).then(res => {
         if (res.data.data == "success") {
           axios.get('/message').then(res => {

             this.setState({
               data: res.data.data
             })
           })
         } else {
           this.info1();
         }
       })
     } else {
       this.info();
     }
  }


  render() {
    let button = null;

    if (this.state.code) {
      button = null;
    } else {
      button = <i><Link to="/login">登录</Link></i>;
    }


    const { initLoading, loading, list } = this.state;


    return (
      <div>
      <Listheader></Listheader>
      <div className="Listcenter">
      <div className="message">
        {button}
        <TextArea  onChange={v => this.handleChange('textarea', v)} placeholder="来都来了，说两句呗" autosize={{ minRows: 4, maxRows: 6 }} />
        <span onClick={this.clickSpeak}>畅言一下</span>
      </div>
      <div className="messageList">
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item actions={[<span>{item.createtime}</span>]}>
              <List.Item.Meta
                title={item.username}
                description={item.username_content}
              />
          </List.Item>
        )}
      />
      </div>
      </div>
      <Listfooter></Listfooter>
      </div>
    )
  }
}

export default Message;

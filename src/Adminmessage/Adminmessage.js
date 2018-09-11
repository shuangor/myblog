import React, { Component } from 'react';
import './Adminmessage.css';
import { Form, Modal, Input, Row, Col } from 'antd';
import Editor from 'wangeditor';
import { Radio, message } from 'antd';
import axios from 'axios';
import logo1 from "../goddess1.jpg";
import logo2 from "../goddess2.jpg";
import logo3 from "../goddess3.jpg";
import logo4 from "../goddess4.jpg";
import {Redirect} from 'react-router-dom';


const RadioGroup = Radio.Group;
const { TextArea } = Input;


class Adminmessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
      editorText: "",
      value: "",
      title: "",
      description: "",
      avatar: "",
      redirect: false
    }
    this.clickButton = this.clickButton.bind(this);
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  onChange1 = (e) => {
    this.setState({
      avatar: e.target.value,
    });
  }

  componentDidMount() {
    let E = Editor
    // let editor = new E(this.refs.editor)
    let editor = new E( this.refs.editor )
    editor.customConfig.onchange = (html) => {
      this.setState({
        editorHtml: html,
        editorText: editor.txt.text()
      })
    }
    editor.create()
    console.log(editor.txt.html());
  }

  info() {
    message.info('填写完整信息');
  }

  clickButton() {
    if (this.state.value  && this.state.title  && this.state.description && this.state.avatar && this.state.editorHtml ) {
      axios.get('/articleCreate', {
        params: {
          article_type: this.state.value,
          title: this.state.title,
          description: this.state.description,
          avatar: this.state.avatar,
          content: this.state.editorHtml,
          text: this.state.editorText
        }
      }).then(res => {
        if (res.data.data == 'success') {
          this.setState({
            redirect: true
          })
        }
      })
    } else {
      this.info();
    }

  }

  choosetitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  description = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect  push to="/" />
    }

    return (
      <div className="adminmessage">
        <p className="adminp">新建笔记</p>
        <div className="textarea">
          <TextArea placeholder="输入文章的标题" title={this.state.title} autosize onChange={this.choosetitle} />
          <div style={{ margin: '24px 0' }} />
          <TextArea placeholder="描述文章的大概内容" description={this.state.description} autosize onChange={this.description} autosize={{ minRows: 2, maxRows: 6 }} />
        </div>
        <div className="editor"  ref="editor">
        </div>
        <div className="chooseImg">
        <span className="typeSpan">选择女神做文章头像图片</span>
        <RadioGroup onChange={this.onChange1} value={this.state.avatar}>
          <Radio value="logo1"><img src={logo1} /></Radio>
          <Radio value="logo2"><img src={logo2} /></Radio>
          <Radio value="logo3"><img src={logo3} /></Radio>
          <Radio value="logo4"><img src={logo4} /></Radio>
        </RadioGroup>
        </div>
        <div className="chooseType">
        <span className="typeSpan">选择文章类型</span>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value="技术分享">技术分享</Radio>
          <Radio value="韶华追忆">韶华追忆</Radio>
          <Radio value="关于我">关于我</Radio>
        </RadioGroup>
        </div>
        <div className="button" onClick={this.clickButton}>保存</div>
      </div>
    )
  }
}

export default Adminmessage;

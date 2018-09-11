import React, { Component } from 'react';
import { Icon, Input, message } from 'antd';
import './Listheader.css';
import logo from '../goddess5.jpg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class Listheader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isSearch: false, isBar: false };
    this.clickSearch = this.clickSearch.bind(this);
    this.clickBar = this.clickBar.bind(this);
    this.searchBlur = this.searchBlur.bind(this);
    this.searchFocus = this.searchFocus.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
  }

  clickSearch() {
    this.setState({
      isSearch: !this.state.isSearch,
      isBar: false,
      value: ""
    })
  }

  searchBlur() {
    this.setState({
      isSearch: false
    })
  }

  searchFocus() {
    this.setState({
      isSearch: true
    })
  }

  clickBar() {
    this.setState({
      isBar: !this.state.isBar,
      isSearch: false
    })
  }

  info() {
    message.info('请输入关键字');
  }

  pressEnter() {
    if (this.state.value) {
      this.setState({
        redirect: true
      })
    } else {
      this.info();
    }

  }

  handleChange(key, val) {
    this.setState({
     [key]: val.target.value
   })
  }


  render() {

    const datad = this.state.value

    if (this.state.redirect) {
      return <Redirect push to={{ pathname: "/search", keywords: this.state.value }} />
    }


    const isSearch = this.state.isSearch;
    const isBar = this.state.isBar;
    return (
      <div className="Listheader">
        <div className="icon">
        <div className="searchIcon">
          {
            isSearch ? (
              <div className="filter">
                <Input ref="inputdom" onChange={v => this.handleChange('value', v)} onFocus={this.searchFocus} onBlur={this.searchBlur}  onPressEnter={this.pressEnter} placeholder="输入关键词,然后回车" style={{ position: 'fixed', top: '20px', left: '35%', height: '45px', width: '400px' }}  />
              </div>
            ) : (
              <Icon type="search" onClick={this.clickSearch} style={{ fontSize: 30, color: 'white', margin: '30px' }} />
            )
          }
        </div>
        <div className="barIcon">
          {
            isBar ? (
                <div className="nav" >
                  <ul>
                    <Link to="/"><li>首页</li></Link>
                    <Link to="/tecsharing"><li>技术分享</li></Link>
                    <Link to="/takestory"><li>韶华追忆</li></Link>
                    <Link to="/message"><li>Blog留言</li></Link>
                    <Link to="/about"><li>关于我</li></Link>
                  </ul>
                  <Icon type="close" onClick={this.clickBar} style={{ float: 'right', fontSize: '25px', marginTop: '-40px', marginRight: '30px', color: 'white' }} />
                </div>
            ) : (
              <Icon type="bars" onClick={this.clickBar} style={{ float: 'right', margin: '30px', fontSize: 30, color: 'white' }} />
            )
          }
        </div>
        </div>
        <div className="showpicture">
          <img src={logo} />
        </div>
        <div className="title">
          <p>张双霜的个人博客</p>
        </div>
      </div>
    )
  }
}

export default Listheader;

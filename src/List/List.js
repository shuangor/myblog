import React, { Component } from 'react';
import './List.css';
import Listheader from '../Listheader/Listheader.js';
import Listcenter from '../Listcenter/Listcenter.js';
import Listfooter from '../Listfooter/Listfooter.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Tecsharing from '../Listcenter/tecsharing.js';
import Takestory from '../Listcenter/takestory.js';
import Message from '../Listcenter/message.js';
import About from '../Listcenter/about.js';
import Article from '../Listcenter/article.js';
import Admin from '../Adminmessage/Admin.js';
import Adminlogin  from '../Admin/adminlogin.js';
import Register from '../Admin/register.js';
import Login from '../Admin/login.js';
import Search  from '../Listcenter/search.js';


class List extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="List">
        <Route exact path="/" component={Listcenter} />
        <Route path="/search" component={Search} />
        <Route path="/tecsharing" component={Tecsharing} />
        <Route path="/takestory" component={Takestory} />
        <Route path="/message" component={Message} />
        <Route path="/about" component={About} />
        <Route path="/article/:id" component={Article} />
        <Route path="/admin" component={Admin} />
        <Route path="/adminlogin" component={Adminlogin} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    )
  }
}

export default List;

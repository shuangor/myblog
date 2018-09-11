import React, { Component } from 'react';
import "./Listcenter.css";
import Listheader from '../Listheader/Listheader.js';
import Listfooter from '../Listfooter/Listfooter.js';
import axios from 'axios';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    const _id = this.props.match.params.id;
    axios.get('/article/access', {
      params: {
        _id: _id
      }
    }).then(res => {
        console.log(res.data);
    })

    axios.get('/article/content', {
      params: {
        _id: _id
      }
    }).then((res) => {
      console.log(res.data.data.content);
      this.setState({
        data: res.data.data.content
      })
    })

  }

  render() {
    var content = `${this.state.data}`;
    return (
      <div>
      <Listheader></Listheader>
      <div className="Listcenter">
        <div dangerouslySetInnerHTML={{__html: content }} />

      </div>
      <Listfooter></Listfooter>
      </div>
    );
  }
}

export default Article;

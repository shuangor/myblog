import React, { Component } from 'react';
import "./Listcenter.css";
import { Pagination, List, Avatar, Icon, Tag} from 'antd';
import { Link, Route } from 'react-router-dom';
import Listheader from '../Listheader/Listheader.js';
import Listfooter from '../Listfooter/Listfooter.js';
import axios from 'axios';
import logo1 from '../goddess1.jpg';
import logo2 from '../goddess2.jpg';
import logo3 from '../goddess3.jpg';
import logo4 from '../goddess4.jpg';

class Listcenter extends React.Component {

  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    // 初次获取所有文章的数据，按照创建的时间排序
    axios.get('/article').then((res) => {
      this.setState({
        data: res.data
      })
    })
  }

  changePage(page, pageSize) {
    // 当点击分页的数字时重新渲染新一页数据
    axios.get('/article', {
      params: {
        page: page,
        pageSize: pageSize
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }

  render() {

    const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
    );

    const TagText = ({text}) => (
      <span>
        <Icon type="tag" style={{ color: '#00CACA' }} /> {text.article_type}
        <i style={{ marginLeft: '20px' }}>创建时间: {text.createtime}</i>
      </span>
    );

    const Message = ({text}) => (

      <span>
        <Link to={`/article/${text}`}>
          <Tag color="black">阅读原文</Tag>
        </Link>
      </span>
    );

    return (
      <div>
      <Listheader></Listheader>
      <div className="Listcenter">
      <List
        itemLayout="vertical"
        size="large"

        dataSource={this.state.data.data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<TagText text={item} />, <IconText type="eye-o" text={item.access} />, <Message text={item._id} />]}
            extra={<img width={272} alt="logo" src={logo1} />}
          >
          <List.Item.Meta
            title={item.title}
            description={item.description}
          />
            {item.text}
          </List.Item>
      )}
      />
        <span>
          <Pagination onChange={this.changePage} pageSize={6} defaultCurrent={1} total={this.state.data.total} style={{ marginTop: '20px', marginLeft: '450px' }} />
        </span>
      </div>
      <Listfooter></Listfooter>
      </div>
    )
  }
}

export default Listcenter;

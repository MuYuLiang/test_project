import React, { Component } from 'react';
import './IndexContainer.css';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Tag from 'antd/lib/tag';
import 'antd/lib/tag/style/css';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/css';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import {HttpClient} from "../../common/request";

const columns = [{
    title: '名字',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 300,
    render: text => <Tooltip title={text}>
                        <div className="table-text">{text}</div>
                    </Tooltip>
}, {
    title: '图片',
    dataIndex: 'image',
    key: 'image',
    render: url => <img src={url}/>,
}, {
    title: '链接',
    dataIndex: 'baseUrl',
    key: 'baseUrl',
    width: 120,
    render: baseUrl => <a href={baseUrl} target="_blank">链接</a>
}, {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: tags => (
        <span>
          {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                  color = 'volcano';
              }
              return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
    ),
}, {
    title: '属性',
    dataIndex: 'properties',
    key: 'properties',
    width: 120,
    render: pros => {
        let menu = (
            <Menu>
                {pros.map((item,index)=>{
                    return <Menu.Item key={index}>
                        <a href={item.url} target="_blank">{item.type}</a>
                    </Menu.Item>
                })}
            </Menu>
        );
        return <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
                点击展示 <Icon type="down" />
            </a>
            </Dropdown>}
}];

export default class IndexContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            inputValue : "",
            dataArr :[]
        };
    }

    componentWillMount() {
        this._isMount = true;
    }

    componentDidMount() {
        let self = this;
        HttpClient.query("http://www.mocky.io/v2/5be3ced42f00006d00d9f13b",HttpClient.GET,null,function (d, type) {
            if (self._isMount) {
                if (type == HttpClient.requestSuccess) {
                    let dataArray = d.apis;
                    let dataSource = [];
                    for (let i in dataArray){
                        let data = dataArray[i];
                        let dic = {};
                        dic.key = i;
                        dic.name = data.name;
                        dic.description = data.description;
                        dic.image = data.image;
                        dic.baseUrl = data.baseURL;
                        dic.tags = data.tags;
                        dic.properties = data.properties;
                        dataSource.push(dic);
                    }
                    self.setState({
                        dataSource:dataSource
                    })
                } else {
                    console.log('服务器异常');
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    changeInputValue(event){
        let value = event.target.value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
        let newDataSource = [];
        if (value.length > 0) {
            newDataSource = this.screenTags(value);
        }
        this.setState({
            inputValue:value,
            dataArr:newDataSource
        })
    }

    screenTags(str){
        let dataArray = [];
        this.state.dataSource.forEach(item=>{
            let newItem = JSON.parse(JSON.stringify(item));
            dataArray.push(newItem);
        });
        let newData = [];
        for (let i in dataArray){
            let dic = dataArray[i];
            let tags = dic.tags;
            let newTags = [];
            for (let j in tags){
                if (tags[j].indexOf(str) > -1){
                    newTags.push(tags[j]);
                }
            }
            dic.tags = newTags;
            newData.push(dic);
        }
        return newData;
    }

    render() {
        console.log(this.state.inputValue.length,this.state);
        return (
            <div className="main-container">
                <input className="table-input" value={this.state.inputValue} onChange={this.changeInputValue.bind(this)}/>
                <Table dataSource={this.state.inputValue.length > 0?this.state.dataArr:this.state.dataSource} columns={columns}/>
            </div>
        )
    }
}

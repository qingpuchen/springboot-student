import React, {Component} from 'react';
import { Table, Space, Button, Popconfirm } from 'antd'
import 'isomorphic-fetch';
// import ReactDOM from 'react-dom';
import 'element-theme-default';
import { StuItemModal } from './stuItem'
import './stuList.css';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text) => text === 1 ? '女': '男',
      },
    
];

// const api = {

// }

export default class stuList extends Component{
    constructor() {
        super();
        this.state = {
            open: false,
            isEdit: false,
            record: null
        }
    }

    async componentDidMount() {
        let students = await (await fetch('/api/user/list')).json();//主要是从后台拿json数据
        this.setState({students});
    }

    hideModal = ()=> {
        this.setState({ open: false, isEdit: false })
    }

    showModal = ()=> {
        this.setState({ open: true })
    }

     onCreate = async (values) =>  {
        console.log('Received values of form: ', values);
        const apiUrl = values.id ? '/api/user/edit' : '/api/user/add'
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(values)
          });
          console.log(await response.json(),'response')
        this.hideModal();
    };

    editModal = (record)=> {
        this.isEdit = true;
        this.setState({ record })
        this.showModal()
        
        console.log(record)
    }

    deleteItem = async (values) => {
        console.log('Received values of form: ', values);
        // const apiUrl = values.id ? '/api/user/edit' : '/api/user/add'
        const response = await fetch('/api/user/delete', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(values)
          });
          console.log(await response.json(),'response')
    }

    initColumn() {
        return columns.concat([
            {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                  <Space size="middle">
                    <a onClick={this.editModal.bind(this, record)}>编辑</a>
                    
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this user?"
                        onConfirm={this.deleteItem.bind(this, record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>删除</a>
                    </Popconfirm>
                  </Space>
                ),
              },
        ])
    }

    render() {
        let {students = []} = this.state;

        return (
            <div>
                <Button onClick={this.showModal}>新增</Button>
                <StuItemModal open={this.state.open} onCancel={this.hideModal} onCreate={this.onCreate} record={this.state.record}/>
                <Table columns={this.initColumn()} dataSource={students} rowKey="id" />
            </div>
        );
    }
}

import React, {Component} from 'react';
import { Table, Space, Button, Popconfirm, Input } from 'antd'
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

const endpoint = 'http://localhost:8080'

export default class stuList extends Component{
    constructor() {
        super();
        this.state = {
            open: false,
            isEdit: false,
            record: null,
            students: [],
            originStudents: []
        }
    }

    async getList() {
        const students = await (await fetch(`${endpoint}/user/list`)).json();//主要是从后台拿json数据
        this.setState({students, originStudents:students});
    }

    getFilter(val) {
        // 搜索姓名
        console.log(val)
        let students = []
        this.state.originStudents.forEach((item) => {
            if(!val) {
                this.getList()
            }
            if(item.username.indexOf(val)>-1) {
                students.push(item)
            }
        })
        this.setState({students})
    }

    async componentDidMount() {
        // let students = await (await this.getList()).json();
        // this.setState({students});
        this.getList()
    }

    hideModal = ()=> {
        this.setState({ open: false, isEdit: false })
    }

    showModal = ()=> {
        this.setState({ open: true })
    }

     onCreate = async (values) =>  {
        console.log('Received values of form: ', values);
        const apiUrl = this.isEdit ? `${endpoint}/user/updateUser` : `${endpoint}/user/add`
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(values)
          });
        this.hideModal();

        this.getList()
    };

    addModal = () => {
        this.isEdit = false;
        this.setState({ record: null })
        this.showModal()
    }

    editModal = (record)=> {
        this.isEdit = true;
        this.setState({ record }, ()=>{
            this.showModal()
        })
        console.log(record)
    }

    deleteItem = async (values) => {
        console.log('Received values of form: ', values);
        // const apiUrl = values.id ? '/api/user/edit' : '/api/user/add'
        const response = await fetch(`${endpoint}/user/delete/${values.id}`, {
            method: 'delete',
          });

          this.getList()
        //   console.log(await response.json(),'response')
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
                <Space>
                    <Button onClick={this.addModal} type="primary">新增</Button>
                    <Input.Search onSearch={(val) => this.getFilter(val)} placeholder="请输入姓名进行搜索"/>
                </Space>
                <StuItemModal open={this.state.open} onCancel={this.hideModal} onCreate={this.onCreate} record={this.state.record}/>
                <Table columns={this.initColumn()} dataSource={students} rowKey="id" />
            </div>
        );
    }
}

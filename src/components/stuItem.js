import React, { useRef, useEffect } from 'react';
import { Radio, Form, Input, Modal, InputNumber } from 'antd';




// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
      prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
      if (!open && prevOpen) {
        form.resetFields();
      }
    }, [form, prevOpen, open]);
  };

const SEX_TYPE = {
    man: 0,
    woman: 1
}

export const StuItemModal = ({ open, onCreate, onCancel, record }) => {
    console.log(record,'record111');

    const [ form ] = Form.useForm();
    // useResetFormOnCloseModal({
    //   form,
    //   open,
    // });

    if(record) {
      form.setFieldsValue({...record})
    }
    const onOk = () => {
    // form.submit();
      form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
    };
    const onCancelModal = () => {
      // form.resetFields();
      // record = null
      form.setFieldsValue({username:'', age: null, sex: null, password: ''})
      onCancel()
    }
    return (
      <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancelModal} >
        <Form form={form}  name="userForm">
        <Form.Item
            label="Username"
            name="username"
            
            rules={[
                {
                required: true,
                
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            label="年龄"
            name="age"
            
            rules={[
                {
                required: true,
                message: 'Please input your age!',
                },
            ]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item 
                label="性别" 
                name="sex"
                
                rules={[
                {
                    required: true,
                    message: 'Please select your sex!',
                },
            ]}>
                <Radio.Group>
                <Radio value={SEX_TYPE.man}>男 </Radio>
                <Radio value={SEX_TYPE.woman}> 女 </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item 
                label="隐藏ID" 
                name="id"
                style={{"display": "none"}}
                initialValue={record ? record.id: ''}
            >
                <Input />
            </Form.Item>
        </Form>
      </Modal>
    );
  };
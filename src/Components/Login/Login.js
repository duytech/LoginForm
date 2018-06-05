import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Form  from 'antd/lib/form';
import Input  from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { Row, Col } from 'antd';
import axios from 'axios';
import './Login.css';

const BASE_URL = 'http://zod.2cs.local/indexdoc';
const FormItem = Form.Item;

class Login extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('login submit');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const postObject = {
                    "Username": values.email,
                    "Password": values.password
                };
                axios.post(BASE_URL + '/api/authentication/login', postObject)
                    .then(res => { console.log(res); }).catch(err => { alert(err); });
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-container'>
                <div className='login-center-div'>
                    <p className='text-login'>LOGIN</p>

                    <Form onSubmit={this.handleSubmit} layout='vertical' className='login-form'>
                        <FormItem>
                            {
                                getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' }]
                                })
                                (<Input className='login-input' prefix={<Icon type="mail" />} placeholder="Email"></Input>)
                            }
                        </FormItem>

                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your password!'}]
                                })
                                (<Input className='login-input' prefix={<Icon type="lock" />} placeholder="Password" type="password"></Input>)
                            }
                        </FormItem>

                        <FormItem>
                            <Button htmlType='submit' className='btn-signin'>LOG IN</Button>
                        </FormItem>
                    </Form>

                    <p>OR</p>

                    <button className='btn-third-login'>f</button>
                    <div className='distance-div'></div>
                    <button className='btn-third-login'>G+</button>
                </div>
            </div>
        );
    }
}

export default Login;
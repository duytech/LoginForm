import React from 'react';
import Button from 'antd/lib/button';
import Form  from 'antd/lib/form';
import Input  from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import axios from 'axios';
import './Register.css';

const BASE_URL = 'http://zod.2cs.local/indexci';
const FormItem = Form.Item;

class Register extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      console.log('register handleSubmit');
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const postObject = {
            'Email': values.email,
            'Username': values.email,
            'Password': values.password,
          };
          axios.post(BASE_URL + '/api/user/register', postObject)
            .then(res => { alert(res.statusText); })
            .catch(err => { alert(err); });
        }
      });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login-container">
          <div className="login-center-div">
            <p className="text-login">REGISTER</p>

            <Form onSubmit={this.handleSubmit} layout="vertical" >
              <FormItem>
                {
                  getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input className="login-input" prefix={<Icon type="mail" />} placeholder="Email / Phone Number"></Input>
                  )
                }
              </FormItem>

              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!'}],
                  })(
                    <Input className="login-input" prefix={<Icon type="lock" />} placeholder="Password" type="password"></Input>
                  )
                }
              </FormItem>

              <FormItem>
                {getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input className="login-input" type="password" prefix={<Icon type="lock" />} placeholder="Re-enter Password" />
                )}
              </FormItem>

              <FormItem>
                <Button htmlType="submit" className="btn-signin">REGISTER</Button>
              </FormItem>
            </Form>

            <p className="text-or">OR</p>

            <button className="btn-third-login">f</button>
            <div className="distance-div-3"></div>
            <button className="btn-third-login">G+</button>
          </div>
        </div>
      );
    }
}

export default Register;
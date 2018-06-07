import React from 'react';
import { Button, Form, Input, Icon} from 'antd';
import { User } from '../../Services'; 
import './Register.css';

const FormItem = Form.Item;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmDirty: false };
  }

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
        User.register(postObject);
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

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
                  rules: [
                    { required: true, message: 'Please input your password!'}, 
                    { validator: this.validateToNextPassword },
                  ],
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
                <Input className="login-input" type="password" prefix={<Icon type="lock" />} placeholder="Re-enter Password" onBlur={this.handleConfirmBlur} />
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
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Icon} from 'antd';
import { forgotPasswordMessage } from '../../Models';
import { User } from '../../Services';
import './ForgotPassword.css';

const FormItem = Form.Item;

const ForgotPassword = ({form}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login handleSubmit');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const postObject = {
          'Email': values.email,
        };
        User.forgotPassword(postObject);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-center-div">
        <p className="text-login">FORGOT PASSWORD</p>
        <p className="text-forgot-password-message">{forgotPasswordMessage}</p>
        <Form onSubmit={handleSubmit} layout="vertical">
          <FormItem>
            {
              form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input className="login-input" prefix={<Icon type="mail" />} placeholder="Email / Phone Number"></Input>
              )
            }
          </FormItem>

          <FormItem>
            <Button htmlType="submit" className="btn-signin">RESET MY PASSWORD</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
    
};

ForgotPassword.propTypes = {
  form: PropTypes.object.isRequired,
};

export default ForgotPassword;

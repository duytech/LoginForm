import {requests} from './BaseService';


export const Auth = {
  login: loginModel => requests.post('api/authentication/login', loginModel),
};

export const User = {
  register: registerModel => requests.post('/api/user/register', registerModel),
  forgotPassword: forgotPasswordModel => requests.post('/api/user/forgot-password', forgotPasswordModel),
};

import { AppConfig as config } from '../config';
import { showError } from './Notification';
import { errorMessage } from '../Models';


const resolveEndpoint = path => {
  return [config.apiServer, config.restEndpoint, path].join('/');
};

const parseQueryString = object => {
  let result = '';

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];

      if (value === false || value) {
        if (value instanceof Array) {
          value.forEach(v => (result += `&${key}=${v}`));
        } else {
          result += `&${key}=${value}`;
        }
      }
    }
  }
};

const defaultOptions = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const handleError = async response => {
  if (response.status === 401) {
    showError(response.status);

    //history.push('/auth');
  }

  let error = {};
  try {
    error = await response.json();
  } catch (ex) { }

  showError(errorMessage, error.Message);
  throw response;
};

const handleResponse = async response => {
  if (response.ok) {
    return await response.json();
  }

  throw response;
};

export const requests = {
  get: (url, params, customHandleError) =>
    fetch(resolveEndpoint(url) + parseQueryString(params), {
      ...defaultOptions,
      method: 'GET',
    })
      .then(handleResponse)
      .catch(customHandleError || handleError),
  post: (url, data, customHandleError) =>
    fetch(resolveEndpoint(url), {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .catch(customHandleError || handleError),
  put: (url, data, customHandleError) =>
    fetch(resolveEndpoint(url), {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .catch(customHandleError || handleError),
  delete: (url, customHandleError) =>
    fetch(resolveEndpoint(url), {
      ...defaultOptions,
      method: 'DELETE',
    })
      .then(handleResponse)
      .catch(customHandleError || handleError),
};
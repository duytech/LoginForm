import notification from 'antd/lib/notification';

export const showError = (message, description, closeButton) => {
  let options = {};
  if (closeButton) {
    options = {
      duration: null,
      onClose: null,
      ...closeButton,
    };
  }
  
  notification.error({
    message,
    description: description,
    ...options,
  });
};
  
export const showSuccess = (message) => notification.success({message});
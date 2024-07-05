import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';

const defaultOptions = {
  placement: 'topRight',
  duration: 200,
  closeIcon: false,
  style: {
    padding: '8px 10px 0 10px',
    width: 'fit-content',
    whiteSpace: 'nowrap',
  },
};

export const Toast = {
    success: (message: string) => {
        notification.success({
          ...defaultOptions,
          message,
        } as ArgsProps);
    },
    info: (message: string) => {
        notification.info({
            ...defaultOptions,
            message,
          } as ArgsProps);
    },
    warning: (message: string) => {
        notification.warning({
          ...defaultOptions,
          message,
        } as ArgsProps);
    },
    error: (message: string) => {
        notification.error({
          ...defaultOptions,
          message,
        } as ArgsProps);
    }
};
import { Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <Spin size='large' fullscreen={true} className='opacity-30' />
  )
}

export default LoadingSpinner;
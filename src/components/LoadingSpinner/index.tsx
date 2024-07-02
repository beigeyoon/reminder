'use client'
import { Spin } from 'antd';
import { useLoading } from '@/src/store/useLoading';

const LoadingSpinner = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <Spin size='large' fullscreen={true} className='opacity-30' />
      )}
    </>
  )
}

export default LoadingSpinner;
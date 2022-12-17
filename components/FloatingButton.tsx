import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const FloatingButton = () => {
  const router = useRouter();
  return (
    <button
      className='absolute bottom-16 right-[15px] rounded-[50%] w-24 h-24 text-[#fdfdfd] text-2xl bg-green-200'
      onClick={() => router.push('/market/sell')}
    >
      <FontAwesomeIcon icon={faPen} />
    </button>
  );
};

export default FloatingButton;

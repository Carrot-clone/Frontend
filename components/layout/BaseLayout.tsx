import Link from 'next/link';
import { PropsWithChildren } from 'react';
import melon from 'public/melonmarket.svg';
import Image from 'next/image';

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex flex-col justify-center items-center w-full h-[100vh] bg-green-100'>
      <div className='flex flex-col justify-center items-center mb-5 w-[200px] h-[50px]'>
        <Image src={melon} alt='mainlogo' />
      </div>
        <div className='w-[500px] h-[950px] bg-white'>{children}</div>
    </section>
  );
};

export default BaseLayout;

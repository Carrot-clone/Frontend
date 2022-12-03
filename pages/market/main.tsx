import React from 'react';
import Image from 'next/image';
import FloatingButton from '../../components/FloatingButton';

const Main = () => {
  return (
    <>
      <section className='w-full h-full p-8 overflow-x-auto scrollbar-hide bg-white rounded-[45px]'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <div className='flex flex-row gap-5'>
            <div className='w-32 h-32 border rounded-2xl'>
              <Image src='' alt='' />
            </div>
            <div className='w-72 h-32 border rounded-2xl'></div>
          </div>
          <FloatingButton />
        </div>
      </section>
    </>
  );
};

export default Main;

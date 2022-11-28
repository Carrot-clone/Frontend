import React from 'react';
import Image from 'next/image';
import FloatingButton from '../../components/FloatingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  return (
    <>
      <div className='sticky p-1 top-0 w-full h-12 bg-white rounded-t-[50px]'>
        <div className='flex flex-row items-center justify-end gap-3 mt-3 text-[30px] mr-5'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <section className='w-full h-full p-8 overflow-x-auto scrollbar-hide '>
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

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FloatingButton from '../../components/FloatingButton';
import { apis } from '../../apis/axiosUtil';

const Main = () => {
  const [items, setItems] = useState<[]>([]);
  const [tests, setTests] = useState<[]>([]);
  // useEffect(() => {
  //   fetchItemList();
  //   test();
  // }, []);

  const test = async () => {
    const a = await apis.postDetail(1)
    setTests(a)
  }

  console.log(tests)

  const fetchItemList = async () => {
    const itemsList = await apis.fetchMainItemList(1);
    setItems(itemsList.result);
  };

  return (
    <>
    <img src='https://velog.velcdn.com/images/blaze096/post/5d3c908e-577c-4491-9120-78e7399168a1/image.svg' className='animate-pulse' />
      <section className='w-full h-full p-8 overflow-x-auto scrollbar-hide bg-white rounded-[45px]'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            {items.map((v: any, i) => (
              <div key={i} className='flex flex-row justify-center items-center gap-3'>
                <img src={v.thumbImage} width={128} height={128} className='rounded-2xl' alt='' />
                <div className='w-72 h-32 border rounded-2xl'></div>
              </div>
            ))}
          </div>
          <FloatingButton />
        </div>
      </section>
    </>
  );
};

export default Main;

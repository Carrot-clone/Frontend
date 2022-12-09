import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../../components/FloatingButton';
import { apis } from '../../apis/axiosUtil';
import dayjs from 'dayjs';

interface ItemsState {
  createdAt: string;
  likeNumber: number;
  postId: number;
  price: number;
  thumbImage: string;
  title: string;
}

const Main = () => {
  const [items, setItems] = useState<ItemsState[]>([]);

  const fetchItemList = async () => {
    const itemsList = await apis.fetchMainItemList(1);
    setItems(itemsList.results);
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  console.log(items);
  return (
    <section className='w-full h-full p-8 overflow-x-auto scrollbar-hide bg-white rounded-[45px] font-soojin text-[15px]'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5'>
          {items.map((value: ItemsState, index: number) => (
            <div key={index} className='flex flex-row justify-center items-center gap-3 '>
              <img src={value.thumbImage} width={128} height={128} className='rounded-2xl border' alt='' />
              <div className='w-72 h-32 border rounded-2xl p-3 flex flex-col justify-center items-center gap-3'>
                <div className='w-full border h-5'>{value.title}</div>
                <div className='w-full border h-5'>{dayjs(value.createdAt).format('YYYY-MM-DD')}</div>
                <div className='w-full border h-5 flex justify-between'>
                  <div>{value.price + '원'}</div>
                  <div>
                  <FontAwesomeIcon icon={faHeart} className=''/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FloatingButton />
      </div>
    </section>
  );
};

export default Main;

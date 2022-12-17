import React, { useEffect, useState } from 'react';
import FloatingButton from '../../components/FloatingButton';
import { apis } from '../../apis/axiosUtil';
import dayjs from 'dayjs';
import Link from 'next/link';
import Header from '../../components/Header';
import { useRouter } from 'next/router';

interface ItemsState {
  createdAt: string;
  likeNumber: number;
  postId: number;
  price: number;
  thumbImage: string;
  title: string;
}

const Search = () => {
  const [items, setItems] = useState<ItemsState[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLast, setIsLast] = useState<HTMLDivElement | null>(null);
  const router = useRouter();
  const keyword = String(router.query.keyword)

  const fetchSearchItemList = async () => {
    try {
      const itemsList = await apis.fetchSearchItemList(page, keyword);
      setItems(items.concat(itemsList.results));
    } catch {
      console.error('fetching error');
    }
  };

  useEffect(() => {
    fetchSearchItemList();
  }, [page]);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (isLast) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(isLast);
    }
    return () => observer && observer.disconnect();
  }, [isLast]);

  return (
    <>
      <section className='w-full h-full overflow-x-auto scrollbar-hide bg-white rounded-[45px] font-soojin text-[15px]'>
        <Header />
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div className='flex flex-col gap-5 relative'>
            {items.map((value: ItemsState, index: number) => {
              return (
                <Link href={{ pathname: '/market/detail', query: { id: value.postId } }}>
                  <div key={index} className='flex flex-col justify-center items-center gap-3' ref={setIsLast}>
                    <div className='flex flex-row justify-center items-center'>
                      <img src={value.thumbImage} className='rounded-2xl border w-32 h-32' alt='' />
                      <div className='w-72 h-36 rounded-2xl p-3 flex flex-col justify-center items-center gap-3'>
                        <div className='w-full h-5'>{value.title}</div>
                        <div className='w-full h-5 text-[12px] mb-4'>{dayjs(value.createdAt).format('YYYY-MM-DD')}</div>
                        <div className='w-full h-5 flex justify-between'>
                          <div>{value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}</div>
                          <div className='flex flex-row justify-end items-center'>
                            <p className='text-[20px]'>♡</p>
                            <p className='text-[15px]'>{value.likeNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-row justify-center items-center'></div>
                    <div className='w-[98%] h-1 border-t-[1px] border-gray'></div>
                  </div>
                </Link>
              );
            })}
          </div>
          <FloatingButton />
        </div>
      </section>
    </>
  );
};

export default Search;

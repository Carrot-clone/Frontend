import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apis } from '../../apis/axiosUtil';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import Link from 'next/link';
import { category } from '../../constantance/constance';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

SwiperCore.use([Navigation, Pagination, Autoplay]);
interface ItemsDetail {
  mainPost: ItemDetailState;
  otherPosts: OtherPosts[];
}

interface ItemDetailState {
  images: [];
  userId: number;
  username: string;
  location: string;
  title: string;
  category: string;
  createdAt: string;
  content: string;
  likeNumber: string;
  watchNumber: string;
  heartOn: boolean;
  price: number;
}

interface OtherPosts {
  postId: number;
  price: number;
  thumbImage: string;
  title: string;
}
interface imageValue {
  image: string;
}

const Detail = () => {
  const [itemDetail, setItemDetail] = useState<ItemDetailState>();
  const [otherPosts, setOtherPosts] = useState<OtherPosts[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const detailId = Number(router.query.id);

  const onChangeIndex = (num: number) => {
    if (num === 3) setIndex(1);
    else setIndex(num);
  };

  const fetchItemsDetail = async () => {
    setLoading(true);
    const itemDetail: ItemsDetail = await apis.fetchItemDetail(detailId);
    setItemDetail(itemDetail.mainPost);
    setOtherPosts(itemDetail.otherPosts);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchItemsDetail();

    return () => {
      setItemDetail({
        images: [],
        userId: 0,
        username: '',
        location: '',
        title: '',
        category: '',
        createdAt: '',
        content: '',
        likeNumber: '',
        watchNumber: '',
        heartOn: false,
        price: 0,
      });
      setOtherPosts([]);
    };
  }, []);

  return itemDetail !== undefined ? (
    <section className='w-full h-full overflow-x-auto scrollbar-hide bg-white rounded-[45px] font-soojin text-[15px]'>
      <div>
        <Swiper
          className='w-full h-80'
          onSlideChange={(e) => onChangeIndex(e.activeIndex)}
          loop={true}
          slidesPerView={1}
          navigation
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
          }}
          autoHeight={true}
          centeredSlides={true}
          autoplay={{ delay: 100000, disableOnInteraction: false }}
        >
          {itemDetail.images.map((value: imageValue, index: number) => (
            <Fragment key={index}>
              <SwiperSlide>
                <img src={value.image} alt='' className='w-full h-80' />
              </SwiperSlide>
            </Fragment>
          ))}
        </Swiper>
      </div>
      <div className='w-full h-full p-2'>
        <div className='flex flex-row justify-start items-center'>
          <div className='w-14 h-14 border rounded-full mr-5'></div>
          <div className='flex flex-col justify-start text-left'>
            <div>{itemDetail.username}</div>
            <div>{itemDetail.location ? itemDetail.location : '주소가 공개되지 않았습니다.'}</div>
          </div>
        </div>
        <div className='w-[98%] h-1 border-b-[1px] mt-2 border-gray'></div>
        <div className='p-4 text-[20px] flex flex-col justify-center items-start'>{itemDetail.title}</div>
        <div className='w-[98%] h-1 border-b-[1px] border-gray'></div>
        <div className='p-2'>
          {category[itemDetail.category]} | {dayjs(itemDetail.createdAt).format('YYYY-MM-DD')}
        </div>
        <div className='w-[98%] h-1 border-b-[1px] mt-1 border-gray'></div>
        <div className='w-full h-1/5 p-2'>{itemDetail.content}</div>
        <div>
          관심 : {itemDetail.likeNumber} | 조회수 : {itemDetail.watchNumber}
        </div>
        <div className='w-[98%] h-1 border-b-[1px] mt-1 mb-4 border-gray'></div>
        <div>판매자의 다른 게시물</div>
        <div className='flex justify-center items-center mt-10 gap-'>
          <div className=' grid grid-cols-2'>
            {otherPosts.map((value: OtherPosts, index: number) => (
              <Fragment key={value.postId}>
                <Link href={{ pathname: '/market/detail', query: { id: value.postId } }}>
                  <div className='w-52 h-36 border m-2 rounded-xl'>
                    <div className='flex justify-center items-center mb-1'>
                      <img src={value.thumbImage} alt='titleImage' className='w-20 h-20 p-1' />
                    </div>
                    <div className='flex flex-col p-1'>
                      <p className='text-[12px] mb-1'>{value.title}</p>
                      <p className='font-bold text-[12px]'>
                        {value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
                      </p>
                    </div>
                  </div>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default Detail;

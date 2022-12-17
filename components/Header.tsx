import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(false);
  const searchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchKeyword = e.currentTarget.value;
    setKeyword(searchKeyword);
  };
  const category = ['인기매물', '디지털기기', '생활가전', '가구/인테리어', '생활/주방', '유아', '여성의류'];
  const categoryEn = ['hot', 'digitial', 'life', 'furniture', 'kitchen', 'baby', 'woman'];

  return (
    <>
      <section className='flex flex-row justify-center w-full h-20 my-4 bg-white'>
        <div className='fixed flex flex-row justify-center items-center w-[30rem] h-20 bg-white z-30 rounded-[45px] px-3'>
          <div className='w-full h-14 flex flex-row justify-end items-center text-[25px]'>
            <input className='w-full h-12 border-4 border-green-200 mr-2' onChange={(e) => searchKeyword(e)}></input>
            <Link href={{ pathname: '/market/search', query: { keyword: keyword } }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-4' />
            </Link>
            <FontAwesomeIcon icon={faBars} onClick={() => setSideMenuShow(true)} />
          </div>
        </div>
      </section>
      <div className='flex justify-center items-center'>
        {sideMenuShow ? (
          <div
            className={`top-[229px] left-121 w-[491px] h-[941px] bg-white text-black fixed z-40 ease-in-out duration-300 rounded-[44px] border-black border ${
              sideMenuShow ? 'translate-x-0 ' : 'translate-x-full'
            }`}
          >
            <div className='w-full h-10 p-9 flex flex-row justify-between items-center'>
              <div className='text-[30px]'>카테고리</div>
              <button className='text-[30px]'>
                <FontAwesomeIcon icon={faClose} onClick={() => setSideMenuShow(false)} />
              </button>
            </div>
            <div className='grid grid-cols-4 gap-5 p-8 mt-10'>
              {category.map((value: any, index: number) => (
                <Fragment key={index}>
                  <Link href={{ pathname: '/market/category', query: { category: categoryEn[index] } }}>
                    <div>
                      <div className='text-black mb-20'>{value}</div>
                    </div>
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Header;

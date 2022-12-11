import React, { useState } from 'react';
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
            className={`top-[143px] left-121 w-[491px] h-[941px] bg-white text-black fixed z-40 ease-in-out duration-300 rounded-[44px] border-black border ${
              sideMenuShow ? 'translate-x-0 ' : 'translate-x-full'
            }`}
          >
            <div className='w-full h-10 p-9 flex flex-row justify-between items-center'>
              <div className='text-[30px]'>카테고리</div>
              <button className='text-[30px]'>
                <FontAwesomeIcon icon={faClose} onClick={() => setSideMenuShow(false)} />
              </button>
            </div>
            <div></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Header;

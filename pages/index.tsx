import React from 'react';
import Image from 'next/image';
import melon from 'public/melonmarket.svg';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col justify-center items-center w-full h-full  bg-white rounded-[45px]'>
      <Image src={melon} alt='logo' width={200} height={30} />
      <div className='flex flex-col justify-center items-center mt-20'>
        <button
          className='w-72 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50 mb-3'
          onClick={() => router.push('/auth/login')}
        >
          로그인
        </button>
        <p className='font-soojin text-[15px] text-gray-300'>아직 회원이 아니시라면?</p>
        <button
          className='w-72 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'
          onClick={() => router.push('/auth/signup')}
        >
          회원가입
        </button>
      </div>
    </section>
  );
};

export default Home;

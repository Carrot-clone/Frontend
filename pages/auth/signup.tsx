import React from 'react';
import Image from 'next/image';
import melon from 'public/melonmarket.svg';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const { getValues, register } = useForm();

  return (
    <section className='flex flex-col justify-center items-center w-full h-full'>
      <Image src={melon} alt='logo' width={300} height={50} />
      <div className='flex flex-col justify-center gap-3 mt-10 font-soojin'>
        <label htmlFor='id'>아이디</label>
        <div className='flex flex-row justify-between'>
        <input className='w-[16rem] h-12 border' type='text' {...register('id')} />
        <button className='w-[4rem] h-12 border border-l-0 bg-green-50 hover:bg-green-100'>중복확인</button>
        </div>
        <label htmlFor='password'>비밀번호</label>
        <input className='w-80 h-12 border' type='password' {...register('password')} />
        <label htmlFor='passwordcheck'>비밀번호 확인</label>
        <input className='w-80 h-12 border' type='password' />
        <label htmlFor='address' {...register('address')}>
          주소
        </label>
        <input className='w-80 h-12 border' />
      </div>
      <div className='flex flex-col justify-center items-center gap-5 mt-10'>
        <button className='w-80 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'>
          회원가입
        </button>
        <button
          className='w-80 h-14 rounded-xl bg-red-50 hover:bg-red-100 font-soojin text-black-50'
          onClick={() => router.push('/')}
        >
          취소
        </button>
      </div>
    </section>
  );
};

export default Signup;

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import melon from 'public/melonmarket.svg';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { apis } from '../../apis/axiosUtil';

export function getItemFromLS(key: string) {
  return window.localStorage.getItem(key);
}

export function setItemToLS(key: string, value: any) {
  window.localStorage.setItem(key, value);
}

export function removeItemFromLS(key: string) {
  window.localStorage.removeItem(key);
}

const Login = () => {
  const router = useRouter();
  const { getValues, register } = useForm();

  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    setItemToLS('accessToken', accessToken);
    setItemToLS('refreshToken', refreshToken);
  }, []);

  const userSignIn = async () => {
    const userSignUpRequest = {
      email: getValues('id'),
      password: getValues('password'),
    };
    try {
      const userSignInResponse = await apis.signIn(userSignUpRequest);
      const accessToken = userSignInResponse.accessToken;
      const refreshToken = userSignInResponse.refreshToken;
      setTokens(accessToken, refreshToken);
      router.push('/market/main');
      return { msg: '', res: true };
    } catch (error) {
      alert(error);
      return { msg: '존재 하지 않는 아이디 입니다.', res: false };
    }
  };

  return (
    <section className='flex flex-col justify-center items-center w-full h-full bg-white rounded-[45px]'>
      <Image src={melon} alt='logo' width={300} height={50} />
      <div className='flex flex-col justify-center gap-3 mt-10 font-soojin'>
        <label htmlFor='id'>아이디</label>
        <input className='w-80 h-12 border' type='text' {...register('id')} />
        <label htmlFor='password'>비밀번호</label>
        <input className='w-80 h-12 border' type='password' {...register('password')} />
      </div>
      <div className='flex flex-col justify-center items-center gap-5 mt-10'>
        <button
          className='w-80 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'
          onClick={() => userSignIn()}
        >
          로그인
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

export default Login;

import React, { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import melon from 'public/melonmarket.svg';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { apis } from '../../apis/axiosUtil';

const Signup = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [file, setFile] = useState<File[] | any>();
  const { getValues, register } = useForm();

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(Array.from(e.target.files));
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  }, []);

  const emailDuplicatdCheck = async () => {
    const id = {
      email: getValues('id'),
    };
    const duplicatedResult = await apis.duplicatedCheck(id);
    alert(duplicatedResult.msg);
  };

  const userSignUp = async () => {
    const formData = new FormData();
    formData.append('email', getValues('id'));
    formData.append('password', getValues('password'));
    formData.append('username', getValues('nickname'));
    formData.append('profilePhoto', file[0]);
     const signUpResponse = await apis.signUp(formData);
     if(signUpResponse.status === 201){
      alert(signUpResponse.msg)
      router.push('/main')
     }else{
      alert(signUpResponse.msg)
     }     
     
  };

  const imageUplaodButton = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  
  return (
    <section className='flex flex-col justify-center items-center w-full h-full bg-white rounded-[45px]'>
      <Image src={melon} alt='logo' width={300} height={50} />
      <div className='flex flex-col justify-center gap-3 mt-3 font-soojin'>
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor='nickname'>프로필</label>
          <input className='hidden' type='file' ref={inputRef} onChange={(e) => onUploadImage(e)} />
          <img src={imgSrc ? imgSrc : ''} className='w-28 h-28 border rounded-full' />
          <button onClick={() => imageUplaodButton()}>Upload</button>
        </div>
        <label htmlFor='id'>아이디</label>
        <div className='flex flex-row justify-between'>
          <input className='w-[16rem] h-12 border' type='text' {...register('id')} />
          <button
            className='w-[4rem] h-12 border border-l-0 bg-green-50 hover:bg-green-100'
            onClick={() => emailDuplicatdCheck()}
          >
            중복확인
          </button>
        </div>
        <label htmlFor='password'>비밀번호</label>
        <input className='w-80 h-12 border' type='password' {...register('password')} />
        <label htmlFor='passwordcheck'>비밀번호 확인</label>
        <input className='w-80 h-12 border' type='password' />
        <label htmlFor='nickname'>닉네임</label>
        <input className='w-80 h-12 border' {...register('nickname')} />
        <label htmlFor='address' {...register('address')}>
          주소
        </label>
        <input className='w-80 h-12 border' />
      </div>
      <div className='flex flex-col justify-center items-center gap-5 mt-10'>
        <button
          className='w-80 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'
          onClick={() => userSignUp()}
        >
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

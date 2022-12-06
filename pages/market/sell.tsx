import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { apis } from '../../apis/axiosUtil';

const Sell = () => {
  const { register, getValues } = useForm();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);

  const handleSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files.length + images.length > 3) {
      return alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
      setUploadImage(Array.from(files) || []);
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const handleDeletePrevImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.id);
    setImages(images.filter((_, index) => index !== id));
    setUploadImage([...uploadImage.slice(0, id), ...uploadImage.slice(id + 1)]);
  };

  const imageUplaodButton = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const writePost = async () => {
    const writeReqeust = {
      image: uploadImage,
      title: getValues('title'),
      category: getValues('category'),
      price: getValues('price'),
      content: getValues('content'),
    };
    console.log(writeReqeust)
    const writeResponse = await apis.postSellingItem(writeReqeust)
    console.log(writeResponse);
  };

  return (
    <section className='w-full h-full p-8 font-soojin bg-white rounded-[45px]'>
      <div className='flex flex-row w-full h-[10rem] mt-5 overflow-x-auto scrollbar-hide'>
        <div>
          <button
            className='w-[6rem] h-[6rem] flex justify-center items-center text-[25px] rounded-[8px] text-white bg-gray-100 mb-5 mr-3'
            onClick={imageUplaodButton}
          >
            <div>
              <FontAwesomeIcon icon={faCameraRetro} />
              <div className='flex flex-row'>
                <p className='text-[15px] text-green-300'>{images.length}&nbsp;</p>
                <p className='text-[15px]'> / 3</p>
              </div>
            </div>
          </button>
        </div>
        {images.length > 0 &&
          images.map((image, id) => (
            <div key={id} className='sticky'>
              <button
                id={String(id)}
                type='button'
                className='absolute text-red-300 right-2 text-[20px] z-10'
                onClick={(e) => handleDeletePrevImg(e)}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              <img className='relative w-[6rem] h-[6rem] rounded-[8px] mr-3' alt='sellImage' src={image} />
            </div>
          ))}
      </div>
      <input type='file' accept='images/*' className='hidden' multiple onChange={handleSaveFiles} ref={inputRef} />
      <div className='flex flex-col justify-center gap-3'>
        <label htmlFor='title'>제목</label>
        <input type='text' className='w-full h-12 border' {...register('title')}></input>
        <label htmlFor='title'>카테고리</label>
        <input type='text' className='w-full h-12 border'></input>
        <label htmlFor='title'>가격</label>
        <input type='text' className='w-full h-12 border' {...register('price')}></input>
        <label htmlFor='title'>내용</label>
        <textarea className='w-full h-52 border' {...register('content')}></textarea>
      </div>
      <div className='flex flex-row justify-center items-center gap-5 mt-10'>
        <button className='w-80 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'
        onClick={() => writePost()}
        >
          작성하기
        </button>
        <button
          className='w-80 h-14 rounded-xl bg-red-50 hover:bg-red-100 font-soojin text-black-50'
          onClick={() => router.push('/')}
        >
          뒤로가기
        </button>
      </div>
    </section>
  );
};

export default Sell;

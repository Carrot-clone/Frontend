import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { apis } from '../../apis/axiosUtil';
import { ItemDetailState } from './[Detail]';

interface ItemsDetail {
  mainPost: ItemDetailState;
}

const Edit = () => {
  const { register, getValues } = useForm();
  const router = useRouter();
  const editId = Number(router.query.id);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);
  const [itemDetail, setItemDetail] = useState<any>();

  const fetchItemsDetail = async () => {
    const itemDetail: ItemsDetail = await apis.fetchItemDetail(editId);
    setItemDetail(itemDetail.mainPost);
    let newImages: any = [];
    for (let i = 0; i < itemDetail.mainPost.images.length; i++) {
      newImages.push(itemDetail.mainPost.images[i]);
    }
    let a: any = [];
    for (let i = 0; i < newImages.length; i++) a.push(newImages[i].image);
    setImages(a);
  };

  useEffect(() => {
    fetchItemsDetail();
  }, []);

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

  const handleDeletePrevImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.id);
    const img = itemDetail.images[id].image
      .replace('https://melon-market-bucket.s3.ap-northeast-2.amazonaws.com/postImage', '')
      .slice(4);

    await apis.deleteImage(editId, img);
    setImages(images.filter((_, index) => index !== id));
    setUploadImage([...uploadImage.slice(0, id), ...uploadImage.slice(id + 1)]);
  };
  const imageUplaodButton = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const editPost = async () => {
    const formdata = new FormData();
    if (uploadImage.length > 0) {
      for (let i = 0; i < uploadImage.length; i++) {
        formdata.append('image', uploadImage[i]);
      }
    }
    if (itemDetail !== undefined) {
      if (getValues('title') === '') {
        formdata.append('title', itemDetail.title);
      } else {
        formdata.append('title', getValues('title'));
      }
      if (getValues('price') === '') {
        formdata.append('price', itemDetail.price);
      } else {
        formdata.append('price', getValues('price'));
      }
      if (getValues('content') === '') {
        formdata.append('content', itemDetail.content);
      } else {
        formdata.append('content', getValues('content'));
      }
      formdata.append('category', 'baby');
    }

    try {
      await apis.postEdit(editId, formdata);
      router.push('/market/main');
    } catch {
      console.error();
    }
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
              <img className='relative w-[6rem] h-[6rem] rounded-[8px] mr-3' alt='EditImage' src={image} />
            </div>
          ))}
      </div>
      <input type='file' accept='images/*' className='hidden' multiple onChange={handleSaveFiles} ref={inputRef} />
      <div className='flex flex-col justify-center gap-3'>
        <label htmlFor='title'>제목</label>
        <input
          type='text'
          className='w-full h-12 border'
          {...register('title')}
          defaultValue={itemDetail?.title}
        ></input>
        <label htmlFor='title'>카테고리</label>
        <input type='text' className='w-full h-12 border' defaultValue={itemDetail?.category}></input>
        <label htmlFor='title'>가격</label>
        <input
          type='text'
          className='w-full h-12 border'
          {...register('price')}
          defaultValue={itemDetail?.price}
        ></input>
        <label htmlFor='title'>내용</label>
        <textarea className='w-full h-52 border' {...register('content')} defaultValue={itemDetail?.content}></textarea>
      </div>
      <div className='flex flex-row justify-center items-center gap-5 mt-10'>
        <button
          className='w-80 h-14 rounded-xl bg-green-50 hover:bg-green-100 font-soojin text-black-50'
          onClick={() => editPost()}
        >
          수정하기
        </button>
        <button
          className='w-80 h-14 rounded-xl bg-red-50 hover:bg-red-100 font-soojin text-black-50'
          onClick={() => router.push('-1')}
        >
          뒤로가기
        </button>
      </div>
    </section>
  );
};

export default Edit;

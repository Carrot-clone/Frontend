import { PropsWithChildren, useEffect, useState } from 'react';
import melon from 'public/melonmarket.svg';
import Image from 'next/image';

import { useRouter } from 'next/router';

const BaseLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const BaseUrl = 'http://localhost:3000';
  const [home, setHome] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nowHref = window.location.href;

      if (nowHref === BaseUrl + '/' || nowHref === BaseUrl + '/auth/login' || nowHref === BaseUrl + '/auth/signup') {
        setHome(true);
      } else {
        setHome(false);
      }
    }
  }, []);

  return (
    <section className='flex flex-col justify-center items-center w-full h-[100vh] bg-green-100 z-[10]'>
      
      <div className='flex flex-col justify-center items-center mb-5 w-[200px] h-[50px]'>
        {!home && <Image src={melon} alt='mainlogo' />}
      </div>
      <div className='relative w-[500px] h-[950px] rounded-[50px] bg-white border-[5px] border-black '>
        {children}
      </div>
    </section>
  );
};

export default BaseLayout;

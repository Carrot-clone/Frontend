import { PropsWithChildren, useEffect, useState } from 'react';
import melon from 'public/melonmarket.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const BaseLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const BaseUrl = 'http://localhost:3000';
  const [home, setHome] = useState<boolean>(false);
  const [write, setWrite] = useState<boolean>(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nowHref = window.location.href;
      if (nowHref === BaseUrl + '/' || nowHref === BaseUrl + '/auth/*') {
        setHome(true);
      } else {
        setHome(false);
      }
      if (nowHref === BaseUrl + '/market/sell' || nowHref === BaseUrl + '/market/modify') {
        setWrite(true);
      } else {
        setWrite(false);
      }          
    }
  }, []);
  
  return (
    <section className='flex flex-col justify-center items-center w-full h-[100vh] bg-green-100'>
      <div className='flex flex-col justify-center items-center mb-5 w-[200px] h-[50px]'>
        {!home && <Image src={melon} alt='mainlogo' />}
      </div>
      <div className='relative w-[500px] h-[950px] rounded-[50px] bg-white'>
        {children}
        {!write && (
          <button className='absolute bottom-16 right-[15px] rounded-[50%] w-24 h-24 text-[#Fdfdfd] text-2xl bg-green-200'
          onClick={() => router.push('/market/sell')}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
      </div>
    </section>
  );
};

export default BaseLayout;

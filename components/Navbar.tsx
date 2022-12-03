import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className='sticky p-1 top-0 bg-white rounded-t-[50px] w-full h-12'>
      <div className='flex flex-row items-center justify-end gap-3 mt-3 text-[30px] mr-5'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default Navbar;

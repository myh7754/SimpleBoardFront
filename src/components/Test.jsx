import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';

const Test = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      {
        isAuthenticated && user ?

          (
            <div className="text-center text-align">{user.name}님 안녕하세요!
            </div>
          )
          :
          (<div className='text-center text-align'>안녕</div>)
      }
    </>

  );
};

export default Test;
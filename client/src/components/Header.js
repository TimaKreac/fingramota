import React from 'react';
import authStore from '../stores/authStore';
import { observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';

const Header = observer(() => {
   const { isAuth, logout, userLogin } = authStore;
   const { linkId } = useParams();
   return (
      <header className='header'>
         <div className='container'>
            <div className='header-inner'>
               <Link to={`/articles${linkId ? `/${linkId}` : ''}`}>
                  <img
                     src='/images/logo.svg'
                     alt='logo'
                     className='header-logo'
                  />
               </Link>
               <div>
                  {isAuth && (
                     <>
                        <Link
                           to={`/articles${linkId ? `/${linkId}` : ''}`}
                           className='header-profileLink'
                           style={{ marginRight: '30px' }}
                        >
                           Статьи
                        </Link>
                        <Link
                           to={`/profile/${userLogin}`}
                           className='header-profileLink'
                        >
                           Профиль
                        </Link>
                        <button className='header-enterBtn' onClick={logout}>
                           Выйти
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
});

export default Header;

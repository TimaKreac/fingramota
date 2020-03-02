import React, { useEffect } from 'react';
import Header from './../components/Header';
import { useParams } from 'react-router-dom';
import Input from './../components/Input';
import profileStore from '../stores/profileStore';
import { observer } from 'mobx-react';
import Loader from './../components/Loader';

const ProfilePage = () => {
   const {
      getUserProfile,
      profile,
      onChangeProfileInfo,
      loadingProfile,
      localUserId,
      disabledForm,
      setDisabledForm,
      changeProfileInfo,
      cancelChangeProfileInfo,
      onChangeAvatar,
      averagePercent,
      countOfTests
   } = profileStore;
   const { login } = useParams();
   useEffect(() => {
      if (login) {
         getUserProfile(login);
      }
   }, [getUserProfile, login]);

   if (loadingProfile) {
      return (
         <>
            <Header />
            <Loader style={{ marginTop: 100 }} />
         </>
      );
   }

   if (!profile) {
      return (
         <>
            <Header />
            <p style={{ textAlign: 'center', marginTop: 100, fontWeight: 700 }}>
               Данный пользователь отсутсвует в системе
            </p>
         </>
      );
   }

   return (
      <>
         <Header />
         <div className='profile'>
            <div className='container'>
               <div className='profile-form'>
                  <div className='profile-form_left'>
                     <img
                        src={`/images/user_avatars/${profile.avatar}`}
                        alt='avatar'
                        className='profile-form_avatar'
                     />
                     {localUserId === profile._id && disabledForm && (
                        <button
                           className='primary profile-form_editProfile'
                           onClick={() => setDisabledForm(false)}
                        >
                           Редактировать
                        </button>
                     )}

                     {!disabledForm && (
                        <>
                           <form
                              encType='multipart/form-data'
                              id='avatar'
                              onSubmit={e => e.preventDefault()}
                              style={{ display: 'none' }}
                           >
                              <input
                                 type='file'
                                 name='avatar'
                                 id='avatar-file'
                              />
                           </form>
                           <button
                              className='primary profile-form_changeAvatar'
                              onClick={onChangeAvatar}
                           >
                              Сменить аватар
                           </button>
                           <button
                              className='primary profile-form_saveProfile'
                              onClick={() => changeProfileInfo(localUserId)}
                           >
                              Сохранить
                           </button>
                           <button
                              className='primary profile-form_cancelProfile'
                              onClick={cancelChangeProfileInfo}
                           >
                              Отменить
                           </button>
                        </>
                     )}
                  </div>
                  <div className='profile-form_right'>
                     <Input
                        title='Имя'
                        disabled={disabledForm}
                        value={profile.name}
                        name='name'
                        onChange={e => onChangeProfileInfo(e)}
                     />
                     <Input
                        title='Фамилия'
                        disabled={disabledForm}
                        value={profile.surname}
                        name='surname'
                        onChange={e => onChangeProfileInfo(e)}
                     />
                     <Input
                        title='Эл.почта'
                        disabled={disabledForm}
                        value={profile.email}
                        name='email'
                        onChange={e => onChangeProfileInfo(e)}
                     />
                     <Input
                        title='Город'
                        disabled={disabledForm}
                        value={profile.city}
                        name='city'
                        onChange={e => onChangeProfileInfo(e)}
                     />
                     <p
                        className='center profile-form_sertificatText'
                        style={{ marginTop: '35px' }}
                     >
                        {profile.completed_tests.length} из {countOfTests}{' '}
                        тестов пройдено ({averagePercent}%)
                     </p>
                     <p className='center profile-form_sertificatText'>
                        Для получения сертификата пройдите все тесты.
                        <br />
                        Процент правильных ответов должен быть не ниже 70%.
                     </p>
                     <button className='profile-form_getSertificat'>
                        Получить сертификат
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default observer(ProfilePage);

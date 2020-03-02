import React from 'react';
import Header from '../components/Header';
import Input from './../components/Input';
import { observer } from 'mobx-react';
import authStore from '../stores/authStore';
import { Link, useHistory } from 'react-router-dom';

const AuthPage = () => {
   const {
      register,
      onChangeRegisterForm,
      registerErrors,
      registerError,
      loading
   } = authStore;

   const history = useHistory();

   return (
      <>
         <Header />
         <div className='auth'>
            <form className='auth-form' onSubmit={e => register(e, history)}>
               <div className='auth-form_title title'>Регистрация</div>

               <Input
                  title='Имя'
                  name='name'
                  required
                  onChange={onChangeRegisterForm}
               />
               <Input
                  title='Фамилия'
                  name='surname'
                  required
                  onChange={onChangeRegisterForm}
               />
               <Input
                  title='Город'
                  name='city'
                  onChange={onChangeRegisterForm}
               />
               <Input
                  title='Эл.адрес'
                  name='email'
                  required
                  onChange={onChangeRegisterForm}
                  placeholder={'example@example.com'}
               />
               <Input
                  title='Логин'
                  name='login'
                  required
                  onChange={onChangeRegisterForm}
               />
               <Input
                  title='Пароль'
                  type='password'
                  name='password'
                  required
                  onChange={onChangeRegisterForm}
               />
               <Input
                  type='password'
                  title='Повторите пароль'
                  name='repeat_password'
                  required
                  onChange={onChangeRegisterForm}
               />
               {registerErrors && (
                  <div
                     className='register-errors'
                     style={{ marginTop: '10px' }}
                  >
                     {registerErrors.map((error, i) => (
                        <p className='error register-error' key={i}>
                           {error.msg}
                        </p>
                     ))}
                  </div>
               )}
               {registerError && (
                  <p
                     className='error register-error register-errors'
                     style={{ marginTop: '10px' }}
                  >
                     {registerError}
                  </p>
               )}
               <button
                  className='auth-form_button'
                  disabled={loading}
                  type='submit'
               >
                  Зарегистрироваться
               </button>
               <p className='haveAcc'>
                  Уже есть аккаунт?&nbsp;<Link to='/auth/login'>Войти</Link>
               </p>
            </form>
         </div>
      </>
   );
};

export default observer(AuthPage);

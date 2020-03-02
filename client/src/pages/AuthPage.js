import React from 'react';
import Header from '../components/Header';
import Input from './../components/Input';
import authStore from '../stores/authStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
   const { login, onChangeLoginForm, loginError } = authStore;

   return (
      <>
         <Header />
         <div className='auth'>
            <form className='auth-form' onSubmit={e => login(e)}>
               <div className='auth-form_title title'>Авторизация</div>
               {loginError && (
                  <p className='error' style={{ marginBottom: '20px' }}>
                     {loginError}
                  </p>
               )}
               <Input
                  title='Логин'
                  name='login'
                  type='text'
                  onChange={onChangeLoginForm}
                  required
                  login
               />
               <Input
                  title='Пароль'
                  name='password'
                  type='password'
                  onChange={onChangeLoginForm}
                  required
                  login
               />
               <button type='submit' className='auth-form_button'>
                  Войти
               </button>
               <Link to='/auth/reset' className='auth-form_forgotPassword'>
                  Забыли пароль?
               </Link>
               <br />
               <Link to='/auth/register' className='auth-form_registerBtn'>
                  Регистрация
               </Link>
            </form>
         </div>
      </>
   );
};

export default observer(AuthPage);

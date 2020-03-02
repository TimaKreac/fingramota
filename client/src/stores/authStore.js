import { observable, action } from 'mobx';

class AuthStore {
   @observable isAuth = localStorage.getItem('loggedIn');
   @observable isAdmin = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).admin ===
        '5e36710852abaf1210678c48'
      : false;
   @observable userId = localStorage.getItem('loggedIn')
      ? JSON.parse(localStorage.getItem('userData')).userId
      : {};
   @observable userLogin = localStorage.getItem('loggedIn')
      ? JSON.parse(localStorage.getItem('userData')).login
      : '';
   @observable registerErrors = null;
   @observable registerError = null;
   @observable loginError = null;
   @observable loading = false;

   @observable loginForm = {
      login: '',
      password: ''
   };

   @observable registerForm = {
      email: '',
      login: '',
      password: '',
      repeat_password: '',
      city: '',
      name: '',
      surname: ''
   };

   @action
   onChangeRegisterForm = e => {
      this.registerForm[e.target.name] = e.target.value;
   };
   @action
   onChangeLoginForm = e => {
      this.loginForm[e.target.name] = e.target.value;
   };

   request = async (url, method = 'GET', body = null, headers = {}) => {
      try {
         if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
         }
         this.loading = true;
         const response = await fetch(url, { method, body, headers });
         const data = await response.json();

         if (!response.ok) {
            throw data.errors || data.message;
         }

         this.loading = false;
         return data;
      } catch (error) {
         this.loading = false;
         throw error;
      }
   };

   @action
   register = async (e, history) => {
      e.preventDefault();
      try {
         await this.request('/auth/register', 'POST', {
            ...this.registerForm
         });

         history.push('/auth/login');
      } catch (error) {
         if (typeof error === 'object') {
            this.registerError = null;
            this.registerErrors = error;
         } else if (typeof error === 'string') {
            this.registerErrors = null;
            this.registerError = error;
         }
      }
   };

   @action
   login = async e => {
      e.preventDefault();
      try {
         const data = await this.request('/auth/login', 'POST', {
            ...this.loginForm
         });
         this.isAuth = true;
         localStorage.setItem('loggedIn', true);
         localStorage.setItem('userData', JSON.stringify(data));
         this.isAdmin = localStorage.getItem('userData')
            ? JSON.parse(localStorage.getItem('userData')).admin ===
              '5e36710852abaf1210678c48'
            : false;
         this.userLogin = localStorage.getItem('loggedIn')
            ? JSON.parse(localStorage.getItem('userData')).login
            : '';
         this.userId = localStorage.getItem('loggedIn')
            ? JSON.parse(localStorage.getItem('userData')).userId
            : {};
      } catch (error) {
         this.loginError = error;
         console.log(error);
      }
   };

   @action
   logout = () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userData');
      this.isAuth = false;
   };
}

export default new AuthStore();

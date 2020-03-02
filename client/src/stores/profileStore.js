import { observable, action } from 'mobx';

class ProfileStore {
   @observable profile = null;
   @observable prevProfile = null;
   @observable loadingProfile = false;
   @observable localUserId = JSON.parse(localStorage.getItem('userData'))
      .userId;
   @observable disabledForm = true;
   @observable averagePercent = 0;
   @observable countOfTests = 7;

   @action
   getUserProfile = async login => {
      try {
         this.loadingProfile = true;
         const user = await this.request('/profile/getUserProfile', 'POST', {
            login
         });
         const countOfTests = await this.request(
            '/profile/getCountOfTests',
            'POST'
         );
         this.countOfTests = countOfTests;
         this.profile = user;
         this.prevProfile = user;
         let percentSum = 0;
         for (const test of user.completed_tests) {
            percentSum += test.percent;
         }
         if (user.completed_tests.length) {
            const averagePercent = percentSum / user.completed_tests.length;
            this.averagePercent = averagePercent;
         }
         this.loadingProfile = false;
      } catch (error) {
         this.loadingProfile = false;
      }
   };

   @action
   onChangeAvatar = () => {
      document.querySelector('#avatar-file').click();
   };

   @action
   onChangeProfileInfo = e => {
      this.profile[e.target.name] = e.target.value;
   };

   @action
   changeProfileInfo = async userId => {
      try {
         this.prevProfile = { ...this.profile };
         await this.request('/profile/changeUserProfile', 'POST', {
            userId,
            profile: this.profile
         });
         const form = document.getElementById('avatar');
         const formData = new FormData(form);
         const fetched = await fetch(`/profile/${userId}/changeUserAvatar`, {
            method: 'POST',
            body: formData
         });
         const filename = await fetched.json();
         if (!filename.message) {
            this.profile.avatar = filename;
         }

         this.disabledForm = true;
      } catch (error) {}
   };

   @action
   cancelChangeProfileInfo = () => {
      this.profile = { ...this.prevProfile };
      this.disabledForm = true;
   };

   @action setDisabledForm = value => {
      this.disabledForm = value;
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
}

export default new ProfileStore();

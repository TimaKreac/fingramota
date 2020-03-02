import { observable, action } from 'mobx';
import authStore from './authStore';

const { isAdmin } = authStore;

class ArticleStore {
   @observable mode = 'articles';
   @observable newBlock = {
      title: '',
      linkId: ''
   };
   @observable editBlock = {
      id: '',
      title: '',
      linkId: ''
   };
   @observable newArticle = {
      title: '',
      text: '',
      linkId: ''
   };

   @observable articleBlocks = [];
   @observable articles = [];
   @observable articleById = [];
   @observable loadingArticles = false;
   @observable loadingArticleById = false;

   @observable isHaveTest = false;
   @observable isFinishedTestByUser = false;

   @action
   onChangeNewBlock = e => {
      this.newBlock[e.target.name] = e.target.value;
   };
   @action
   onChangeEditBlock = e => {
      this.editBlock[e.target.name] = e.target.value;
   };
   @action
   onChangeNewArticle = e => {
      this.newArticle[e.target.name] = e.target.value;
   };
   @action
   onChangeEditArticle = e => {
      this.articleById.title = e.target.value;
   };

   @action
   toAddArticleBlock = () => {
      this.mode = 'addBlock';
   };

   @action
   editArticleBlock = async (linkId, history, e) => {
      e.preventDefault();
      try {
         await this.request(`/articles/${linkId}/editArticleBlock`, 'POST', {
            ...this.editBlock
         });
         this.mode = 'articles';
         history.push(`/articles`);
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   addNewArticleBlock = async (history, e) => {
      try {
         e.preventDefault();
         await this.request('/articles/addNewBlock', 'POST', {
            ...this.newBlock
         });
         this.articleBlocks.push({ ...this.newBlock });
         this.mode = 'articles';
         history.push(`/articles/${this.newBlock.linkId}`);
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   getArticleBlocks = async history => {
      try {
         this.mode = 'articles';
         const data = await this.request(`/articles/`, 'POST');
         this.articleBlocks = data;
         if (!data[0] && isAdmin) {
            history.push(`/articles/addNewBlock}`);
            this.mode = 'addBlock';
            return;
         }
         if (history.location.pathname === '/articles') {
            history.push(`/articles/${data[0].linkId}`);
         }
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   getArticleBlock = async linkId => {
      try {
         const data = await this.request(`/articles/getArticleBlock`, 'POST', {
            linkId
         });
         this.editBlock = data;
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   addNewArticle = async (e, history) => {
      e.preventDefault();
      try {
         const text = document.querySelector('.constructor-form_text')
            .innerHTML;
         this.newArticle.text = text;
         await this.request(`/articles/addNewArticle`, 'POST', {
            ...this.newArticle
         });
         history.push(`/articles/${this.newArticle.linkId}`);
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   getBlockArticles = async linkId => {
      try {
         this.articles = [];
         this.loadingArticles = true;

         const data = await this.request(`/articles/getBlockArticles`, 'POST', {
            linkId
         });
         console.log(data);
         this.isFinishedTestByUser = false;

         this.articles = data;

         const articleBlock = await this.request(
            `/articles/getArticleBlock`,
            'POST',
            {
               linkId
            }
         );
         const userId = JSON.parse(localStorage.getItem('userData')).userId;
         const completedTests = await this.request(
            `/test/getCompletedTests`,
            'POST',
            {
               userId
            }
         );

         completedTests.forEach(test => {
            if (test.linkId === linkId) {
               this.isFinishedTestByUser = true;
               return;
            }
         });
         if (articleBlock.test) {
            this.isHaveTest = true;
         } else {
            this.isHaveTest = false;
         }
         this.loadingArticles = false;
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   getArticleById = async (linkId, id) => {
      try {
         this.loadingArticleById = true;
         const data = await this.request(`/articles/getArticleById`, 'POST', {
            linkId,
            id
         });
         this.articleById = data;
         this.loadingArticleById = false;
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   deleteArticleBlock = async (linkId, history) => {
      try {
         const isConfirmed = window.confirm('Удалить блок?');
         if (isConfirmed) {
            await this.request('/articles/deleteArticleBlock', 'POST', {
               linkId
            });
            this.getArticleBlocks(history);
            history.push(`/articles/${this.articleBlocks[0].linkId}`);
         }
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   deleteArticleById = async (linkId, id, history) => {
      try {
         await this.request(`/articles/deleteArticleById`, 'POST', {
            id
         });
         history.push(`/articles/${linkId}`);
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
   editArticleById = async (linkId, id, history) => {
      try {
         const text = document.querySelector('.constructor-form_text')
            .innerHTML;
         this.articleById.text = text;
         await this.request(`/articles/editArticleById`, 'POST', {
            id,
            ...this.articleById
         });
         history.push(`/articles/${linkId}/${id}`);
      } catch (error) {
         throw new Error('Что-то пошло не так');
      }
   };

   @action
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

export default new ArticleStore();

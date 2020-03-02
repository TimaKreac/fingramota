import { observable, action } from 'mobx';

class TestStore {
   @observable newQuestions = [];
   @observable newQuestion = {
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      option_5: '',
      correct_answer: 'Выберите правильный вариант'
   };
   @observable counter = 0;
   @observable currentQuestion = 0;
   @observable correctCounter = 0;
   @observable newQuestionErrors = [];
   @observable questions = [];
   @observable userAnswers = [];
   @observable loadingTest = false;
   @observable isFinishedTest = false;
   @observable isFinishedTestByUser = false;

   @action
   chooseAnswer = async (e, linkId) => {
      const correct_answer = this.questions[this.currentQuestion]
         .correct_answer;
      const isCorrect =
         this.questions[this.currentQuestion][correct_answer] ===
         e.target.textContent;
      if (isCorrect) {
         this.correctCounter++;
      }
      e.target.blur();
      this.userAnswers.push(e.target.textContent);
      if (this.questions.length === this.currentQuestion + 1) {
         this.isFinishedTest = true;
         const userId = JSON.parse(localStorage.getItem('userData')).userId;
         const percent = Math.floor(
            (this.correctCounter / this.questions.length) * 100
         );
         await this.request(`/test/${linkId}/addToCompleted`, 'POST', {
            userId,
            correctCounter: this.correctCounter,
            userAnswers: this.userAnswers,
            percent
         });
         return;
      }
      this.currentQuestion++;
   };

   @action
   onChangeNewQuestion = e => {
      this.newQuestion[e.target.name] = e.target.value;
   };

   @action
   addNewQuestion = () => {
      this.newQuestionErrors = [];
      if (
         this.newQuestion['correct_answer'] === 'Выберите правильный вариант'
      ) {
         return this.newQuestionErrors.push('Выберите правильный вариант');
      }
      this.newQuestions.push(this.newQuestion);
      this.newQuestion = {
         question: '',
         option_1: '',
         option_2: '',
         option_3: '',
         option_4: '',
         option_5: '',
         correct_answer: 'Выберите правильный вариант'
      };
      this.counter++;
   };

   @action
   createNewTest = async (linkId, history) => {
      await this.request(`/test/${linkId}/addTest`, 'POST', {
         questions: this.newQuestions
      });
      history.push(`/articles/${linkId}/`);
   };

   @action
   getTest = async linkId => {
      this.loadingTest = true;
      this.isFinishedTest = false;
      this.currentQuestion = 0;
      this.userAnswers = [];
      this.correctCounter = 0;
      const test = await this.request(`/test/${linkId}/getTest`, 'POST');

      if (test) {
         this.questions = test.questions;
      } else {
         this.questions = [];
      }

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
            this.userAnswers = test.userAnswers;
            this.correctCounter = test.correctCounter;
            return;
         }
      });

      this.loadingTest = false;
   };

   @action
   deleteTestById = async (linkId, history) => {
      const userId = JSON.parse(localStorage.getItem('userData')).userId;
      await this.request(`/test/deleteTestById`, 'POST', {
         linkId,
         userId
      });
      history.push(`/articles/${linkId}/`);
   };

   @action
   rebootTestById = async (linkId, history) => {
      const userId = JSON.parse(localStorage.getItem('userData')).userId;
      await this.request(`/test/rebootTestById`, 'POST', {
         linkId,
         userId
      });
      history.push(`/articles/${linkId}/`);
      this.isFinishedTestByUser = false;
      this.isFinishedTest = false;
   };

   @action
   onLoadTestConstructor = () => {
      this.newQuestionErrors = [];
      this.newQuestions = [];
      this.newQuestion = {
         question: '',
         option_1: '',
         option_2: '',
         option_3: '',
         option_4: '',
         option_5: '',
         correct_answer: 'Выберите правильный вариант'
      };
      this.counter = 0;
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

export default new TestStore();

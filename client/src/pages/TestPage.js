import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import testStore from '../stores/testStore';
import { observer } from 'mobx-react';
import Header from './../components/Header';
import Loader from './../components/Loader';
import FinishedTest from './../components/FinishedTest';
import authStore from '../stores/authStore';

const TestPage = () => {
   const {
      getTest,
      questions,
      loadingTest,
      currentQuestion,
      chooseAnswer,
      isFinishedTest,
      correctCounter,
      deleteTestById,
      rebootTestById,
      isFinishedTestByUser
   } = testStore;
   const { isAdmin } = authStore;
   const { linkId } = useParams();
   const history = useHistory();
   useEffect(() => {
      getTest(linkId);
   }, [linkId, getTest]);

   if (isFinishedTestByUser) {
      return (
         <>
            <Header />
            <div className='test'>
               <div className='container'>
                  <div className='test-form'>
                     <FinishedTest
                        questions={questions}
                        correctCounter={correctCounter}
                        linkId={linkId}
                     />
                  </div>
               </div>
            </div>
         </>
      );
   }
   return (
      <>
         <Header />
         <div className='test'>
            <div className='container'>
               {loadingTest ? (
                  <Loader />
               ) : questions.length ? (
                  <>
                     <div className='test-form'>
                        {isFinishedTest ? (
                           <FinishedTest
                              questions={questions}
                              correctCounter={correctCounter}
                              linkId={linkId}
                           />
                        ) : (
                           <>
                              <div className='test-form_counter'>
                                 {currentQuestion + 1} из{' '}
                                 {questions.length ? questions.length : '?'}
                              </div>
                              <h3 className='test-form_title title'>
                                 {questions.length
                                    ? questions[currentQuestion].question
                                    : ''}
                              </h3>
                              <div className='test-form_options'>
                                 {questions[currentQuestion].option_1 !==
                                    '' && (
                                    <div className='test-form_posr'>
                                       <span className='test-form_letter'>
                                          A)
                                       </span>
                                       <button
                                          className='test-form_option'
                                          onClick={e => chooseAnswer(e, linkId)}
                                       >
                                          {questions[currentQuestion].option_1}
                                       </button>
                                    </div>
                                 )}
                                 {questions[currentQuestion].option_2 !==
                                    '' && (
                                    <div className='test-form_posr'>
                                       <span className='test-form_letter'>
                                          B)
                                       </span>
                                       <button
                                          className='test-form_option'
                                          onClick={e => chooseAnswer(e, linkId)}
                                       >
                                          {questions[currentQuestion].option_2}
                                       </button>
                                    </div>
                                 )}
                                 {questions[currentQuestion].option_3 !==
                                    '' && (
                                    <div className='test-form_posr'>
                                       <span className='test-form_letter'>
                                          C)
                                       </span>
                                       <button
                                          className='test-form_option'
                                          onClick={e => chooseAnswer(e, linkId)}
                                       >
                                          {questions[currentQuestion].option_3}
                                       </button>
                                    </div>
                                 )}
                                 {questions[currentQuestion].option_4 !==
                                    '' && (
                                    <div className='test-form_posr'>
                                       <span className='test-form_letter'>
                                          D)
                                       </span>
                                       <button
                                          className='test-form_option'
                                          onClick={e => chooseAnswer(e, linkId)}
                                       >
                                          {questions[currentQuestion].option_4}
                                       </button>
                                    </div>
                                 )}
                                 {questions[currentQuestion].option_5 !==
                                    '' && (
                                    <div className='test-form_posr'>
                                       <span className='test-form_letter'>
                                          E)
                                       </span>
                                       <button
                                          className='test-form_option'
                                          onClick={e => chooseAnswer(e, linkId)}
                                       >
                                          {questions[currentQuestion].option_5}
                                       </button>
                                    </div>
                                 )}
                              </div>
                              {isAdmin && (
                                 <>
                                    <button
                                       className='test-form_rebootTest'
                                       onClick={() =>
                                          rebootTestById(linkId, history)
                                       }
                                    >
                                       Сбросить тест
                                    </button>
                                    <button
                                       className='danger test-form_deleteTest'
                                       onClick={() =>
                                          deleteTestById(linkId, history)
                                       }
                                    >
                                       Удалить тест
                                    </button>
                                 </>
                              )}
                           </>
                        )}
                     </div>
                  </>
               ) : (
                  <>
                     <p className='emptyTest title'>
                        Тест к этой статье отсутствует
                     </p>
                     <div className='center'>
                        <Link
                           to={`/articles/${linkId}/`}
                           className='backToArticle'
                        >
                           Вернуться к статьям
                        </Link>
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default observer(TestPage);

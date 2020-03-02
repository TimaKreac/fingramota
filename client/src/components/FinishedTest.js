import React from 'react';
import testStore from '../stores/testStore';
import authStore from '../stores/authStore';
import { useHistory } from 'react-router-dom';

const FinishedTest = ({ correctCounter, questions, linkId }) => {
   const {
      userAnswers,
      isFinishedTestByUser,
      deleteTestById,
      rebootTestById
   } = testStore;
   const { isAdmin } = authStore;
   const history = useHistory();
   return (
      <>
         <h3 className='test-form_completeTitle center title'>Тест пройден!</h3>
         <p className='center'>
            <span className='test-form_completeCorrect'>
               <img
                  src='/images/correct.svg'
                  alt='correct'
                  className='test-form_completeImg'
               />
               {correctCounter} из {questions.length}&nbsp; правильных (
               {Math.floor((correctCounter / questions.length) * 100)}
               %)
            </span>
         </p>
         <ul>
            {questions.map((q, i) => (
               <li key={i} className='test-form_question'>
                  <p className='title' style={{ marginBottom: '10px' }}>
                     {i + 1}.&nbsp;{q.question}
                  </p>
                  <p className='test-form_answer'>
                     <img
                        src={`/images/${
                           userAnswers[i] !== q[q.correct_answer]
                              ? 'error'
                              : 'correct'
                        }.svg`}
                        alt='answer'
                     />
                     <span style={{ fontWeight: 700 }}>Ваш ответ:&nbsp;</span>
                     {userAnswers[i]}
                  </p>
                  {userAnswers[i] !== q[q.correct_answer] && (
                     <p className='test-form_answer'>
                        <img src={`/images/correct.svg`} alt='correct' />
                        <span style={{ fontWeight: 700 }}>
                           Правильный ответ:&nbsp;
                        </span>
                        {q[q.correct_answer]}
                     </p>
                  )}
               </li>
            ))}
         </ul>
         {isAdmin && isFinishedTestByUser && (
            <>
               <button
                  className='test-form_rebootTest'
                  onClick={() => rebootTestById(linkId, history)}
               >
                  Сбросить тест
               </button>
               <button
                  className='danger test-form_deleteTest'
                  onClick={() => deleteTestById(linkId, history)}
               >
                  Удалить тест
               </button>
            </>
         )}
      </>
   );
};

export default FinishedTest;

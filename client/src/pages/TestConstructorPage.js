import React, { useEffect } from 'react';
import Header from './../components/Header';
import Input from './../components/Input';
import { observer } from 'mobx-react';
import testStore from '../stores/testStore';
import Select from './../components/Select';
import { useParams, useHistory } from 'react-router-dom';

const TestConstructorPage = () => {
   const {
      onChangeNewQuestion,
      addNewQuestion,
      newQuestion,
      counter,
      newQuestionErrors,
      createNewTest,
      onLoadTestConstructor
   } = testStore;

   useEffect(() => {
      onLoadTestConstructor();
   }, [onLoadTestConstructor]);

   const { linkId } = useParams();
   const history = useHistory();
   return (
      <>
         <Header />
         <div className='testContructor'>
            <div className='container'>
               <div className='testContructor-inner'>
                  <div className='testContructor-form'>
                     {newQuestionErrors.map((error, i) => (
                        <p
                           className='error testContructor-error'
                           key={i}
                           style={{ textAlign: 'center', marginBottom: '10px' }}
                        >
                           {error}
                        </p>
                     ))}
                     <Input
                        title='Вопрос'
                        className='testContructor-form_question'
                        name='question'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.question}
                     />
                     <Input
                        title='Вариант 1'
                        name='option_1'
                        className='testContructor-form_answer'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.option_1}
                     />
                     <Input
                        title='Вариант 2'
                        name='option_2'
                        className='testContructor-form_answer'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.option_2}
                     />
                     <Input
                        title='Вариант 3'
                        name='option_3'
                        className='testContructor-form_answer'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.option_3}
                     />
                     <Input
                        title='Вариант 4'
                        name='option_4'
                        className='testContructor-form_answer'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.option_4}
                     />
                     <Input
                        title='Вариант 5'
                        name='option_5'
                        className='testContructor-form_answer'
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.option_5}
                     />
                     <Select
                        onChange={e => onChangeNewQuestion(e)}
                        value={newQuestion.correct_answer}
                     />
                     <button
                        className='testContructor-form_addQuestion'
                        type='submit'
                        onClick={addNewQuestion}
                     >
                        Добавить вопрос
                     </button>
                     <p className='gray testContructor-form_counter'>
                        Текущее количество вопросов:{' '}
                        <span style={{ color: 'black' }}>{counter}</span>
                     </p>
                     <button
                        className='primary testContructor-form_createTest'
                        onClick={() => createNewTest(linkId, history)}
                        disabled={counter === 0}
                     >
                        Создать тест
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default observer(TestConstructorPage);

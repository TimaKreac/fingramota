import React, { useEffect } from 'react';
import Header from './../components/Header';
import Input from './../components/Input';
import TextArea from './../components/TextArea';
import { observer } from 'mobx-react';
import articleStore from '../stores/articleStore';
import { useParams, useHistory } from 'react-router-dom';

const ArticleConstructPage = () => {
   const { addNewArticle, onChangeNewArticle, newArticle } = articleStore;
   const { linkId } = useParams();
   const history = useHistory();

   useEffect(() => {
      newArticle.linkId = linkId;
   }, [linkId, newArticle]);

   return (
      <>
         <Header />
         <div className='constructor'>
            <div className='container'>
               <div className='constructor-inner'>
                  <form
                     className='constructor-form'
                     onSubmit={e => addNewArticle(e, history)}
                  >
                     <Input
                        title={'Название статьи'}
                        required
                        name='title'
                        onChange={onChangeNewArticle}
                     />
                     <TextArea
                        className={'constructor-form_text'}
                        title={'Текст статьи'}
                     />
                     <button
                        className='primary constructor-form_button'
                        type='submit'
                     >
                        Добавить статью
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default observer(ArticleConstructPage);

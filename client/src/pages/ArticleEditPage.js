import React, { useEffect } from 'react';
import Header from './../components/Header';
import Input from './../components/Input';
import TextArea from './../components/TextArea';
import { observer } from 'mobx-react';
import articleStore from '../stores/articleStore';
import { useHistory, useParams } from 'react-router-dom';

const ArticleEditPage = () => {
   const {
      onChangeEditArticle,
      editArticleById,
      getArticleById,
      articleById
   } = articleStore;

   const history = useHistory();
   const { linkId, id } = useParams();

   useEffect(() => {
      getArticleById(linkId, id);
   }, [getArticleById, linkId, id]);

   return (
      <>
         <Header />
         <div className='constructor'>
            <div className='container'>
               <div className='constructor-inner'>
                  <div className='constructor-form'>
                     <Input
                        title={'Название статьи'}
                        required
                        name='title'
                        onChange={onChangeEditArticle}
                        value={articleById.title}
                     />
                     <TextArea
                        className={'constructor-form_text'}
                        title={'Текст статьи'}
                        value={articleById.text}
                     />
                     <button
                        className='primary constructor-form_button'
                        onClick={() => editArticleById(linkId, id, history)}
                     >
                        Отредактировать статью
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default observer(ArticleEditPage);

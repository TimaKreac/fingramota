import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import articleStore from '../stores/articleStore';
import { useParams, Link, useHistory } from 'react-router-dom';
import Loader from './Loader';
import authStore from '../stores/authStore';

const Articles = observer(({ title }) => {
   const { linkId } = useParams();
   const { isAdmin } = authStore;
   const {
      articles,
      getBlockArticles,
      loadingArticles,
      deleteArticleBlock,
      isHaveTest,
      isFinishedTestByUser
   } = articleStore;

   const history = useHistory();

   useEffect(() => {
      getBlockArticles(linkId);
   }, [getBlockArticles, linkId]);

   return (
      <>
         <h3 className='articles-block_title title'>{title}</h3>
         <ul className='articles-block_articleList'>
            {loadingArticles ? (
               <Loader />
            ) : articles.length ? (
               articles.map(article => {
                  return (
                     <li className='articles-block_article' key={article._id}>
                        <Link to={`/articles/${linkId}/${article._id}`}>
                           {article.title}
                        </Link>
                     </li>
                  );
               })
            ) : (
               <li className='gray' style={{ marginBottom: '15px' }}>
                  Статей пока что нет
               </li>
            )}
            {isAdmin && !loadingArticles && (
               <>
                  <Link
                     to={`/articles/${linkId}/add_article`}
                     className='articles-block_addArticle'
                  >
                     Добавить статью
                  </Link>
                  {!isHaveTest && articles.length !== 0 && (
                     <>
                        <br />
                        <Link
                           to={`/articles/${linkId}/add_test`}
                           className='articles-block_addTest'
                        >
                           Добавить тест
                        </Link>
                     </>
                  )}
               </>
            )}
            {!loadingArticles &&
               isHaveTest &&
               !isFinishedTestByUser &&
               articles.length !== 0 && (
                  <div style={{ textAlign: 'center' }}>
                     <Link
                        to={`/articles/${linkId}/test`}
                        style={{ marginTop: '50px' }}
                        className='article-block_button'
                     >
                        Пройти тест
                     </Link>
                  </div>
               )}
            {!loadingArticles && isFinishedTestByUser && (
               <div style={{ textAlign: 'center' }}>
                  <Link
                     to={`/articles/${linkId}/test`}
                     style={{ marginTop: '50px' }}
                     className='article-block_resButton green'
                  >
                     Результаты теста
                  </Link>
               </div>
            )}
            {isAdmin && !loadingArticles && (
               <>
                  <Link
                     to={`/articles/${linkId}/edit_block`}
                     className='articles-block_editArticleBlock'
                     onClick={() => (articleStore.mode = 'editBlock')}
                  >
                     <img
                        src='/images/edit.svg'
                        alt='edit'
                        title='Редактировать блок'
                     />
                  </Link>
                  <br />
                  <button
                     className='articles-block_removeArticleBlock danger'
                     onClick={() => deleteArticleBlock(linkId, history)}
                  >
                     <img
                        src='/images/delete.svg'
                        alt='delete'
                        title='Удалить блок'
                     />
                  </button>
               </>
            )}
         </ul>
      </>
   );
});

export default Articles;

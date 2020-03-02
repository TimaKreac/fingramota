import React, { useEffect } from 'react';
import Header from './../components/Header';
import { useParams, useHistory, Link } from 'react-router-dom';
import articleStore from '../stores/articleStore';
import { observer } from 'mobx-react';
import authStore from '../stores/authStore';
import Loader from './../components/Loader';

function createMarkup(text) {
   return { __html: text };
}

const ArticlePage = () => {
   const {
      getArticleById,
      articleById,
      deleteArticleById,
      loadingArticleById
   } = articleStore;
   const { isAdmin } = authStore;
   const { linkId, id } = useParams();
   const history = useHistory();

   useEffect(() => {
      getArticleById(linkId, id);
   }, [getArticleById, linkId, id]);

   return (
      <>
         <Header />
         <div className='article' style={{ fontFamily: 'Open Sans' }}>
            <div className='container'>
               {loadingArticleById ? (
                  <Loader />
               ) : (
                  <div className='article-inner'>
                     {isAdmin && (
                        <div>
                           <Link
                              to={`/articles/${linkId}/${id}/edit`}
                              className='article-button edit'
                           >
                              Редактировать статью
                           </Link>

                           <button
                              className='article-button danger'
                              onClick={() =>
                                 deleteArticleById(linkId, id, history)
                              }
                           >
                              Удалить статью
                           </button>
                        </div>
                     )}
                     <h3 className='article-title title'>
                        {articleById.title}
                     </h3>
                     <div className='article-block'>
                        <p
                           className='article-block_text'
                           dangerouslySetInnerHTML={createMarkup(
                              articleById.text
                           )}
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default observer(ArticlePage);

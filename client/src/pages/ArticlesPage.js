import React, { useEffect } from 'react';
import Header from '../components/Header';
import authStore from '../stores/authStore';
import articleStore from '../stores/articleStore';
import Articles from './../components/Articles';
import AddArticleBlock from './../components/AddArticleBlock';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Plus from './../components/Plus';

const ArticlesPage = () => {
   const { isAdmin } = authStore;
   const {
      toAddArticleBlock,
      mode,
      getArticleBlocks,
      articleBlocks,
      loadingArticles
   } = articleStore;
   const { linkId } = useParams();
   const history = useHistory();

   useEffect(() => {
      getArticleBlocks(history);
   }, [getArticleBlocks, history]);

   return (
      <>
         <Header />
         <main className='articles'>
            <div className='container'>
               <div className='articles-inner'>
                  <div className='acticles-blocks'>
                     {articleBlocks.map(block => {
                        return (
                           <Link
                              key={block.linkId}
                              to={
                                 loadingArticles
                                    ? false
                                    : `/articles/${block.linkId}`
                              }
                              className={`articles-block ${
                                 linkId === block.linkId ? 'active' : ''
                              }`}
                              onClick={() => (articleStore.mode = 'articles')}
                           >
                              {block.title}
                           </Link>
                        );
                     })}

                     {isAdmin && (
                        <Link
                           to='/articles/addNewBlock'
                           className='articles-block add'
                           onClick={toAddArticleBlock}
                        >
                           <div className='plus'>
                              <Plus />
                           </div>
                        </Link>
                     )}
                  </div>

                  <div className='articles-block_titles'>
                     {mode === 'articles' ? (
                        articleBlocks.map(block => {
                           if (linkId === block.linkId) {
                              return (
                                 <Articles
                                    title={block.title}
                                    key={block.linkId}
                                 />
                              );
                           }
                           return null;
                        })
                     ) : (
                        <AddArticleBlock />
                     )}
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default observer(ArticlesPage);

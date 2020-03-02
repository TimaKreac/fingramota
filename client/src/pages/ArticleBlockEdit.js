import React, { useEffect } from 'react';
import Header from '../components/Header';
import authStore from '../stores/authStore';
import articleStore from '../stores/articleStore';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Plus from './../components/Plus';
import EditArticleBlock from '../components/EditArticleBlock';

const ArticlesPage = () => {
   const { isAdmin } = authStore;
   const { toAddArticleBlock, getArticleBlocks, articleBlocks } = articleStore;
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
                              to={`/articles/${block.linkId}`}
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
                     <EditArticleBlock />
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default observer(ArticlesPage);

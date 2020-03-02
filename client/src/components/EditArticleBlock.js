import React, { useEffect } from 'react';
import Input from './Input';
import articleStore from '../stores/articleStore';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';

const AddArticleBlock = observer(() => {
   const {
      editBlock,
      editArticleBlock,
      onChangeEditBlock,
      getArticleBlock
   } = articleStore;
   const history = useHistory();
   const { linkId } = useParams();

   useEffect(() => {
      getArticleBlock(linkId);
   }, [getArticleBlock, linkId]);

   return (
      <>
         <form onSubmit={e => editArticleBlock(linkId, history, e)}>
            <Input
               title='Название блока'
               name='title'
               onChange={onChangeEditBlock}
               value={editBlock.title}
               required
            />
            <Input
               title='ID блока'
               name='linkId'
               value={editBlock.linkId}
               onChange={onChangeEditBlock}
               required
            />
            <button
               className='primary'
               style={{ margin: 'auto' }}
               type='submit'
            >
               Редактировать блок
            </button>
         </form>
      </>
   );
});

export default AddArticleBlock;

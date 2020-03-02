import React from 'react';
import Input from './Input';
import articleStore from '../stores/articleStore';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const AddArticleBlock = observer(() => {
   const { onChangeNewBlock, addNewArticleBlock } = articleStore;
   const history = useHistory();
   return (
      <>
         <form onSubmit={e => addNewArticleBlock(history, e)}>
            <Input
               title='Название блока'
               name='title'
               onChange={onChangeNewBlock}
               required
            />
            <Input
               title='ID блока'
               name='linkId'
               onChange={onChangeNewBlock}
               required
            />
            <button
               className='primary'
               style={{ margin: 'auto' }}
               type='submit'
            >
               Добавить блок
            </button>
         </form>
      </>
   );
});

export default AddArticleBlock;

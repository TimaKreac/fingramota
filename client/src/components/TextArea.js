import React from 'react';

function createMarkup(text) {
   return { __html: text };
}

const TextArea = ({ title, className, required, value }) => {
   const formatDoc = (sCmd, sValue, el) => {
      document.execCommand(sCmd, false, sValue);

      if (el) {
         el.selectedIndex = 0;
      }
   };

   return (
      <>
         <label>
            {title}&nbsp;
            <span className='required'>{required && '*'}</span>
         </label>
         <div className='constructor-instruments'>
            <img
               src='/images/bold.svg'
               alt='bold-text'
               title='Жирный'
               onClick={() => formatDoc('bold')}
            />
            <img
               src='/images/italic.svg'
               alt='italic-text'
               title='Кривой'
               onClick={() => formatDoc('italic')}
            />
            <img
               src='/images/underline.svg'
               alt='underline-text'
               title='Подчеркнутый'
               onClick={() => formatDoc('underline')}
            />
            <img
               src='/images/left.svg'
               alt='left-text'
               title='Текст слева'
               onClick={() => formatDoc('justifyleft')}
            />
            <img
               src='/images/center.svg'
               alt='center-text'
               title='Текст по центру'
               onClick={() => formatDoc('justifycenter')}
            />
            <img
               src='/images/right.svg'
               alt='right-text'
               title='Текст справа'
               onClick={() => formatDoc('justifyright')}
            />
            <img
               src='/images/number-list.svg'
               alt='num-list'
               title='Нумерованный список'
               onClick={() => formatDoc('insertorderedlist')}
            />
            <img
               src='/images/point-list.svg'
               alt='point-list'
               title='Пунктирный список'
               onClick={() => formatDoc('insertunorderedlist')}
            />
            <select
               className='constructor-instruments_select'
               defaultValue='Шрифт'
               onChange={e => formatDoc('fontname', e.target.value, e.target)}
            >
               <option disabled>Шрифт</option>
               <option value='Open Sans'>Open Sans</option>
               <option value='Fira Sans'>Fira Sans</option>
            </select>
            <select
               className='constructor-instruments_select'
               defaultValue='Размер'
               onChange={e => formatDoc('fontsize', e.target.value, e.target)}
            >
               <option disabled>Размер</option>
               <option value='3'>16px</option>
               <option value='4'>18px</option>
               <option value='5'>24px</option>
               <option value='6'>32px</option>
            </select>
            <select
               className='constructor-instruments_select'
               defaultValue='Цвет'
               onChange={e => formatDoc('forecolor', e.target.value, e.target)}
            >
               <option disabled>Цвет</option>
               <option value='#333333'>Чёрный</option>
               <option value='#EB1515'>Красный</option>
               <option value='#002265'>Синий</option>
               <option value='#4CAF50'>Зеленый</option>
            </select>
         </div>
         <div
            contentEditable
            className={className}
            dangerouslySetInnerHTML={createMarkup(value)}
         ></div>
      </>
   );
};

export default TextArea;

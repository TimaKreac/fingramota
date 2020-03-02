import React from 'react';

const Select = ({ onChange, value }) => {
   return (
      <>
         <select name='correct_answer' value={value} onChange={onChange}>
            <option disabled>Выберите правильный вариант</option>
            <option value='option_1'>Вариант 1</option>
            <option value='option_2'>Вариант 2</option>
            <option value='option_3'>Вариант 3</option>
            <option value='option_4'>Вариант 4</option>
            <option value='option_5'>Вариант 5</option>
         </select>
      </>
   );
};

export default Select;

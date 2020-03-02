import React from 'react';

const Input = ({
   title,
   type = 'text',
   name,
   required = false,
   onChange,
   placeholder,
   login,
   className,
   value,
   disabled
}) => {
   return (
      <>
         <label>
            {title}&nbsp;
            <span className='required'>{required && !login && '*'}</span>
         </label>
         <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={className}
            value={value}
            disabled={disabled}
         />
      </>
   );
};

export default Input;

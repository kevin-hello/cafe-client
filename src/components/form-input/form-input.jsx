import { useState } from 'react';


const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {label, errorMessage, onChange, id, ...inputProps} = props;
  
  const handleFocus = (e) => {
    setFocused(true);
  };

  return(
    <div className='formInput float-label'>
      <label>{label}</label>
      <input
      {...inputProps}
      onChange={onChange}
      onBlur={handleFocus}
      onFocus={
        ()=>inputProps.name==="confirmPassword" && setFocused(true)
    }
      focused={focused.toString()}
      />
      <span id="error-message">{errorMessage}</span>
    </div>
  )
}

export default FormInput
import React, { useState,useRef, useEffect } from 'react';

import "../css/login.css";

const FormInputs = ({type,name,value,error,handlePassword,form,showPassword,handleChange,handleBlur,placeholder,emailInp,formErr,signinPlaceholder,formSigninError,resetErr}) => {
  // console.log(error)
  // when clicking on the placeholder the input is not getting focused
  // because of which when click on the placeholder we can focus on the input instead
  const [foc,setFoc] = useState(false);
  const focus = useRef();

  useEffect(() => {
    if(foc){  
      focus.current.focus();
    }
  },[foc])

  // when clickin on the place holder the input gets focused but the prob is that we have to click twice
  // for second time to get focus after the initial focus this might cause a prob (since double click)
  // sol we have to set focus to false after setting it to true it works only when using handle Foc.
  const handleFoc = () => {
    setFoc(prev => !prev);
    setTimeout(() => {
      setFoc(prev => !prev);
    })
  }

  return (
    <>
        <div  className={`userfeilds userfeilds${form}`}>
          <input 
              type={type === "password"  ? (showPassword ? "text" : "password") : type}
              name={name}
              value={value}
              ref={focus}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`${foc ? "foc" : ""}`}
            />
            {/* ${foc ? "foc" : ""} */}
            {/* onClick={handleFoc} */}
            <span className={`placeholder`} onClick={handleFoc}>{placeholder}</span>
            {name === "password" && (
              <span className="material-symbols-outlined showPass" onClick={handlePassword}>
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            )}

          {error && 
            <div className= "formErr" >
              <span className="material-symbols-outlined">
                error
              </span>
              <div>
                {error}
              </div>
            </div>
          }
        </div>
    </>
  )
}

export default React.memo(FormInputs)
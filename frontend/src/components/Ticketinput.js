import React from 'react'

const Ticketinput = ({label,err,type,ticketDet,placeholder,value,name,handleChange,showArrival,showDepature,handleClick,keyUp,suggestions,handleBlur}) => {

  return (
    <> 
        {/* input feild */}
        <div className='ticketInp'>
            <label>{label}</label>
            <input 
                // style={{'backgroundColor':"#214374"}}
                type={type}  
                placeholder={placeholder} 
                value={value}
                name={name} 
                onChange={handleChange}
                onKeyUp={keyUp}
                // onClick = {selectInp}
                onBlur = {handleBlur}
                disabled = {name !== "to" ? false : ticketDet.from.length ? false : true }
            />
            {err && 
            <div className= "formErr ticketErr" >
              <span className="material-symbols-outlined">
                error
              </span>
              <div>
                {err}
              </div>
            </div>
          }

            {/* suggestions */}

            {/* check if value exists */}
            {value.length ? 
              // if there are any suggestion then show else display message
              suggestions.length ?
                
                //show the suggestions to only the required input feild
                  name === "from" && showArrival ? 
                  <>
                    <div className='suggestions'>
                      {suggestions.filter((ele,idx) => idx < 3).map(airport => {
                        return (
                          <>  
                            <div className='sugCity' key={airport} onClick={({target}) => {handleClick("from",target.innerText)}}>{airport}</div>
                            <div className='hr'></div>
                          </>
                        )
                      })}
                    </div>
                  </> 
                  : name === "to" && showDepature ? 
                  <>
                  <div className='suggestions'>
                    {suggestions.filter((ele,idx) => idx < 3).map(airport => {
                      return (
                        <>  
                          <div className='sugCity' onClick={({target}) => {handleClick("to",target.innerText)}}>{airport}</div>
                          <div className='hr'></div>
                        </>
                      )
                    })}
                  </div>
                </>  : ""

              :
              (name === "from" || name === "to" && <div className='suggestions'>
                  <div className='sugCity noRes'>No results found.</div>
                </div>)
            : ""}
        </div>
    </>
  )
}

export default Ticketinput
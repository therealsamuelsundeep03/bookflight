import React,{useEffect, useState} from 'react'

const Options = ({ticketDet,setTicketDet}) => {
  const [trav,setTrav] = useState({adults:1,children:1,place:"Economy"})
  const [showOpt,setShowOpt] = useState(false);

  useEffect(() => {
    
    setTicketDet({...ticketDet,person:{...trav}});
  },[trav]);

  // console.log(showOpt)
  return (
    <>
      <div className={`ticketInp opt`} onClick={() => {setShowOpt(!showOpt)}}>
        <input type="text" value={`${trav.adults} Adult, ${trav.children} Children ${trav.place}`}/>
      </div>
      <div className={`options ${showOpt && "showopt" }`}>
          <div className='class'>
            <input type="radio"  checked = {trav.place === "Economy" ? "checked" : ""}  name="economy" onClick={() => {setTrav({...trav,place:"Economy"})}}/>
            <label >Economy</label>
            <input type="radio" value="Buisness"  checked = {trav.place === "Buisness" ? "checked" : ""}  name="buisness" onClick={() => {setTrav({...trav,place:"Buisness"})}}/>
            <label>Buisness</label>
          </div>
          <div className='persons'>
            <div className='adult'>
              <h5>Adults</h5>
              <button onClick={(e) => {e.preventDefault();setTrav({...trav,adults : trav.adults+1})}}>+</button>
               {trav.adults}
              <button onClick={(e) => {e.preventDefault();return trav.adults > 0 ? setTrav({...trav,adults : trav.adults-1}) : ""}}>-</button>
            </div>
            <div className='adult'>
              <h5>Children</h5>
              <button  onClick={(e) => {e.preventDefault();setTrav({...trav,children : trav.children+1})}}>+</button>
                {trav.children}
              <button onClick={(e) => {e.preventDefault();return trav.children > 0 ? setTrav({...trav,children : trav.adults-1}) : ""}}>-</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Options
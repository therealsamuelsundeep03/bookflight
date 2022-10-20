import React,{ useState, useEffect } from 'react';
import { useNavigate,Redirect } from "react-router-dom";

import Header from '../components/Header';
import Ticketinput from '../components/Ticketinput';
import Options from '../components/Options';
import axios from '../service/backend';
import "../css/home.css";

const Home = () => {
    // booking details
    const [ ticketDet,setTicketDet ] = useState({
        from:"",
        to:"",
        depart:"",
        person:{},
        error:{
            from:"",
            to:"",
            depart:"",
            person:"",
        },
        touched:{
            from:false,
            to:false,
            depart:false,
        }
    })

    // storing the data from api
    const [data,setData] = useState([]);


    // getting all the suggestions
    const [suggestions,setSuggestions] = useState([]);

    // check to which input must the suggestion box is shown
    const [showArrival,setShowArrival] = useState(true)
    const [showDepature,setShowDepature] = useState(true);


    const user = localStorage.getItem("user");

    useEffect(() => {

        const fetchData = async() => {
            try{
                // getting data from the backend...
                const { data } = await axios.get("/flights");
                setData(data);
            }
            catch(err){
                console.log(err)                
            }
        }
        fetchData();
    },[])

    const navigate = useNavigate();

    // input details
    let inputDet = [
        {label:"From",name:"from",type:"text",placeholder:"city",value:ticketDet.from,err:ticketDet.error.from},
        {label:"To",name:"to",type:"text",placeholder:"city",value:ticketDet.to,err:ticketDet.error.to},
        {label:"Depart",name:"depart",type:"date",placeholder:"city",value:ticketDet.depart,err:ticketDet.error.depart},
    ]

    // handling the inputs
    const handleChange = ({target:{name,value}}) => {
        const errors = ticketDet.error;        
        errors.from = ""
        // console.log(name, value)
        switch(name){
            case "from" :  {
                errors.from = !value ? "Required" : "";
                break;
            }

            case "to" : {
                errors.to = !value ? "Required" : "";
                break;
            }
           
            case "depart" : {
                errors.to = !value ? "Required" : "";
                break;
            }
        }
        setTicketDet({...ticketDet,[name]:value},errors); 
    }
    // handling suggestions
    const keyUp = ({target:{name,value}}) => {
        if(value && name === "from" || name == "to"){
            // filtering based on search 
            let suggestions = []
            name === "from" ? 
                suggestions =  data.filter(({from:{airport}}) => airport.toLowerCase().startsWith(value.toLowerCase())).map(({from:{airport}}) => airport)
                : suggestions =  data.filter(({from:{airport}}) => airport.toLowerCase() === ticketDet.from.toLowerCase()).filter(({to:{airport}}) => airport.toLowerCase().startsWith(value.toLowerCase())).map(({to:{airport}}) => airport)
            
                setSuggestions([...new Set(suggestions)]);

            // display suggestion box for only one input
            name === "from" ? setShowArrival(true) : setShowArrival(false)
            name === "to" ? setShowDepature(true) : setShowDepature(false)
        }
    }

    // selecting the selected suggestion and removing suggestion box
    const handleClick = (name,val) => {
        setTicketDet({...ticketDet,[name]:val});
        name === "from" ? setShowArrival(false) : setShowDepature(false);
    }

    const handleBlur = ({target:{name}}) => {
        const touched = {...ticketDet.touched,[name]:true};
        setTicketDet({...ticketDet,touched})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const notTouched = Object.values(ticketDet.touched).filter(e => !e);
        const errors = Object.values(ticketDet.error).filter(e => e !== "");

        (!notTouched.length && !errors.length ? navigate("/flight-details",{state:{data,ticketDet}}) : setTicketDet({...ticketDet,error:{...ticketDet.error,from:"Fill all inputs"}}));
    }
    return (
        <>
            {user ? (
            <div className='home'>
             {/* header section */}
             <Header />

            {/* search section */}
            <div className='searchSection'>
                <h1>Book Your Flights</h1> 

                {/*input form  */}
                <form onSubmit={handleSubmit}>
                    <div className='ticketInputs'>
                        {inputDet.map(inp => 
                            < Ticketinput 
                                key={inp.label}
                                label={inp.label} 
                                placeholder={inp.placeholder}
                                name={inp.name}
                                type={inp.type}
                                value={inp.value}
                                err={inp.err}
                                handleChange={handleChange}
                                keyUp={keyUp}
                                handleClick={handleClick}
                                suggestions={suggestions}
                                showArrival={showArrival}
                                showDepature ={showDepature}
                                handleBlur={handleBlur}
                                ticketDet={ticketDet}
                            />)}
                        <Options ticketDet = {ticketDet}  setTicketDet={setTicketDet}/>
                    </div>
                    <div className="searchBut"><button type='submit'>Search Flights</button></div>
                </form>
            </div>

            {/* about app */}

            {/* cities */}
        </div>
        ) : navigate("/login")}
        </>
    )
}

export default Home
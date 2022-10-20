import React,{ useState,useEffect,createRef } from 'react'
import { useNavigate } from "react-router-dom";


import axios from "../service/backend";
import loginAnime from "../service/login1.json";
import Animation from '../components/Animation';
import Forminputs from "../components/Forminputs";
import "../css/signin.css";

const UserSignin = () => {
    // user credentials
    const [ credentials,setCredentials ] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword : "",
        errors : {
            username:"",
            email:"",
            password:"",
            confirmpassword : "",
        },
        touched : {
            username:false,
            email:false,
            password:false,
            confirmpassword : false,
        }
    }
    )
    
    // loading
    const [loading,setLoading] = useState(false);

    // common err
    const [err,setErr] = useState(null);

    // decides what to display
    const [display,setDisplay] = useState(false);

    const [showPassword,setShowPassword] = useState(false);

     // handling password
    const handlePassword = () => {
        setShowPassword(!showPassword)
      }

    const emailInp = createRef();

    // to navigate to the sigin page.
    const navigate = useNavigate();

    // form input feilds
    const inputFeilds = [
    {label:"username",name:"username",type:"username",placeholder:"username",value:credentials.username,classname:"userusername",emailInp,err:credentials.errors.username},
    {label:"Email",name:"email",type:"email",placeholder:"Email",value:credentials.email,classname:"userEmail",err:credentials.errors.email},
    {label:"Password",name:"password",type:"password",showPassword,placeholder:"Password",value:credentials.password,classname:"userPasswordsignin",err:credentials.errors.password},
    {label:"Confirm Password",name:"confirmpassword",type:"password",placeholder:"Confirm Password",value:credentials.confirmpassword,classname:"userconfirmPasswordsignin",err:credentials.errors.confirmpassword}
    ]

   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%()^&*_]).{8,24}$/;

    // handle input validation user input
    const handleChange = ({target:{name,value}}) => {
        const errors = credentials.errors;
        errors.username="";
        errors.email="";

        switch(name){
            case 'email' : {
                errors.email = !value ? "Required" : "";
                break;
            }
            case 'password' : {
                const result = passwordRegex.test(credentials.password);
                errors.password = !result ? "Must include 8 to 24 characters,uppercase,lowercase and a special character(!@#$%^&*_)" : "";
                break;
            }
            case 'username' : {
                errors.username = !value ? "Required" : "";
                break;
            }
            case 'confirmpassword' : {
                errors.confirmpassword = value !== credentials.password ? "Password dosen't match" : "";
            }
        }

        setCredentials({...credentials,[name]:value},errors);
    }

    // to check if the user has filled all the inputs
    const handleBlur = ({target:{name}}) => {
        const touched = {...credentials.touched,[name]:true}
        setCredentials({...credentials,touched});
    }

    //handling submit 
    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            setLoading(true);

            const errors = credentials.errors;

            // disable submit button until all the inputs are validated
            const error = Object.values(credentials.errors).filter(err => err !== "");
            const notTouched = Object.values(credentials.touched).filter(err => !err);
            // console.log(notTouched)
            // console.log(error.length,notTouched.length)
            
            // if no errors then send the data to the backend...
            if(!error.length && !notTouched.length){
                // if the credentials is validated then send the response to the backend
                const {username,email,password,confirmpassword} = credentials;
                const { data } = await axios.post("/signin",({username,email,password,confirmpassword}));
                console.log(data)
                if(data === "Check mail"){
                    setDisplay(true);
                }
            }else{
                setLoading(false);
            }
        }catch(err){
            // console.log(err)
            const errors = credentials.errors;
            if(err.response.status === 500){
                setLoading(false)
                errors.username = "Please try again or Check internet connectivity";
            }
            if(err.response.data === "Email already exists."){
                setLoading(false)
                errors.email = "Email already exists.";
            }
            if(err.response.data === "Fill all the user inputs."){
                setLoading(false)
                errors.username = "Fill all the user inputs.";
            }
            setCredentials({...credentials,errors})
        }   
    }  
    return (
        <>
        <div className="signin userLogin">
            <div className="signinContainer userLoginContainer">
                <div className='leftPanel'>
                    <div className={`animateImg animeSignin`}>
                    <Animation anime={loginAnime} />
                    </div>
                </div>
                <div className='rightPanel'>        
                    {display ? (
                        <>
                            <div className='confirmation'>
                                <h2>Please check your mail for confirmation</h2>
                                <h5 onClick={() => {window.location.reload()}}>
                                    <div className="material-symbols-outlined">
                                        keyboard_backspace
                                    </div>
                                    <div>Try again</div>
                                </h5>
                            </div>
                        </>
                    ): (
                        <>
                            <h2 className={`signinhead`}>Sign in</h2>

                            <div className={`signinfeildsContainer`}>
                            <form onSubmit={handleSubmit}>
                                {/* creating form feilds */}
                                { inputFeilds.map(inp => <Forminputs key={inp.label} showPassword={inp.showPassword} form={"sign"} label={inp.label} type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} classname={inp.classname} handleChange={handleChange} handleBlur={handleBlur} error={inp.err} err={err} formErr = "formErr" handlePassword={handlePassword}/>)}

                                {/* submit button */}

                                <button type='submit' className={`userSubmit`} disabled={loading} >

                                {loading ? (
                                    <div className="spinner-border text-light spinner" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    ) : <div>Sign in</div>}

                                </button>

                                </form>
                            <div className='signinLink'>Already have an account? <span onClick={() => {navigate("/user-login")}}>Log in</span></div>
                                    
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default UserSignin;
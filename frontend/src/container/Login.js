import React,{ useState,useEffect } from 'react';
import  { useNavigate } from "react-router-dom";

import axios from '../service/backend';
import loginAnime from "../service/login1.json";
import Animation from "../components/Animation";
import useAuth from '../hooks/useAuth';
import Forminputs from '../components/Forminputs';
import Googlelogin from '../components/Googlelogin';
import "../css/login.css";

const Login = () => {
  const [ credentials,setCredentials ] = useState({
    email:"",
    password:"",
    errors:{
      email:"",
      password:""
    },
    touched:{
      email:false,
      password:false,
    }
  })


  const [err,setErr] = useState(null);

  const [loading,setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);

  const {auth,setAuth} = useAuth();

  useEffect(() => {
    // to focus the first input feild on loading the page.
    // emailInp.current.focus()
  },[]);

  const navigate = useNavigate();

  // form input feilds
  const inputFeilds = [
    {label:"Email",name:"email",type:"email",placeholder:"Email",value:credentials.email,classname:"userEmail",err:credentials.errors.email},
    {label:"Password",name:"password",showPassword,type:"password",placeholder:"Password",value:credentials.password,classname:"userPassword",err:credentials.errors.password}
  ]

  // handling password
  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = ({target:{name,value}}) => {
    setErr(null)
    const errors = credentials.errors;
    errors.email=""
    errors.password=""

    switch(name){
        case "email" : 
            errors.email = !value ? "Required" : "";
            break;

        case "password" : 
            errors.password = !value ? "Required" : "";
            break;

        default : break;
    }

    setCredentials({...credentials,[name]:value},errors)
  }

  const handleBlur = ({target:{name}}) => {
    const touched = {...credentials.touched,[name]:true};
    setCredentials({...credentials,touched})
  }
  const error = Object.values(credentials.errors).filter(err => err !== "").length;


  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      setLoading(true)
      const errors = credentials.errors;

      // disable submit button until all the error validations are fullfiled
      const error = Object.values(credentials.errors).filter(err => err !== "");
      const notTouched = Object.values(credentials.touched).filter(err => !err);
    

      // if no errors then send the data to the backend...
      if(!error.length && !notTouched.length){
          // if the credentials is validated then send the response to the backend
          const { data } = await axios.post("/login",{
            "email":credentials.email,
            "password":credentials.password
          },
          {withCredentials:true})
          localStorage.setItem("user",data.user)
          setAuth(data.accessToken);
          navigate("/")
          
      }else{
        setLoading(false)
      }
  }
  catch(error){
    const errors = credentials.errors;
    setLoading(false)
    if(error.response.status === 500){
      errors.email = "Please try again or check internet connectivity."
    }else if(error.response.data === "Fill all the inputs."){
      errors.email = "Fill all the inputs.";
    }else if(error.response.data === "Email doesn't exists."){
      errors.email = "Email doesn't exists.";
    }else if(error.response.data === "Password doesn't match"){
      errors.password = "Password doesn't match.";
    }else if(!error.response){
      errors.email = "check internet connectivity."
    }else if(error.response.data == "Sign in to login"){
      errors.email = "Sign up to login or use google login"
    }
    setCredentials({...credentials,errors})
    // console.log(error.response.data)
  }
  }
  return(
    <>
      <div classname="userLoginPage">
        <div className="userLogin">
                <div className="Container userLoginContainer">
                    <div className="leftPanel">
                        <div className="animateImg">
                        <Animation anime={loginAnime} />
                        </div>
                    </div>
                    <div className="rightPanel">        
                    <>
                    <h2 className="head">Log In</h2>

                    <div className="feildsContainer">

                    <form onSubmit={handleSubmit}>
                        {/* creating form feilds */}
                        { inputFeilds.map(inp => <Forminputs key={inp.label} showPassword={inp.showPassword} label={inp.label} type={inp.type} placeholder={inp.placeholder} name={inp.name} value={inp.value} classname={inp.classname} emailInp={inp.emailInp} handleChange={handleChange} handleBlur={handleBlur} error={inp.err}  formErr = "formErr" handlePassword={handlePassword}/>)}
                        
                        {/* submit button */}
                        
                        <button style={{backgroundColor:"darkcyan"}} type='submit' className={`userSubmit`} disabled={loading} >

                        {loading ? (
                            <div className="spinner-border text-light spinner" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>
                            ) : <div >Log in</div>}

                        </button>

                    </form>
                    <div className='signinLink'>Don't have an account? <span onClick={() => {navigate("/signin")}}>sign up</span></div>
                            <div className='loginhr'>
                                <div />
                                <span>or</span>
                            </div> 
                            <Googlelogin/>
                    </div>
                </>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Login;


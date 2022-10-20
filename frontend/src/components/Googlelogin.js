import React,{ useState } from 'react';
import GoogleLogin from "react-google-login";
import { useNavigate } from 'react-router-dom';

import axios from "../service/backend";
import useAuth from "../hooks/useAuth";

const Googlelogin = () => {
    const [err,setErr] = useState("");

    const { auth,setAuth } = useAuth();

    const navigate = useNavigate();
    
    const handleLogin = async(res) => {
        try{
            const email = res.profileObj.email;
            const { data:{accessToken,id} } = await axios.post("/googlogin",{email},{ withCredentials:true});
            // console.log(accessToken)
            setAuth(accessToken);
            navigate("/");
            localStorage.setItem("user",id)
        }
        catch(err){
            console.log(err.response.data);
        }
    }

    const handleFailure= (err) => {
        // console.log(err);
    }
    // console.log(process.env.REACT_APP_GOOGLE_LOGIN_ID)

    return (
        <div className='googleLogin'>
            <GoogleLogin 
                clientId={"478067663275-6m5e98p5p9et3416a396dmm63c1jkjre.apps.googleusercontent.com"}
                buttonText="Log In with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                />
        </div>
    )
}

export default Googlelogin
import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
// import LoginStyles from "./Login.module.css"
import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signinGoogle, signin} from "../../redux/actions/auth";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate ()
    const dispatch = useDispatch()


    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signinGoogle(accessToken,navigate))
    }
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    function handleSubmit(e){
        e.preventDefault();
        if(email !== "" && password !== ""){
            dispatch(signin({email,password}, navigate))
        }

    }

    return (
        <div className="  bg-transparent  p-0">
            <div className="">
                <h1>Welcome back</h1>

                <div className="">
                    <label>EMAIL</label>
                    <input onChange={e=> setEmail(e.target.value)} placeholder="enter your email" type="email"/>
                </div>

                <div className="">
                    <label>PASSWORD</label>
                    <input onChange={e=> setPassword(e.target.value)} placeholder="enter your password" type="password"/>
                </div>

                <div className="">
                    <div>
                        Remember Me <input type="checkbox" />
                    </div>
                    <div>
                        <Link to="/account/forgotpassowrd">Forgot password?</Link>
                    </div>
                </div>

                <button onClick={handleSubmit} className="">LOGIN</button>
                <span className="">or</span>
                 <button onClick={() => login()} className="">
                    <i class="fa-brands fa-google"></i>  Sign in with google</button>
                
                    
                    <span className="">Not registered yet?  <Link className="" to="/account/signup">Signup</Link></span>
                    
            </div>

        </div>
    )
}

export default Login;
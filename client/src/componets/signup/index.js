import React, { useState } from "react";
// import SignUp from "./Signup.module.css"
import { Link, useNavigate } from "react-router-dom"

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from "../../redux/actions/auth";


const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: ''
}


function Signup() {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signupGoogle(accessToken, nagivate))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm, nagivate))
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
    return (
        <div className="bg-black relative overflow-hidden text-white flex flex-col lg:flex-row md:p-0 lg:p-10 md:space-x-10 lg:space-x-20 items-center justify-center p-4 h-full space-y-10 ">

            <div>
                <img className="absolute right-80 z-0 lg:top-0 lg:-left-[50rem]  blur-3xl" src="/blur.png" alt="" />
            </div>

            {/* Visual Prompt */}
            <div className="space-y-10 z-10 lg:w-1/3 md:text-center lg:text-left">
                <h2 className="underline decoration-brand underline-offset-8 decoration-2">Project Management Tool</h2>
                <h1 className="text-5xl font-extrabold leading-[3rem] ">Everything you need in one place</h1>
                <h4 className="text-sm text-white/50 lg:w-3/4">Manage your boards using Drag-n-Drop, create additional boards and tasks</h4>
            </div>



            <div className="w-fit z-10 lg:w-1/4 p-4  flex flex-col justify-center items-center bg-[#101113] rounded-2xl border-2 border-white/5 space-y-10">
                <h1 className="text-2xl lg:text-3xl">Sign Up</h1>
                <div className="space-y-5 lg:w-full">
                    <div className="w-full space-y-2">
                        <label className="text-form_text">FRIST NAME</label>
                        <input className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" onChange={handleChange} name="firstName" placeholder="Enter your first name" type="text" />
                    </div>
                    <div className="w-full space-y-2">
                        <label className="text-form_text">LAST NAME</label>
                        <input name="lastName" className="w-full  p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" onChange={handleChange} placeholder="Enter your last name" type="text" />
                    </div>
                    <div className="w-full space-y-2">
                        <label className="text-form_text">Email</label>
                        <input name="email" className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" onChange={handleChange} placeholder="Enter your email" type="email" />
                    </div>

                    <div className="w-full space-y-2">
                        <label className="text-form_text">Password</label>
                        <input name="password" className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" onChange={handleChange} placeholder="Enter your password" type="password" />
                    </div>

                    <div className="w-full space-y-2">
                        <label className="text-form_text">Confirm Password</label>
                        <input name="confirmPassword" className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" onChange={handleChange} placeholder="Re-enter password" type="password" />
                    </div>

                    <div className="space-x-2 flex flex-col space-y-5 items-center justify-center px-10">
                        <div className="space-x-2 ">
                            <button onClick={handleOnSubmit} className=" text-black text-lg font-semibold bg-white px-3 py-2 rounded ">Register</button>
                            <button onClick={() => login()} className="bg-active_bg px-3 py-2 text-lg font-semibold rounded">
                                <i class="fa-brands fa-google"></i></button>
                        </div>
                        <div className="w-fit flex flex-col justify-center items-center text-xs">
                            <div className="text-form_text">
                                Already Signed Up? <Link className="hover:text-brand" to="/account/login">Login</Link>
                            </div>
                            <div className="text-form_text">
                                <Link className="hover:text-brand" to="/account/forgotpassword">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <img className=" block  absolute -bottom-20 z-0 lg:-top-80  blur-3xl" src="/blur.png" alt="" />
            </div>


        </div>
    )
}

export default Signup;

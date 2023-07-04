import React from "react";
// import NavStyles from "./Nav.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionsTypes"

function Nav(props) {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (props.auth.authData) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [props.auth])

    function handleLogOut(e) {
        e.preventDefault()

        dispatch({ type: LOGOUT })
    }
    return (
        <nav className=" backdrop-blur-3xl flex flex-col md:flex-row  z-10  items-center justify-between px-10 py-3  bg-black text-primary_text ">
            <div className="flex items-center justify-center h-fit">
                <h3 className="text-center text-white hidden md:block text-2xl">Project Mangement Tool</h3>
                {authenticated && <p>Welcome, {JSON.parse(localStorage.getItem("user_info"))?.result?.firstName}</p>}
            </div>
            <div className="flex justify-center items-center">
                {authenticated ?
                    <div className="">
                        <i class="fa-solid fa-user"></i>
                        <div className="flex items-center justify-center">
                            <span className="d-blcok">Account</span>
                            <div className="flex items-center justify-center space-x-5">
                                <Link className={`d-block `} to="/account/profile">Profile</Link>
                                <span className="">or</span>
                                <Link onClick={handleLogOut}  to="/">Logout</Link>
                            </div>

                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center space-x-10 bg-[#101113] lg:bg-black lg:text-white/40 px-4 py-3 rounded-full" >
                        <span className="text-lg"><i class="fa-solid fa-user"></i></span>
                        <div className="flex items-center justify-center space-x-10">
                            <span className="d-blcok">Account</span>
                            <div className="flex items-center justify-center space-x-10" >
                                <Link className={`d-block `} to="/account/login">Login</Link>
                                {/* <span >or</span> */}
                                <Link  to="account/signup">Singup</Link>
                            </div>

                        </div>
                    </div>
                }

            </div>

        </nav>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Nav);
import React from "react";
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../../api";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionsTypes"

function Dashboard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [dashboardData, setDashboardData] = useState({});
    useEffect(() => {
        async function getData() {
            try {
                if (props.auth.authData) {
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                    dispatch({ type: LOGOUT })
                    throw new Error("Log in again")
                }
                const { data } = await getDashboardData();
                setDashboardData(data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])
    return (
        <>
            {!authenticated && <>You are not logged in</>}
            {dashboardData?.projectData && dashboardData?.projectData.map(singleProject => <>
                <div key={singleProject.projectId} onClick={() => { navigate(`/project?projectId=${singleProject.projectId}`) }}>
                    <h2>
                        {singleProject.projectTitle}
                    </h2>
                    <p>{singleProject.projectDescription}</p>
                </div>
            </>)}
        </>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Dashboard);
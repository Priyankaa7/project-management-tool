import React from "react";
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData, postNewProject } from "../../api";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionsTypes"
import Hero from "../hero"
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Dashboard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const customStyle = {
    content: {
      height: "400px",
      width: "300px",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  function getRandomColorClass() {
    const colors = ['from-red-950', 'from-blue-950', 'from-green-950', 'from-yellow-950', 'from-indigo-950', 'from-purple-950', 'from-pink-950'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function getData() {
      try {
        if (props.auth.authData) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
        const { data } = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    if (props.auth.authData) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [props?.auth?.authData])

  async function createNewProject(e) {
    e.preventDefault()
    const response = await postNewProject(formData);
    navigate(`/project?projectId=${response.data.projectId}`)
  }

  return (
    <div>
      {!authenticated && <><Hero /></>}
      {authenticated && (
        dashboardData?.projectData && dashboardData.projectData.length > 0 ? (
          <div className="h-screen overflow-y-scroll">
            <div className="bg-black md:my-5 md:py-10 p-5 space-y-10 md:px-40 md:mx-10 flex flex-col md:flex-row md:justify-between items-center">
              <h1 className="w-fit text-7xl text-primary_text font-bold underline underline-offset-8 decoration-brand">Projects</h1>
              <div className="w-fit">
                <input className="bg-black border-[1px] border-white/30 outline-none p-2 rounded w-80 text-sm text-secondary" type="search" placeholder="Search Projects..." />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 grid grid-cols-1">
              {dashboardData.projectData.map(singleProject => (
                <div className="p-5 md:p-0 text-primary_text" key={singleProject.projectId} onClick={() => { navigate(`/project?projectId=${singleProject.projectId}`) }}>
                  <div className={` ${getRandomColorClass()} cursor-pointer to-black bg-gradient-to-b  py-4 px-5 border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4`}>
                    <h2 className="capitalize text-3xl">
                      {singleProject.projectTitle}
                    </h2>
                    <p className="text-sm text-secondary">{singleProject.projectDescription}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={openModal}>Open Modal</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyle}>
              <h1>Create a new project</h1>
              <form onSubmit={e => createNewProject(e)}>
                <p>Project Title</p>
                <input type="text" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} value={formData.title} />
                <p>Project Description</p>
                <input type="text" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} value={formData.description} />
                <button type="submit">Create Project</button>
              </form>
            </Modal>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen bg-black">
            <p className="text-2xl text-primary_text underline underline-offset-8 decoration-brand underline-2">You do not have any projects.</p>
          </div>
        )
      )}
    </div>
  )
}

const mapStateToProps = state => ({auth: state.auth });

  export default connect(mapStateToProps)(Dashboard);
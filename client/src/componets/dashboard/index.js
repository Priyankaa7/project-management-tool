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
        dashboardData?.projectData ? (
          <div className="h-screen overflow-y-scroll">
            <div className="bg-black md:my-5 md:py-10 p-5 space-y-10 md:px-40 md:mx-10 flex flex-col md:flex-row md:justify-between items-center">
              <h1 className="w-fit text-7xl text-primary_text font-bold underline underline-offset-8 decoration-brand">Projects</h1>
              <div className="w-fit">
                <input className="bg-black border-[1px] border-white/30 outline-none p-2 rounded w-80 text-sm text-secondary" type="search" placeholder="Search Projects..." />
              </div>
            </div>
            <div className="flex items-center justify-center px-5 my-10">
              <button className="text-primary_text border-2 hover:bg-brand hover:text-primary_text shadow-inner shadow-brand border-white/20 rounded-full px-4 py-2 font-bold text-lg " onClick={openModal}>Add Project + </button>
            </div>
            <div className="lg:grid lg:grid-cols-4 md:grid-cols-3 grid grid-cols-1  ">
              {dashboardData.projectData.length > 0 && dashboardData.projectData.map(singleProject => (
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
            
            <div className="relative h-screen hidden">
              <Modal className="font-[poppins] bg-[#101113] border-2 border-white/10 text-primary_text h-fit w-fit content-center py-5 px-3 rounded-2xl flex flex-col items-center justify-center space-y-8" isOpen={isOpen} onRequestClose={closeModal}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color (black) with transparency
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  content: {
                    backgroundColor: "#101113", // Modal container background color
                  },
                }}
              >

                <h1 className="text-2xl lg:text-3xl underline underline-offset-8 decoration-brand px-3 ">Create a Project</h1>
                <form className="flex flex-col items-center justify-center space-y-8" onSubmit={e => createNewProject(e)}>
                  <div className="space-y-2 w-full">
                    <p className="text-form_text text-sm">Project Title</p>
                    <input className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" type="text" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} value={formData.title} />
                  </div>
                  <div className="space-y-2 w-full">
                    <p className="text-form_text text-sm">Project Description</p>
                    <input className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" type="text" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} value={formData.description} />
                  </div>
                  <button className="text-black text-lg font-semibold bg-white px-3 py-2 rounded" type="submit">Create Project</button>
                </form>
              </Modal>
            </div>
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

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Dashboard);
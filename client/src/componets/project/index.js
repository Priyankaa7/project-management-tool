import React from "react";
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjectData, postNewTask } from "../../api";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionsTypes"
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Project(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [authenticated, setAuthenticated] = useState(false);
    const [projectData, setProjectData] = useState({});
    const [board, setBoard] = useState({
        columns: [
            {
                id: 1,
                title: "To Do",
                backgroundColor: "#fff",
                cards: []
            },
            {
                id: 2,
                title: "In Progress",
                cards: []
            },
            {
                id: 3,
                title: "Done",
                cards: []
            }
        ]
    })
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: ""
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

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    async function createNewTask(e) {
        e.preventDefault();
        const response = await postNewTask({ ...formData, projectId: params.projectId });
        setIsOpen(false)
        const projectId = params.projectId || "";
        const { data } = await getProjectData(projectId);
        setProjectData(data);
        let columns = [...board.columns] || [];
        data.tasks.forEach((task) => {
            const columnIndex = columns.findIndex((column) => column.title === task.status);
            if (columnIndex !== -1) {
                columns[columnIndex].cards.push({
                    id: task?._id, title: task?.title, description: (<>
                        <div>
                            <p>{task?.description}</p>
                            <p>Assigned to {task?.assignedTo?.firstName} {task?.assignedTo?.lastName}</p>
                            <p>Due on {task?.deadline}</p>
                        </div>
                    </>)
                });
            }
        });
        setBoard({ columns: [...columns] })
    }

    useEffect(() => {
        async function getData() {
            try {
                if (props.auth.authData) {
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                }
                const projectId = params.projectId || "";
                const { data } = await getProjectData(projectId);
                setProjectData(data);
                let columns = [...board.columns] || [];
                data.tasks.forEach((task) => {
                    const columnIndex = columns.findIndex((column) => column.title === task.status);
                    if (columnIndex !== -1) {
                        columns[columnIndex].cards.push({
                            id: task?._id, title: task?.title, description: (<>
                                <div>
                                    <p className="">{task?.description}</p>
                                    <p>Assigned to {task?.assignedTo?.firstName} {task?.assignedTo?.lastName}</p>
                                    <p>Due on {task?.deadline}</p>
                                </div>
                            </>)
                        });
                    }
                });
                setBoard({ columns: [...columns] })
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
    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);
    }
    useEffect(() => {
        // console.log({board})
    }, [board])
    return (
        <div className="p-5 h-full space-y-40 flex flex-col items-center justify-center">
            {!authenticated ? <>You are not logged in</> : <>
                <div className="text-primary_text flex flex-col space-y-2 p-20 space-y- rounded-2xl border-[1px] border-white/20 bg-cover   w-3/4 bg-[url('../public/bg1.jpg')]">
                    <h1 className="w-fit text-5xl capitalize ">{projectData?.title}</h1>
                    <p className="w-fit text-secondary">{projectData?.description}</p>
                    <br />
                    <div className="flex items-center justify-start space-x-5">
                    <p className="w-fit px-3 py-2 border-2 border-white/10 rounded bg-black" > {projectData?.admin?.firstName} {projectData?.admin?.lastName}</p>
                    <button className="text-primary_text border-2 hover:bg-brand hover:text-primary_text  border-white/20 rounded px-4 py-2 font-bold text-lg" onClick={openModal}>Add Task</button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full space-y-10">
                    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                        {board}
                    </Board>
                    <Modal
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
                        className="font-[poppins] bg-[#101113] border-2 border-white/10 text-primary_text h-fit w-fit content-center py-5 px-5 rounded-2xl flex flex-col items-center justify-center space-y-8" isOpen={isOpen} onRequestClose={closeModal} >
                        <h1 className="text-2xl lg:text-3xl underline underline-offset-8 decoration-brand px-3  ">New Task</h1>
                        <form className="flex flex-col items-center justify-center space-y-8 w-full" onSubmit={e => createNewTask(e)}>
                            <div className="space-y-2 w-full">
                                <p className="text-form_text text-sm">Task Title</p>
                                <input className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" type="text" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} value={formData.title} />
                            </div>
                            <div className="space-y-2 w-full">
                                <p className="text-form_text text-sm">Task Description</p>
                                <input className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10" type="text" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} value={formData.description} />
                            </div>
                            <div className="space-y-2 w-full">
                                <p className="text-form_text text-sm">Deadline</p>
                                <input
                                    className="w-full p-2 text-primary_text outline-none focus:border-white/50 rounded bg-transparent border-[1px] border-white/10"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                    format="dd-MM-yyyy"
                                    placeholder="dd-mm-yyyy"
                                />
                            </div>
                            <br />
                            <button className="text-black text-lg font-semibold bg-white px-3 py-2 rounded" type="submit">Create Task</button>
                        </form>
                    </Modal>
                </div>
            </>}
        </div>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Project);
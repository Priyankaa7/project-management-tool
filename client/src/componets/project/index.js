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
                    dispatch({ type: LOGOUT })
                    throw new Error("Log in again")
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
                                    <p>{task?.description}</p>
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
    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);
    }
    useEffect(() => {
        // console.log({board})
    }, [board])
    return (
        <div className="p-5 ">
            {!authenticated ? <>You are not logged in</> : <>
                <div className="text-primary_text flex flex-col  p-20 space-y- rounded-2xl border-[1px] border-white/20 ">
                    <h1 className="w-fit text-5xl capitalize ">{projectData?.title}</h1>
                    <p className="w-fit">{projectData?.description}</p>
                    <br />
                    <p className="w-fit">By {projectData?.admin?.firstName} {projectData?.admin?.lastName}</p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                        {board}
                    </Board>
                    <button onClick={openModal}>Open Modal</button>
                    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyle}>
                        <h1>Create a new task</h1>
                        <form onSubmit={e => createNewTask(e)}>
                            <p>Task Title</p>
                            <input type="text" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} value={formData.title} />
                            <p>Task Description</p>
                            <input type="text" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} value={formData.description} />
                            <p>Deadline</p>
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                format="dd-MM-yyyy"
                                placeholder="dd-mm-yyyy"
                            />
                            <br />
                            <button type="submit">Create Task</button>
                        </form>
                    </Modal>
                </div>
            </>}
        </div>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Project);
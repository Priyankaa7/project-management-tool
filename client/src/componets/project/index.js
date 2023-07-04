import React from "react";
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjectData } from "../../api";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionsTypes"
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

function Project(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                const urlSearchParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlSearchParams.entries());
                const projectId = params.projectId || "";
                const { data } = await getProjectData(projectId);
                setProjectData(data);
                let columns = [...board.columns] || [];
                data.tasks.forEach((task) => {
                    const columnIndex = columns.findIndex((column) => column.title === task.status);
                    if (columnIndex !== -1) {
                        columns[columnIndex].cards.push({ id: task?._id, title: task?.title, description: (<>
                            <div>
                                <p>{task?.description}</p>
                                <p>Assigned to { task?.assignedTo?.firstName } { task?.assignedTo?.lastName }</p>
                                <p>Due on {task?.deadline}</p>
                            </div>
                        </>) });
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
        <>
            {!authenticated ? <>You are not logged in</> : <>
                <div>
                    <h1>{projectData?.title}</h1>
                    <p>{projectData?.description}</p>
                    <br />
                    <p>By {projectData?.admin?.firstName} {projectData?.admin?.lastName}</p>
                </div>
                <div>
                    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                        {board}
                    </Board>
                </div>
            </>}
        </>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Project);
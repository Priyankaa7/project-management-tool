import axios from "axios"

const API = axios.create({baseURL: process.env.REACT_APP_BASE_URL})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info")).token}`
    }
    return req;
})

export const signIn = (data) => API.post("/users/signin", data)
export const signInGoogle = (accessToken) => API.post("/users/signin", {
    googleAccessToken: accessToken
})

export const signUp = (data) => API.post("/users/signup", data)
export const signUpGoogle = (accessToken) => API.post("/users/signup", {
    googleAccessToken: accessToken
})

export const getDashboardData = async () => await API.get("/dashboard");
export const getProjectData = async (projectId) => await API.get(`/project/${projectId}`);
export const postNewProject = async (projectData) => await API.post(`/project`, {...projectData})
export const postNewTask = async (taskData) => await API.post(`/task`, {...taskData})

export default API;
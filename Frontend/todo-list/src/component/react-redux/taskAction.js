import {
    Get_task_Request, Get_task_Success, Get_task_Fail,
    Get_task_Details_Request, Get_task_Details_Success, Get_task_Details_Fail,
    Get_task_Remove_Request,Get_task_Remove_Success,Get_task_Remove_Fail
} from "../react-redux/constant"
import axios from "axios"
// import { useParams } from "react-router-dom";

// Here we need to make function in function because i need to make dispatch function they use async function.
export const workAction = (task) => async (dispatch) => {
    try {
        console.log(task)
        dispatch({ type: Get_task_Request })
        const { data } = await axios.post('http://localhost:27017/api/task/add',task, { withCredentials: true });
        console.log(data)
        dispatch({
            type: Get_task_Success,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: Get_task_Fail,
            payload: error.response
        });
    };
};



export const workDetailsAction = () => async (dispatch) => {
    try {
        dispatch({ type: Get_task_Details_Request })
        const { data } = await axios.get('http://localhost:27017/api/task/alltasks', { withCredentials: true })
        console.log(data)
        dispatch({
            type: Get_task_Details_Success,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: Get_task_Details_Fail,
            payload: error.response
        })
    }
}

export const taskRemove = (id) => async (dispatch) => {
    try {
        console.log(id)
        dispatch({ type: Get_task_Remove_Request })
        const { data } = await axios.delete(`http://localhost:27017/api/task/remove/${id}`, { withCredentials: true })
        dispatch({
            type: Get_task_Remove_Success,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: Get_task_Remove_Fail,
            payload: error.response
        })
    }
}







import React, { useEffect, useState } from 'react'
import Taskcard from './Taskcard';
import { useDispatch, useSelector } from 'react-redux';
import { workAction } from '../react-redux/taskAction'
import { workDetailsAction } from '../react-redux/taskAction'
// import axios from 'axios';

const Tasktable = () => {
    const dispatch = useDispatch();
    const taskdetails = useSelector(state => state.taskdetails)
    const { loading, task, error } = taskdetails
    console.log(task)
    const [Task, setTask] = useState({
        description: '', category: ''
    })

    // const [task, settask] = useState({})
    // console.log(task)


    const handlechange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setTask({ ...Task, [name]: value })
    }



    useEffect(() => {
        // getdetails()
        dispatch(workDetailsAction())

    }, [dispatch])

    // const getdetails = async()=>{
    //     try{
    //         const { data } = await axios.get('http://localhost:27017/api/task/alltasks', { withCredentials: true })
    //         console.log(data)
    //         settask(data)
    //     }catch(error){
    //         console.log(error)
    //     }
    // } 

    const postTask = async (e) => {
        e.preventDefault();
        try {
            dispatch(workAction(Task))

            // const data = await axios.post('http://localhost:27017/api/Task/add',Task,{withCredentials:true})
            // console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (<>
        {loading ? (<h1>loading...</h1>) : 
            (<>
                <div className='container mt-5'>
                    <h6>Add Work</h6>
                    <hr className="mt-0 mb-4" />
                    <form className="row g-3">
                        <div className="col-auto">
                            <label className="visually-hidden">Description</label>
                            <input name="description" type="text" className="form-control" value={Task.description} onChange={handlechange} placeholder="Add your work in list" />
                        </div>
                        <div className="col-auto">
                            <label className="visually-hidden"></label>
                            <input name="category" type="text" className="form-control" value={Task.category} onChange={handlechange} placeholder="category" />
                        </div>
                        <div className="col-auto">
                            <button type="btn" className="btn btn-primary mb-3" onClick={postTask}>Add work</button>
                        </div>
                    </form>
                    <h6>Work</h6>
                    <hr className="mt-0 mb-4" />
                    <h4>Description: {Task.description}</h4>
                    <h4 className='mb-4'>Category: {Task.category}</h4>
                    {/* This is the work right bottom container  */}
                    <h6>User Work</h6>
                    <hr className="mt-0 mb-4 mt-3" />
                    <div className='row '>
                        {/* {task.map((task) => {
                            return (
                                <Taskcard task={task} />
                            );
                        })} */}
                        <Taskcard task={task} />
                    </div>
                </div>
            </>)}
    </>
    )
}

export default Tasktable
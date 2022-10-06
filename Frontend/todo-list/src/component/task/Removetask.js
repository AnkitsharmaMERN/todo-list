import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { taskRemove } from '../react-redux/taskAction';

function Removetask() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id)

useEffect(()=>{
    if(id){
        console.log(id)
        dispatch(taskRemove(id))
        navigate('/addtask')
    }else{
        console.log("id not found")
    }
   
},[dispatch])
   


// const postdata = async () => {
       
    // }
  
//     return (
//     <div className='row'>
//     <div className='col'>
//         <h1>Description</h1>
//         <p>{task.description}</p>
//     </div>
//     <div className='col'>
//         <h1>category</h1>
//         <p>{task.category}</p>
//     </div>
//     <div className='col'>
//     <button type='btn' className='btn btn-primary mb-3' onClick={postdata}>Delete work</button>
//     </div>
//   )
}

export default Removetask
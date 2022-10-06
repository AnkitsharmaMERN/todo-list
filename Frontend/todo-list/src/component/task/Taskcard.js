import { Link } from 'react-router-dom'


function Taskcard({ task }) {
    
    console.log(task._id)
    // console.log(task.id)
   
    return (
        <div className='row'>
            <div className='col'>
                <h1>Description</h1>
                <p>{task.description}</p>
            </div>
            <div className='col'>
                <h1>category</h1>
                <p>{task.category}</p>
            </div>
            <div className='col'>
            <Link to={`/removepage/${task._id}`} className="btn btn-primary"> delete work</Link>
            </div>
        </div>
    )
}

export default Taskcard
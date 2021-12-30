import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useNavigate} from 'react-router-dom';

const Todo = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskInput, setTask] = useState({
        task: "",
        date: "",
        error_list: [],
    });
    //handleInput function
    const handleInput = (e) => {
        e.persist();
        setTask({...taskInput, [e.target.name]: e.target.value});
    };
    //saving the form inputs when onSubmit is called
    const saveTask = (e) => {
        e.preventDefault();
        const data = {
            task: taskInput.task,
            date: taskInput.date,
        }
        axios.post(`api/savetask`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setTask({
                    task:"",
                    date: "",
                    error_list: "",
                });
                //navigate("/savetask")
            }
            else if (res.data.status === 422) {
                setTask({...taskInput, error_list: res.data.validate_err})
            }
        })
    };
    useEffect(()=> {
        axios.get(`api/tasks`).then(res=> {
            if(res['status']===200) {
                setTasks(res.data.tasks);
                setLoading(false);
                navigate("/savetask")
            }
        })
    }, [navigate]); 
    const deleteTask = (e, id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        delClick.innertext = "Deleting";

        axios.delete(`api/deletetask/${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                delClick.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                delClick.innerText = "Delete";
            }
        });
    }
    if (loading) {
        return <h4>Loading Task Data</h4>
    }
    else {
        var tasks_HTMLTABLE="";
        tasks_HTMLTABLE = tasks.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.task}</td>
                <td>{item.date}</td>
                <td><Link to={`edittask/${item.id}`} className='btn btn-success btn-sm'>EDIT</Link></td>
                <td ><button type='button' className="btn btn-danger btn-sm" onClick={(e) => deleteTask(e, item.id)}>DELETE</button></td>  
            </tr>)
        });
    };
    return (
        <div className='container'>
            <div className='card'>
                <div className='card-header'>Todo List
                    <Link to={"/"} className='btn btn-sm float-end'>BACK</Link>
                </div>
                <div className='card-body'>
                    <form className='row g-3' onSubmit={saveTask}>
                    <div className='col-md-5 form-group mb-3'>
                            <label htmlFor='task' className='form-label'>Input Task</label>
                            <input type='text' className='form-control' name='task' onChange={handleInput} value={taskInput.task} required/>
                            <span className='text-danger'>{taskInput.error_list.task}</span> 
                    </div>
                    <div className='col-md-5 form-group mb-3'>
                            <label htmlFor='date' className='form-label'>Input Date</label>
                            <input type='date' className='form-control' name='date' onChange={handleInput} value={taskInput.date} min='2021-12-30' required/>
                            <span className='text-danger'>{taskInput.error_list.date}</span>
                    </div>
                    <div className='col-md-2 '>
                            <button type='submit' className='btn btn-light btn-outline-success btn-md mt-3'>SAVE</button>
                    </div>
                                       
                    </form>{<br></br>}
                    <div className='table-responsive'>
                        <table className='table table-bordered table-responsive'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tasks</th>
                                        <th>Date</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks_HTMLTABLE}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo


import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Link, useNavigate} from 'react-router-dom';

const Thoughts = () => {
    const navigate = useNavigate();
    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thoughtInput, setThought] = useState({
        idea: "",
        date: "",
        error_list: [],
    });
    //handleInput function
    const handleInput = (e) => {
        e.persist();
        setThought({...thoughtInput, [e.target.name]: e.target.value});
    };
    //saving the form inputs when onSubmit is called
    const saveThought = (e) => {
        e.preventDefault();
        const data = {
            idea: thoughtInput.idea,
            date: thoughtInput.date,
        }
        axios.post(`api/savethought`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setThought({
                    idea:"",
                    date: "",
                    error_list: "",
                });
                //navigate("/savetask")
            }
            else if (res.data.status === 422) {
                setThought({...thoughtInput, error_list: res.data.validate_err})
            }
        })
    };
    useEffect(()=> {
        axios.get(`api/thoughts`).then(res=> {
            if(res['status']===200) {
                setThoughts(res.data.thoughts);
                setLoading(false);
                navigate("/savethought")
            }
        })
    }, [navigate]); 
    const deleteThought = (e, id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        delClick.innertext = "Deleting";

        axios.delete(`api/deletethought/${id}`).then(res => {
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
        return <h4>Loading Thought Data</h4>
    }
    else {
        var thoughts_HTMLTABLE="";
        thoughts_HTMLTABLE = thoughts.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.idea}</td>
                <td>{item.date}</td>
                <td><Link to={`editthought/${item.id}`} className='btn btn-success btn-sm'>EDIT</Link></td>
                <td ><button type='button' className="btn btn-danger btn-sm" onClick={(e) => deleteThought(e, item.id)}>DELETE</button></td>  
            </tr>)
        });
    };
    return (
        <div className='container'>
            <div className='card'>
                <div className='card-header'>Realization List
                    <Link to={"/"} className='btn btn-sm float-end'>BACK</Link>
                </div>
                <div className='card-body'>
                    <form className='row g-3' onSubmit={saveThought}>
                    <div className='col-md-5 form-group mb-3'>
                            <label htmlFor='idea' className='form-label'>Input Thoughts</label>
                            <input type='text' className='form-control' name='idea' onChange={handleInput} value={thoughtInput.idea} required/>
                            <span className='text-danger'>{thoughtInput.error_list.idea}</span> 
                    </div>
                    <div className='col-md-5 form-group mb-3'>
                            <label htmlFor='date' className='form-label'>Input Date</label>
                            <input type='date' className='form-control' name='date' onChange={handleInput} value={thoughtInput.date} min='2021-12-30' required/>
                            <span className='text-danger'>{thoughtInput.error_list.date}</span>
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
                                        <th>Thoughts</th>
                                        <th>Date</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {thoughts_HTMLTABLE}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thoughts

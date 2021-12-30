import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditThought = () => {
    const navigate = useNavigate();
    const [thoughtInput, setThought] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();

    const handleInput = (e) => {
        e.persist();
        setThought({...thoughtInput, [e.target.name]: e.target.value});
    }
    //calling the edit form when edit button clicked
    useEffect (()=>{
        const thought_id = id;
        axios.get(`api/editthought/${thought_id}`).then(res => {
            if (res.data.status === 200) {
                setThought(res.data.thought);
                setLoading(false);
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'Error');
                navigate('/savethought');
            }
        });
    }, [navigate, id]);
    //updating the task in the form
    const updateThought = (e) => {
        e.preventDefault();
        const data = {
            idea: thoughtInput.idea,
            date: thoughtInput.date,
        }
        
        axios.put(`api/updatethought/${id}`, data).then(res=> {
            if (res.data.status === 200) {
                swal("Success", res.data.message)
                setError([]);
            }
            else if (res.data.status === 422) {
                swal ('All fields are mandatory', '');
                setError(res.data.validationError);
            }
        });
    };
    if (loading) {
        return <h4>Loading Edit Task Input</h4>
    }
    return (
    <div className='container'>
        <div className='card'>
            <div className='card-header'>Edit Thought List
                <Link to={"/savethought"} className='btn btn-sm float-end'>BACK</Link>
            </div>
            <div className='card-body'>
                <form className='row g-3' onSubmit={updateThought}>
                <div className='col-md-5 form-group mb-3'>
                        <label htmlFor='idea' className='form-label'>Input Task</label>
                        <input type='text' className='form-control' name='idea' onChange={handleInput} value={thoughtInput.idea} required />
                        <span className='text-danger'>{errorInput.idea}</span> 
                </div>
                <div className='col-md-5 form-group mb-3'>
                        <label htmlFor='date' className='form-label'>Input Date</label>
                        <input type='date' className='form-control' name='date' onChange={handleInput} value={thoughtInput.date} min='2021-12-30' required />
                        <span className='text-danger'>{errorInput.date}</span>
                </div>
                <div className='col-md-2 '>
                        <button type='submit' className='btn btn-light btn-outline-success btn-md mt-3'>Update Thought List</button>
                </div>              
                </form>{<br></br>}
            </div>
        </div>
    </div>
    )
}

export default EditThought

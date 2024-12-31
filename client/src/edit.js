import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useNavigate, useParams } from "react-router-dom";
 function Edit(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:'',
        name:'',
        password:''
    })

    const handlerEdit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:4000/update/${id}`,user)
        .then(()=>{
            navigate('/show')
        })
        .catch((err)=>console.log("Error Found updating the user"))    
    }

    useEffect(()=>{
        axios.get(`http://localhost:4000/edit/${id}`)
        .then((res)=>setUser(res.data))
        .catch((err)=>console.log(err))
    },[id])

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return(
    <>
     <div className="container">
        <div className="form-container">
            <h1>Edit Details</h1>
            <form onSubmit={handlerEdit}>
                <div className="input-box">
                    <input className="form-control" type="email" required value={user.email} name="email" onChange={handleChange} placeholder="enter your mail"/>
                </div>
                <div className="input-box">
                     <input className="form-control" type="text" required value={user.name} name="name" onChange={handleChange} placeholder="enter your name"/>                   
                </div>
                <div className="input-box">
                     <input className="form-control" type="password" required value={user.password} name="password" onChange={handleChange} placeholder="update your password"/>                   
                </div>
                <div className="submit">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
     </div>
    </>
    )
 }
 export default Edit;
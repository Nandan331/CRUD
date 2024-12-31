import React from "react";
import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './login.css'
import { Link } from "react-router-dom";
function Login(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handlerLogin=(e)=>{
        e.preventDefault();

        fetch('http://localhost:4000/login/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.message === 'Signed in Successfull'){
                console.log(data.message || data);
                alert("Signed in")
            }else{
                alert(data.message)
            }
        })
        .catch((err)=>console.log('Found Error: ',err))
    }
 return(
    <>
    <div className="container">
        <div className="form-container">
        <h1>Login</h1>
            <form onSubmit={handlerLogin}>
                <div className="input-box">
                    <input className="form-control" type="email" required placeholder="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><i className="bi bi-envelope-fill"></i>
                </div>
                <div className="input-box">
                    <input className="form-control" type="password" required placeholder="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><i className="bi bi-lock-fill"></i>
                </div>
                <div className="button">
                    <input className="btn btn-primary" type="submit"/>
                </div>
                <h6>Don't have an account</h6>
                <div className="button">
                    <button className="btn btn-success">
                        <Link className="signup" to='/sign_up'>Signup</Link>
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
 )
}

export default Login;
import React, { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlerSignin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/sign_up/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name:username, password }) // Use name instead of username
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data); // Log the response
            alert(data.message || data);
        })
        .catch((err) => console.log("Found error: ", err));
    }

    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h1>Signup</h1>
                    <form onSubmit={handlerSignin}>
                        <div className="input-box">
                            <input className="form-control" type="email" name="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <i className="bi bi-envelope-fill"></i>
                        </div>
                        <div className="input-box">
                            <input className="form-control" type="text" name="username" required placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="input-box">
                            <input className="form-control" type="password" name="password" required placeholder="create password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <i className="bi bi-lock-fill"></i>
                        </div>
                        <div className="remember-me">
                            <label>
                                <input type="checkbox" /> remember me
                            </label>
                        </div>
                        <div className="button-signup">
                            <input className="btn btn-primary" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;

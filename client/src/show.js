import React, { useState, useEffect } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";

function Show() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/show/")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Delete user function
    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user._id !== id));
            })
            .catch((err) => console.error("Error found to delete User:", err));
    };

    return (
        <div className="container">
            <table className="table" style={{border:'2px solid black',borderCollapse:'collapse'}}>
                    <tr style={{border:'2px solid black'}}>
                        <th>Id</th>
                        <th>email</th>
                        <th>Name</th>
                        <th>password</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user._id} style={{border:'2px solid black'}}>
                            <td>{user._id}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.password}</td>
                            <td>
                                <Link to={`/edit/${user._id}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}

export default Show;

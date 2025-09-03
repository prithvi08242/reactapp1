import { useState } from "react";
import { validatePassword, validateUsername } from "../Utils/utils";
import Header from "../common/Header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

function Login() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [usernameError, setUsernameError] = useState("");
    let [passwordError, setPasswordError] = useState("");


    function handleUsernameChange(e) {
        setUsername(e.target.value);
        // console.log(username);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        // console.log(password);
    }

      async function handleLogin(e) {
        let errors = 0;
        if (!validateUsername(username)) {
            errors++;
            setUsernameError("Username must be atleast 3 characeters")
        } else {
            setUsernameError("")
        }

         if (!validatePassword(password)) {
            errors++;
            setPasswordError("Password must be atleast 8 characters")
        } else {
            setPasswordError("")
        }

        if(errors > 0) return;

        const authRequest = {
            username,
            password
        }
        try {
            // ES6 Features - Destrucing Data in JavaScript
            const response  = await axios.post("http://localhost:8059/api/authenticate",authRequest); // jwtToken
            const {data,status} =  response;
            const decodedToken = jwtDecode(data.jwtToken);
            const usrname = decodedToken.sub;
           
            const userResponse = await axios.get(`http://localhost:8050/api/users/username/${usrname}`);
            localStorage.setItem("accessToken",data.jwtToken);
            localStorage.setItem("user",JSON.stringify(userResponse.data));

            toast.success("Login Successfull Redirecting...")
            window.location = "/products";
        }catch(error){

        }

    }


    return (
        <div className="container-fluid">
            <Header/>
            <div className="row justify-content-center mt-5">
                <div className="col-4 border shadow p-3">
                    <h1>Login Form</h1>
                    <div className="mt-3">
                        <label>Username</label>
                        <input type="text" placeholder="Username" className="form-control" onChange={e => handleUsernameChange(e)} />
                        <div className="text-danger">{usernameError}</div>
                    </div>
                    <div className="mt-3">
                        <label>Password</label>
                        <input type="password" placeholder="Password" className="form-control" onChange={e => handlePasswordChange(e)} />
                        <div className="text-danger">{passwordError}</div>
                    </div>

                    <div className="d-grid mt-3">
                        <button className="btn btn-warning" onClick={e => handleLogin(e)}>Login</button>
                    </div>
                    <div className="d-grid mt-3">
                        
                        <a href="/register" className="btn btn-success">Register</a>
                    </div>


                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000}/>
        </div>
    )
}

export default Login;

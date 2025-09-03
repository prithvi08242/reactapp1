import { useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "../Utils/utils";
import Header from "../common/Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function Signup() {

    // useState - React Hook

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [mobile, SetMobile] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [role, setRole] = useState("ROLE_USER");

    let [firstNameError, setFirstNameError] = useState("");
    let [lastNameError, setLastNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [usernameError, setUsernameError] = useState("");
    let [mobileError, setMobilemeError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    function handleFirstNameChange(event) {
        console.log(event)
        setFirstName(event.target.value);
        console.log(event.target.value);
        console.log(firstName);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
        // console.log(lastName);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        //console.log(email);
    }

    function handleMobileChange(e) {
        SetMobile(e.target.value);
        // console.log(mobile);
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        // console.log(username);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        // console.log(password);
    }

    async function handleRegister(e) {
        let errorCount = 0;

        if (firstName.length < 3) {
            console.log("firstname if condtion executed")
            setFirstNameError("FirstName should be greather than 3 characters")
            errorCount++;
        } else {
            console.log("firstname else condtion executed")
            setFirstNameError("")
        }

        if (lastName.length < 1) {
            setLastNameError("Last Name is required")
            errorCount++;
        } else {
            setLastNameError("")
        }

        if (!validateEmail(email)) {
            errorCount++;
            setEmailError("Invalid Email Address")
        } else {
            setEmailError("")
        }

        if (mobile.length < 10) {
            errorCount++;
            setMobilemeError("Mobile number  must be atleast 10 digits")
        } else {
            setMobilemeError("")
        }

        if (!validateUsername(username)) {
            errorCount++;
            setUsernameError("Username must be atleast 3 characeters")
        } else {
            setUsernameError("")
        }

        if (!validatePassword(password)) {
            errorCount++;
            setPasswordError("Password must be atleast 8 characters")
        } else {
            setPasswordError("")
        }

        if (errorCount > 0) return;

        const userRequest = {
            firstName,
            lastName,
            email,
            phone: mobile,
            credential: {
                username,
                password,
                roleBasedAuthority: role
            }
        }

        try {
            let response = await axios.post("http://localhost:8050/api/users", userRequest);
            console.log(response);
            if (response.status === 201) {
                toast.success("User registereted succesfully");
                console.log("User registereted succesfully");

                setTimeout(() => {
                    window.location = "/login";
                }, 1500);
            }
        } catch (e) {
            console.log(e);
            if (e.response.status === 500) {
                console.log("Username already exists");
                toast.error("Username already exists");
            } else {
                console.log("UnExpected Error");
                toast.error("UnExpected Error");
            }
        }

    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="row justify-content-center mt-5">
                <div className="col-4 border shadow p-3">
                    <h3>Account Signup</h3>
                    <div className="mt-3">
                        <label>FirstName</label>
                        <input type="text" placeholder="First Name" onChange={event => handleFirstNameChange(event)} className="form-control" />
                        <div className="text-danger">{firstNameError}</div>
                    </div>
                    <div className="mt-3">
                        <label>LastName</label>
                        <input type="text" placeholder="Last Name" className="form-control" onChange={e => handleLastNameChange(e)} />
                        <div className="text-danger">{lastNameError}</div>
                    </div>
                    <div className="mt-3">
                        <label>Email</label>
                        <input type="text" placeholder="Email Address" className="form-control" onChange={e => handleEmailChange(e)} />
                        <div className="text-danger">{emailError}</div>
                    </div>
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
                    <div className="mt-3">
                        <label>Mobile Number</label>
                        <input type="number" placeholder="Mobile Number" className="form-control" onChange={e => handleMobileChange(e)} />
                        <div className="text-danger">{mobileError}</div>
                    </div>
                    <div className="mt-3">
                        <label>Role</label>
                        <select className="form-select"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </div>
                    <div className="d-grid mt-3">
                        <button className="btn btn-success" onClick={e => handleRegister(e)}>Register</button>
                    </div>

                    <div className="d-grid mt-3">
                        
                        <a href="/login" className="btn btn-warning">Login</a>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000}/>
        </div>
    )
}

export default Signup;
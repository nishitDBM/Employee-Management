import React, { useState } from "react"
import "./register.css"

import instance from "../../api/apiConfig"

import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async () => {
        const { name, email, password, reEnterPassword } = user;
      
        let body = {
          name,
          email,
          password,
          reEnterPassword
        };
      
        console.log("this is user", body);
      
        if (name && email && password && password === reEnterPassword) {
          try {
            const response = await instance.post("/register", body);
            console.log(response)
            // alert(response.data.message);
            history.push("/login");
          } catch (error) {
            console.error(error);
            alert("An error occurred during registration.");
          }
        } else {
          alert("Invalid input");
        }
      };

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register
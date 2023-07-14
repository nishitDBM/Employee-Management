import React, { useState } from "react"
import "./register.css"

// import instance from "../../api/apiConfig"
import axios from "axios"

import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
       
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async () => {
      const { name, email, password } = user;
    
      let body = {
        name,
        email,
        password
        
      };
    
      console.log("this is user", body);
    
      if (name && email && password ) {
        try {
          const response = await axios.post("http://localhost:9000/userRegister", body);
          console.log("this  is the response",response.data)
          history.push("/login");
          alert("register sucessfully")
        } catch (error) {
          console.log(error);
        
        }
      } 
    };

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
           
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Register
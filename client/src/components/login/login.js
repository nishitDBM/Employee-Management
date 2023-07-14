import React, {useState} from "react"
import "./login.css"
import { useHistory } from "react-router-dom"
import axios from "axios"


const Login = ({ updateUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {
        const { email, password } = user;
        let body = {
          email,
          password
          
        };
           try {
        
           const response = await axios.post("http://localhost:9000/userLogin", body)       
            console.log(response)
            // history.push("/")
        } catch (error) {
            console.log(error)
        }
         
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login
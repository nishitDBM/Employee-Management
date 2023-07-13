import React, {useState} from "react"
import "./login.css"
import instance from "../../api/apiConfig"
import { useHistory } from "react-router-dom"

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
           try {
        
           const response = await instance.post("/register", user)       
            alert(response.data.message)
            
            history.push("/")
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
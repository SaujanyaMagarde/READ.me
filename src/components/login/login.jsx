import React,{useState} from "react";
import {Link,useNavigate} from 'react-router'
import {login as authlogin} from '../../store/authSlice'
import {Logo,Button,Input} from '../index'
import { useDispatch }  from "react-redux";
import service from "../../Appwrite/services";
import Authservice from '../../Appwrite/auth'
import {useForm} from 'react-hook-form'
import './login.css'
function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")
    const login = async(data)=>{
        setError("")
        try{
            const session = await Authservice.Login(data)
            if(session){
                const userData = await Authservice.GetCurrentuser()
                if(userData) dispatch(authlogin(userData))
                navigate("/")
            }
        }
        catch(error){
            setError(error.message);
        }
    }
    return (
        <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login to your account</h2>
        <p className="login-subtitle">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="login-link">
            Sign Up
          </Link>
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="login-form">
          <div className="form-fields">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            <Button type="submit" className="login-button">
            Sign in
          </Button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default Login
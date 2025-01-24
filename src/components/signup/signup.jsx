import React,{useState} from "react";
import {Link,useNavigate} from 'react-router'
import {login as authlogin} from '../../store/authSlice'
import {Logo,Button,Input} from '../index'
import { useDispatch }  from "react-redux";
import service from "../../Appwrite/services";
import Authservice from '../../Appwrite/auth'
import {useForm} from 'react-hook-form'
import './signup.css'

function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")

    const create = async(data)=>{
        setError("")
        try{
           const userdata =  await Authservice.CreateAccount(data)
           if(userdata){
            const  userdata = await Authservice.GetCurrentuser()
            if(userdata) dispatch(authlogin(userdata));
            navigate("/")
           }
        }
        catch(error){
            setError(error.message);
        }
    }
    return(
        <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign up to create account</h2>
        <p className="signup-subtitle">
          Already have an account?&nbsp;
          <Link to="/login" className="signup-link">
            Sign In
          </Link>
        </p>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="signup-form">
          <div className="form-fields">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register('name', {
                required: true,
              })}
            />
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
          </div>
            <button type="submit" class="signup-button">
        Create Account
      </button>
        </form>
      </div>
    </div>
    )
}

export default Signup
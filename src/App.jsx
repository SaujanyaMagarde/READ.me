import { useState,useEffect  } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import Conf from './Appwrite/configuration'
import Authservice from './Appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header} from './components/index'
import {Footer} from './components/index'
import {Outlet} from 'react-router'
function App() {
  const [loading,setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    Authservice.GetCurrentuser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error('Error during authentication check:', error);
    })
    .finally(()=>setloading(false))
  },[])
  
  if(loading){
    return (
      <div>Loading....</div>
    )
  }
  return(
    <div className='hero'>
      <div className='main2'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App

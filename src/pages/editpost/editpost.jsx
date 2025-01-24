import React, { useEffect, useState } from 'react'
import {useNavigate,useParams} from 'react-router'
import service from '../../Appwrite/services'
import {Container,Postform} from '../../components'
import './editpost.css'
function Editpost() {
    const [post,setposts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setposts(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post? (
    <div className='w-full responsive-padding'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : null
}

export default Editpost
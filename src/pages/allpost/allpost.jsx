import React, {useState,useEffect} from 'react'
import service from '../../Appwrite/services'
import {Container,Postcard} from '../../components'
import './allpost.css'
function Allpost() {
    const [posts,setposts] = useState([])
    useEffect(()=>{},[])
        service.getPostall([]).then((posts) =>{
            if(posts){
                setposts(posts.documents)
            }
        })
  return (
    <div className="post-list">
        <Container>
            <div className="posts-wrapper">
                {posts.map((post)=>(
                    <div key={post.$id} className='post-card-wrapper'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Allpost
import React,{useEffect,useState} from 'react'
import service from '../../Appwrite/services'
import {Container,Postcard} from '../../components'
import './home.css'
function Home(){
    const [posts,setPosts]  = useState([])

    useEffect(()=>{
        service.getPostall().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    if(posts.length === 0){
        return (
            <div className="login-section">
            <Container>
                <div className="login-wrapper">
                    <div className="login-content">
                        <h1 className="login-title">
                            LOGIN TO READ POSTS
                        </h1>
                    </div>
                </div>
            </Container>
            </div>
        )
    }
    return (
        <div className="post-list-section">
            <Container>
                <div className="post-list-wrapper">
                    {posts.map((post) => (
                        <div key={post.$id} className="post-item">
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default Home
import React from 'react'
import service from '../../Appwrite/services'
import {Link} from 'react-router'
import './postcard.css'
function Postcard({$id,title,Featured_image}){
    return (
        <Link to={`/post/${$id}`} className="post-card-link">
            <div className="post-card">
                <div className="image-container">
                        <img 
                        src={service.getFilepreview(Featured_image)} alt={title} className="image"
                        />
                </div>
                <h2 className="title">{title}</h2>
            </div>
        </Link>
    )

}

export default Postcard
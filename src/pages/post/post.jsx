import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import service from "../../Appwrite/services";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./Post.css"; // Import custom CSS

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="post-container">
            <Container>
                <div className="post-image-wrapper">
                    <img
                        src={service.getFilepreview(post.Featured_image)}
                        alt={post.title}
                        className="post-image"
                    />
                    {isAuthor && (
                        <div className="post-controls">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="post-edit-btn">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="post-delete-btn">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="post-title-wrapper">
                    <h1 className="post-title">{post.title}</h1>
                </div>
                <div className="post-content">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}

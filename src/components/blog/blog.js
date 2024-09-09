import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Blog.css';

function Blog() {
    const [viewContent, setViewContent] = useState([]);
    const navigate = useNavigate();

    const boardUpdate = () => {
        Axios.get('https://tabewo-server.vercel.app/api/get')
            .then((res) => {
                setViewContent(res.data);
            });
    };

    useEffect(() => {
        boardUpdate();
    }, []);

    const deletePost = (id) => {
        const confirmDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
        if (confirmDelete) {
            Axios.delete(`https://tabewo-server.vercel.app/api/delete/${id}`)
                .then(() => {
                    boardUpdate();
                });
        }
    };

    const editPost = (post) => {
        navigate('/blog/edit', { state: post });
    };

    return (
        <div className="container">
            <Link to="/blog/add">
                <button className="showFormButton">등록</button>
            </Link>
            
            <div className="listContainer">
                {viewContent.map((post, index) => {
                    return (
                        <div key={index} className='listBox'>
                            <div className="listHeader">
                                <p className="listIndex">{index + 1}</p>
                                <p className="listDate">{post.date}</p>
                            </div>
                            {post.image && <img src={`https://tabewo-server.vercel.app/${post.image}`} alt="Post" />} {/* 이미지 표시 */}
                            <p className="listTitle">{post.title}</p>
                            <p className="listContent">{post.content}</p>
                            <div className="buttonContainer">
                                <button onClick={() => editPost(post)}>수정</button>
                                <button onClick={() => deletePost(post.id)}>삭제</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Blog;

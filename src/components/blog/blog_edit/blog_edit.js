import Axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Blog.css';

function BlogEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const [boardContent, setBoardContent] = useState({
        id: location.state.id,
        title: location.state.title,
        content: location.state.content
    });

    const updatePost = () => {
        Axios.put('http://localhost:8081/api/update', {
            id: boardContent.id,
            title: boardContent.title,
            content: boardContent.content
        })
        .then(() => {
            navigate('/blog');  // 수정 후 /blog로 리다이렉트
        });
    };

    const getValue = (e) => {
        const { name, value } = e.target;
        setBoardContent({
            ...boardContent,
            [name]: value
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updatePost();
        }
    };

    return (
        <div className="container">
            <div className='addListBox'>
                <input 
                    placeholder='제목' 
                    onChange={getValue} 
                    name='title' 
                    value={boardContent.title}
                    onKeyPress={handleKeyPress} 
                />
                <input 
                    placeholder='내용' 
                    onChange={getValue} 
                    name='content' 
                    value={boardContent.content}
                    onKeyPress={handleKeyPress} 
                />
                <button onClick={updatePost}>수정</button>
            </div>
        </div>
    );
}

export default BlogEdit;

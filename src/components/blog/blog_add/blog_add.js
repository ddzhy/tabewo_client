import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Blog.css';

function BlogAdd() {
    const [boardContent, setBoardContent] = useState({
        title: '',
        content: ''
    });
    const [image, setImage] = useState(null); // 이미지 파일을 상태로 관리
    const navigate = useNavigate();

    const submitDate = new Date().toLocaleString();

    const submit = () => {
        const formData = new FormData();
        formData.append('title', boardContent.title);
        formData.append('content', boardContent.content);
        formData.append('date', submitDate);
        if (image) {
            formData.append('image', image); // 이미지 파일 추가
        }

        Axios.post('http://localhost:8081/api/insert', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            navigate('/blog');  // 등록 후 /blog로 리다이렉트
        });
    };

    const getValue = (e) => {
        const { name, value } = e.target;
        setBoardContent({
            ...boardContent,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // 선택한 파일을 이미지 상태로 설정
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <div className="container">
            <div className='addListBox'>
                <input 
                    placeholder='제목' 
                    onChange={getValue} 
                    name='title' 
                    onKeyPress={handleKeyPress} 
                />
                <input 
                    placeholder='내용' 
                    onChange={getValue} 
                    name='content' 
                    onKeyPress={handleKeyPress} 
                />
                <input 
                    type='file' 
                    accept='image/*' 
                    onChange={handleFileChange} 
                />
                <button onClick={submit}>등록</button>
            </div>
        </div>
    );
}

export default BlogAdd;

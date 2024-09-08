/* eslint-disable */


import React from 'react';
import './main.css'; // Assuming you use external CSS
import { useAuth } from "../AuthContext"
import { Link } from 'react-router-dom';

const HomePage = () => {
    const message = "Hello, Shall we get started?";

    const { isLoggedIn } = useAuth();


    return (
        <div className="home-page">
            {/* Top Navigation Bar */}
            <header className="top-bar">
                <div className="site-name">My Website</div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/">홈</a></li>
                        <li><a href="/annae">안내</a></li>
                        <li><a href="/workmate">워크메이트</a></li>
                        <li><a href="/workcontainer">워크컨테이너</a></li>
                        <li><a href="/blog">게시판</a></li>
                        {isLoggedIn ? <li><Link to="/mypage">마이페이지</Link></li> : <li><Link to="/login">로그인</Link></li>}
                        </ul>
                </nav>
            </header>

            {/* Centered Static Text */}
            <div className="center-content">
                <h1>{message}</h1>
            </div>
        </div>
    );
}

export default HomePage;

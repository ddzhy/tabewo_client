import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // AuthContext에서 useAuth 훅 가져오기
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기

const Mypage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { logout } = useAuth(); // logout 함수 가져오기
    const navigate = useNavigate(); // navigate 함수 가져오기

    useEffect(() => {
      // 서버로부터 사용자 데이터를 가져오는 함수
      const fetchUserData = async () => {
        try {
          const response = await axios.get('https://tabewo-server.vercel.app/mypage', {
            withCredentials: true, // 쿠키를 포함한 요청
          });
          
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setUserData(response.data);
          }
        } catch (err) {
          setError('Failed to fetch user data');
        }
      };

      fetchUserData();
    }, []);

    const handleLogout = async () => {
      try {
        await logout(); // 로그아웃 함수 호출
        navigate('/'); // 홈 페이지로 리다이렉트
      } catch (err) {
        console.error('Logout failed', err);
      }
    };

    if (error) {
      return <div>{error}</div>;
    }

    if (!userData) {
      return <div>Loading...</div>;
    }

  return (
    <div className="container mt-4">
      <h2>마이 페이지</h2>
      <p>이름: {userData.name}</p>
      <p>이메일: {userData.email}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Mypage;

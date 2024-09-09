import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Loading from '../Loading'; // Loading 컴포넌트 import
import "./Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (!validationErrors.email && !validationErrors.password) {
            setIsLoading(true);
            axios.post(`https://tabewo-server.vercel.app/login`, values)
                .then(res => {
                    if (res.data === "Success") {
                        login(); 
                        navigate('/'); // 로그인 성공 시 홈으로 이동
                    } else {
                        console.log(res.data); // 서버로부터 받은 응답 메시지 표시
                        alert("회원정보가 존재하지 않습니다")
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }
    };
    

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            {isLoading ? ( // 로딩 중이면 Loading 컴포넌트 표시
                <Loading />
            ) : (
                <>
                    <div className="login-header">
                    <i
                        className="header-icon"
                        onClick={navigateToHome}
                    >
                        <FontAwesomeIcon icon={faHouseUser} />
                    </i>
                    </div>
                    <div className="login-box">
                        <h2 className="login-title">로그인</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor='email' className="input-label">이메일</label>
                                <input 
                                    type='email' 
                                    placeholder='Enter Email' 
                                    name='email' 
                                    className="input-field"
                                    onChange={handleInput} 
                                />
                                {errors.email && <span className='error-text'>{errors.email}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor='password' className="input-label">비밀번호</label>
                                <div className="input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter Password" 
                                        name="password" 
                                        className="input-field with-icon" 
                                        onChange={e => setValues({...values, password: e.target.value})} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={showPassword ? faEyeSlash : faEye} 
                                        className="password-icon" 
                                        onClick={togglePasswordVisibility} 
                                    />
                                </div>
                                {errors.password && <span className='error-text'>{errors.password}</span>}
                            </div>
                            <button type='submit' className="login-button">로그인</button>
                            <p className="terms-text">당사의 약관 및 정책에 동의합니다</p> 
                            <Link to="/signup" className="signup-link">계정이 없으신가요? 회원가입</Link>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;

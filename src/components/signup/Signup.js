import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import Loading from "../Loading"; // Loading 컴포넌트 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Signup.css"

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);

        if (validationErrors.length > 0) {
            if (currentErrorIndex < validationErrors.length) {
                alert(validationErrors[currentErrorIndex]);
                setCurrentErrorIndex(prevIndex => prevIndex + 1);
            }
        } else {
            setIsLoading(true); // 회원가입 요청 시작 시 로딩 상태로 전환
            axios.post(`https://tabewo-server.vercel.app/signup`, values)
                .then(res => {
                    navigate('/login');
                    console.log(res)
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false)); // 요청이 끝나면 로딩 상태 해제
        }
    };

    const handleResetErrors = () => {
        setErrors([]);
        setCurrentErrorIndex(0);
    };

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div className="signup-container">
            {isLoading ? ( // 로딩 중이면 Loading 컴포넌트 표시
                <Loading />
            ) : (
                <>
                    <div className="signup-header">
                    <i
                        className="header-icon"
                        onClick={navigateToHome}
                    >
                        <FontAwesomeIcon icon={faHouseUser} />
                    </i>
                    </div>
                    <div className="signup-box">
                        <h2 className="signup-title">회원가입</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="name" className="input-label">이름</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Name" 
                                    name="name" 
                                    className="input-field" 
                                    onChange={e => setValues({...values, name: e.target.value})} 
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor="email" className="input-label">이메일</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Email" 
                                    name="email" 
                                    className="input-field" 
                                    onChange={e => setValues({...values, email: e.target.value})} 
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor="password" className="input-label">비밀번호</label>
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
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirmPassword" className="input-label">비밀번호 확인</label>
                                <div className="input-container">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Confirm Password" 
                                        name="confirmPassword" 
                                        className="input-field with-icon" 
                                        onChange={handleInput} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={showConfirmPassword ? faEyeSlash : faEye} 
                                        className="password-icon" 
                                        onClick={toggleConfirmPasswordVisibility} 
                                    />
                                </div>
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                            <button 
                                type="submit" 
                                className="signup-button"
                                onClick={handleResetErrors} // 오류 리셋 버튼 클릭 시 오류 인덱스 리셋
                            >
                                회원가입
                            </button>
                            <p className="terms-text">당사의 약관 및 정책에 동의합니다</p>
                            <Link to="/login" className="login-link">계정이 이미 있으신가요? 로그인</Link>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Signup;

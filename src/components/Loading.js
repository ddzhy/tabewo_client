import React from "react";
import Spinner from "./assets/loding_spinner.gif"
const Loading = () => {
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // 화면 전체 높이 사용
    flexDirection: "column", // 텍스트와 스피너를 수직 정렬
  };

  const spinnerStyle = {
    width: "100px", // 스피너 크기 조정 (원하는 크기로 변경 가능)
    height: "100px",
  };

  const textStyle = {
    fontSize: "1.5rem", // 텍스트 크기 조정
    marginBottom: "20px", // 텍스트와 스피너 사이의 간격 조정
  };

  return (
    <div style={loadingStyle}>
      <h3 style={textStyle}>잠시만 기다려주세요.</h3>
      <img src={Spinner} alt="로딩" style={spinnerStyle} />
    </div>
  );
};

export default Loading;
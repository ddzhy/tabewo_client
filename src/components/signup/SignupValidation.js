function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.name === "") {
        alert("이름은 1자리 이상 입력해야 합니다")
    } else {
        error.name = "";
    }

    if (values.email === "") {
        alert("이메일은 1자리 이상 입력해야 합니다")
    } else if (!email_pattern.test(values.email)) {
        alert("정확한 이메일이 아닙니다")
    } else {
        error.email = "";
    }

    if (values.password === "") {
        alert("비밀번호는 1자리 이상 입력해야 합니다")
    } else if (!password_pattern.test(values.password)) {
        alert("비밀번호는 8자리 이상, 대문자와 소문자, 숫자를 포함하고 특수문자는 입력할 수 없습니다")
    } else {
        error.password = "";
    }

    // Confirm Password validation
    if (values.confirmPassword === "") {
        alert("비밀번호 확인을 해주세요")
    } else if (values.confirmPassword !== values.password) {
        alert("비밀번호가 동일하지 않습니다")

    } else {
        error.confirmPassword = "";
    }

    return error;
}

export default Validation;

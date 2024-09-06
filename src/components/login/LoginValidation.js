function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
        alert("이메일은 1자리 이상 입력해야 합니다")
    }
    else if(!email_pattern.test(values.email)) {
        alert("이메일이 틀립니다")
    }else {
        error.email = ""
    }

    if(values.password === "") {
        alert("비밀번호는 1자리 이상 입력해야 합니다")
    }
    else if(!password_pattern.test(values.password)) {
        alert("비밀번호가 틀립니다")
    } else {
        error.password = ""
    }
    return error;
}

export default Validation;
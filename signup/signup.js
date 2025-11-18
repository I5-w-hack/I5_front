
document.addEventListener("DOMContentLoaded", () => {

 
    const signupForm = document.getElementById("signup-form");
    
    // 입력창 4개
    const usermailInput = document.getElementById("usermail");
    const useridInput = document.getElementById("userid");
    const userpwInput = document.getElementById("userpw");
    const userpwReInput = document.getElementById("userpw_re");

    // 에러 메시지 4개
    const emailError = document.getElementById("email-error");
    const idError = document.getElementById("id-error");
    const pwError = document.getElementById("pw-error");
    const pwReError = document.getElementById("pw-re-error");

    
    // 2. '회원가입' 버튼을 눌렀을 때(submit) 실행될 함수를 등록합니다.
    signupForm.addEventListener("submit", (event) => {
        
        event.preventDefault(); 
        
        // (B) 검사하기 전에 모든 에러 메시지를 깨끗하게 지움.
        emailError.textContent = "";
        idError.textContent = "";
        pwError.textContent = "";
        pwReError.textContent = "";

        // 모든 검사가 통과했는지 기억할 변수
        let isValid = true; 


        // 1. 이메일 검사
        if (usermailInput.value === "") {
            emailError.textContent = "이메일을 입력해 주세요.";
            isValid = false; // 실패
        }

        // 2. 아이디 검사
        if (useridInput.value === "") {
            idError.textContent = "아이디를 입력해 주세요.";
            isValid = false;
        }

        // 3. 비밀번호 검사
        if (userpwInput.value === "") {
            pwError.textContent = "비밀번호를 입력해 주세요.";
            isValid = false;
        }

        // 4. 비밀번호 확인 검사
        if (userpwReInput.value === "") {
            pwReError.textContent = "비밀번호 확인을 입력해 주세요.";
            isValid = false;
        } 
        // 5. 비밀번호 일치 검사 (단, 둘 다 비어있지 않을 때만)
        else if (userpwInput.value !== "" && userpwReInput.value !== "") {
            if (userpwInput.value !== userpwReInput.value) {
                pwReError.textContent = "비밀번호가 일치하지 않습니다.";
                isValid = false;
            }
        }


        //  isValid 변수가 true라면 
        if (isValid) {
            alert("회원가입 성공!");

        }
        
    });
});
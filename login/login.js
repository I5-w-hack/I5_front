
document.addEventListener('DOMContentLoaded', function() {


    const idInput = document.getElementById('userid');
    const pwInput = document.getElementById('userpw');
    const loginButton = document.querySelector('.login-button');

    loginButton.addEventListener('click', function(event) {
        
    
        // .value: input 태그에 현재 입력된 텍스트 값
        // .trim(): 문자열 앞뒤의 불필요한 공백을 제거.

        const idValue = idInput.value.trim();
        const pwValue = pwInput.value.trim();

        // 아이디 유효성 검사
        if (idValue === "") {
            
            event.preventDefault(); 
            
            alert('아이디를 입력해주세요.');
            idInput.focus(); // 아이디 입력창에 다시 포커스를 줌. (사용자 편의)
            return; 
        }

        // 비밀번호 유효성 검사
        if (pwValue === "") {

            // 공백일 경우 폼 전송을 막음.
            event.preventDefault(); 
            
            alert('비밀번호를 입력해주세요.');
            pwInput.focus(); // 비밀번호 입력창에 포커스
            return; 
        }
        
        //event.preventDefault(); // (임시) 성공 알림을 보기 위해 새로고침 방지
        //alert('로그인 성공! (임시)');

    });
});
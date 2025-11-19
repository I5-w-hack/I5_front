document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 선택
    const options = document.querySelectorAll('.option-btn');
    const nextButton = document.querySelector('.next-btn');
    const closeBtn = document.querySelector('.close-btn');

    // === 타이머 및 진행 표시줄 요소 ===
    const timerDisplay = document.querySelector('.timer');
    const progressBar = document.querySelector('.progress-bar');
    
    // === 타이머 설정 ===
    const TOTAL_TIME_SECONDS = 180; // 총 3분 (180초)
    let timeLeft = TOTAL_TIME_SECONDS;
    let timerInterval;

    // 임시 정답 설정 (예시로 세 번째 버튼을 정답으로 설정)
    // 실제 구현 시 서버에서 정답 인덱스를 받아와야 합니다.
    const correctAnswerIndex = 3; 
    
    // --- 시간 포맷팅 함수 ---
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // --- 타이머 시작 함수 ---
    const startTimer = () => {
        // 초기 시간 표시 및 진행률 설정 (타이머 시작 전 100% 상태로 표시)
        timerDisplay.textContent = formatTime(timeLeft);
        progressBar.style.width = '100%';

        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "0:00";
                progressBar.style.width = '0%';
                console.log("시간 종료! 퀴즈 자동 제출 처리.");
                // 여기에 시간 종료 시 처리할 로직을 추가합니다.
                return;
            }

            timeLeft--;

            // 1. 시간 표시 업데이트 
            timerDisplay.textContent = formatTime(timeLeft);

            // 2. 진행 표시줄 업데이트 (줄어들게 설정)
            const progressPercentage = (timeLeft / TOTAL_TIME_SECONDS) * 100;
            progressBar.style.width = `${progressPercentage}%`;

        }, 1000); // 1초마다 실행
    };

    // --- 초기화 및 시작 ---
    // 페이지 로드 시 타이머 시작
    startTimer(); 

    // --- 1. 닫기 버튼 이벤트 ---
    closeButton.addEventListener('click', () => {
        // alert/confirm 대신 커스텀 모달 사용 권장
        if (confirm("퀴즈를 종료하고 메인 화면으로 돌아가시겠습니까?")) {
            clearInterval(timerInterval); // 타이머 중지
            console.log("퀴즈 종료 및 메인으로 이동");
            // window.location.href = '/main'; 
        }
    });


    // --- 2. 선택지 버튼 이벤트 ---
    options.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 이미 답을 선택했는지 확인 (다중 클릭 방지)
            if (document.querySelector('.options-section .correct') || document.querySelector('.options-section .wrong')) {
                return; 
            }

            const isCorrect = (index + 1) === correctAnswerIndex;

            // 피드백 클래스 적용
            if (isCorrect) {
                button.classList.add('correct');
                console.log('정답!');
            } else {
                button.classList.add('wrong');
                // 정답도 함께 표시
                options[correctAnswerIndex - 1].classList.add('correct'); 
                console.log('오답!');
            }
            
            // 다음 문제 버튼 활성화
            nextButton.disabled = false;
        });
    });
    
    // --- 3. 다음 문제 버튼 이벤트 (타이머 초기화 로직 포함) ---
    nextButton.addEventListener('click', () => {
        console.log("다음 문제로 넘어갑니다. 타이머 초기화.");
        
        // 1. UI 초기화 (버튼 색상/상태)
        options.forEach(btn => {
            btn.classList.remove('correct', 'wrong');
        });
        nextButton.disabled = true;
        
        // 2. 기존 타이머 중지
        clearInterval(timerInterval);
        
        // 3. 남은 시간(timeLeft)을 초기값으로 재설정
        timeLeft = TOTAL_TIME_SECONDS;
        
        // 4. 타이머 다시 시작
        startTimer();
    });

    // 초기 상태 설정
    nextButton.disabled = true;
});
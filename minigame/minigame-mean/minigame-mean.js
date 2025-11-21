document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-btn');
    const progressFill = document.querySelector('.progress-fill');
    const optionBtns = document.querySelectorAll('.option-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // 타이머 표시용 요소를 JS에서 동적으로 추가
    const header = document.querySelector('.header');
    const timerEl = document.createElement('span');
    timerEl.className = 'timer';
    timerEl.textContent = '00:00';
    header.appendChild(timerEl);  // header 안에 타이머 추가
    
    // 게임 설정
    const totalTime = 30; // 30초
    let elapsedTime = 0;
    let selectedOption = null;
    let timerId = null;
    
    // setTimeout을 이용한 타이머 (1초마다 반복)
    function startTimer() {
        timerId = setTimeout(function tick() {
            elapsedTime++;
            
            // 시간 표시 업데이트
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            // 프로그레스 바 업데이트 (왼쪽→오른쪽으로 증가)
            const progress = (elapsedTime / totalTime) * 100;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            
            // 시간 종료 체크
            if (elapsedTime >= totalTime) {
                alert('시간이 종료되었습니다!');
                return;
            }
            
            // 다음 1초 후 다시 실행
            timerId = setTimeout(tick, 1000);
        }, 1000);
    }
    
    // 타이머 시작
    startTimer();
    
    // 옵션 버튼 클릭
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 기존 선택 제거
            optionBtns.forEach(b => b.classList.remove('selected'));
            // 새로운 선택
            btn.classList.add('selected');
            selectedOption = btn.dataset.option;
        });
    });
    
    // 다음 문제 버튼
    submitBtn.addEventListener('click', () => {
        if (!selectedOption) {
            alert('답을 선택해주세요!');
            return;
        }
        
        // 여기에 정답 체크 로직 추가 가능
        // 예: if (selectedOption === correctAnswer) { ... }
        
        alert(`${selectedOption}번을 선택했습니다!`);
        
        // 선택 초기화
        optionBtns.forEach(b => b.classList.remove('selected'));
        selectedOption = null;
    });
    
    // 닫기 버튼
    closeBtn.addEventListener('click', () => {
        clearTimeout(timerId);
        if (confirm('퀴즈를 종료하시겠습니까?')) {
            // 종료 로직 (페이지 이동 등)
            window.history.back();
        } else {
            // 타이머 다시 시작
            startTimer();
        }
    });
});

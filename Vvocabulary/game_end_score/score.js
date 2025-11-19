// DOM 요소
const closeBtn = document.getElementById('closeBtn');
const retryBtn = document.getElementById('retryBtn');
const scoreNumber = document.getElementById('scoreNumber');
const progressFill = document.getElementById('progressFill');
const timerDisplay = document.getElementById('timer');

// 결과 데이터 (실제로는 이전 페이지에서 전달받을 데이터)
let finalScore = 80;
let elapsedTime = 180; // 3분 = 180초 사용했다고 가정

// 초기화
function init() {
    // 점수 표시
    displayScore();
    
    // 진행률 0으로 설정 (완료 상태)
    progressFill.style.width = '0%';
    
    // 경과 시간 표시
    displayElapsedTime();
}

// 점수 애니메이션과 함께 표시
function displayScore() {
    let currentScore = 0;
    const increment = finalScore / 50; // 50프레임에 걸쳐 애니메이션
    
    const scoreInterval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(scoreInterval);
        }
        scoreNumber.textContent = Math.round(currentScore);
    }, 20);
}

// 경과 시간 표시
function displayElapsedTime() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.querySelector('span').textContent = timeText;
}

// 닫기 버튼
closeBtn.addEventListener('click', () => {
    if (confirm('결과 화면을 닫으시겠습니까?')) {
        window.close();
    }
});

// 다시 도전하기 버튼
retryBtn.addEventListener('click', () => {
    // 퀴즈 페이지로 이동 (index.html로 이동)
    window.location.href = 'index.html';
});

// 로컬 스토리지에서 결과 데이터 가져오기 (선택사항)
function loadResultData() {
    const savedScore = localStorage.getItem('quizScore');
    const savedTime = localStorage.getItem('elapsedTime');
    
    if (savedScore) {
        finalScore = parseInt(savedScore);
    }
    if (savedTime) {
        elapsedTime = parseInt(savedTime);
    }
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    loadResultData();
    init();
});
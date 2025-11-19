// 샘플 단어 데이터
const words = [
    { word: "단어", meaning: "말의 뜻을 나타내는 최소 단위" },
    { word: "학습", meaning: "배워서 익힘" },
    { word: "진행", meaning: "일이 앞으로 나아감" },
    { word: "완성", meaning: "완전하게 이루어 냄" },
    { word: "시작", meaning: "어떤 일이나 행동의 처음 단계" }
];

let currentWordIndex = 0;
let timeLeft = 180; // 3:00 in seconds
let timerInterval;

// DOM 요소
const wordTitle = document.getElementById('wordTitle');
const answerInput = document.getElementById('answerInput');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');
const progressFill = document.getElementById('progressFill');
const timerDisplay = document.getElementById('timer');

// 초기화
function init() {
    displayWord();
    startTimer();
    updateProgress();
}

// 단어 표시
function displayWord() {
    if (currentWordIndex < words.length) {
        wordTitle.textContent = words[currentWordIndex].word;
        answerInput.value = '';
        answerInput.focus();
    } else {
        wordTitle.textContent = '완료!';
        answerInput.style.display = 'none';
        nextBtn.textContent = '다시 시작';
    }
}

// 타이머 시작
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('시간이 종료되었습니다!');
        }
    }, 1000);
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// 진행률 업데이트 (100%에서 시작해서 줄어듦)
function updateProgress() {
    const progress = ((words.length - currentWordIndex) / words.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// 다음 버튼 클릭
nextBtn.addEventListener('click', () => {
    if (currentWordIndex >= words.length) {
        // 재시작
        currentWordIndex = 0;
        timeLeft = 180;
        answerInput.style.display = 'block';
        nextBtn.textContent = '다음 문제';
        clearInterval(timerInterval);
        startTimer();
        displayWord();
        updateProgress();
    } else {
        const userAnswer = answerInput.value.trim();
        
        if (userAnswer === '') {
            alert('답을 입력해주세요!');
            return;
        }
        
        // 다음 문제로 이동
        currentWordIndex++;
        displayWord();
        updateProgress();
    }
});

// 닫기 버튼
closeBtn.addEventListener('click', () => {
    if (confirm('학습을 종료하시겠습니까?')) {
        clearInterval(timerInterval);
        window.close();
    }
});

// Enter 키로 다음 문제 (Shift+Enter는 줄바꿈)
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        nextBtn.click();
    }
});

// 페이지 로드 시 초기화
init();
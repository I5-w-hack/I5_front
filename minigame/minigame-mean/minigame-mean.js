// 진행률 업데이트
let progress = 0;
const progressFill = document.querySelector('.progress-fill');

function updateProgress(value) {
    progress = value;
    progressFill.style.width = progress + '%';
}

// 초기 진행률 설정
updateProgress(30);
// 시간 바 설정
let totalTime=161;
let remaining=totalTime;
const timelabel=document.getElementById('timelabel');
const progresser=document.getElementById('progresser');

const timer=setInterval(()=>{
    if(remainingTime<=0){
        clearInterval(timer);
        timelabel.textContent="0:00";
        progressBar.style.width="0%";
        return;
    }
    remainingTime--;

    // 시간 (분,초)
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeLabel.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // 진행 업데이트
    const progressPercentage = (remainingTime / totalTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;

}, 1000);


// 옵션 버튼 클릭 이벤트
const optionBtns = document.querySelectorAll('.option-btn');
let selectedOption = null;

optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 이전 선택 해제
        optionBtns.forEach(b => b.classList.remove('selected'));
        
        // 현재 버튼 선택
        this.classList.add('selected');
        selectedOption = this.dataset.option;
    });
});

// 다음 문제 버튼 클릭 이벤트
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function() {
    if (selectedOption) {
        // 진행률 증가
        updateProgress(progress + 25);
        
        // 선택 초기화
        optionBtns.forEach(btn => btn.classList.remove('selected'));
        selectedOption = null;
        
        // 여기에 다음 문제로 이동하는 로직 추가 가능
        console.log('다음 문제로 이동');
    } else {
        alert('답을 선택해주세요!');
    }
});

// 닫기 버튼 클릭 이벤트
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function() {
    if (confirm('퀴즈를 종료하시겠습니까?')) {
        // 여기에 페이지 닫기 또는 이전 페이지로 이동하는 로직 추가
        console.log('퀴즈 종료');
    }
});
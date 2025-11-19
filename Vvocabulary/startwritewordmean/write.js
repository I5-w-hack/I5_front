// DOM 요소 가져오기
const modalBackdrop = document.querySelector('.modal-backdrop');
const closeButton = document.querySelector('.close-button');
const startButton = document.querySelector('.start-button');

// 모달 닫기 함수
function closeModal() {
    modalBackdrop.style.display = 'none';
}


// 닫기 버튼 클릭 이벤트
closeButton.addEventListener('click', closeModal);

// 시작하기 버튼 클릭 이벤트
startButton.addEventListener('click', startGame);

// 모달 배경 클릭 시 닫기 (선택사항)
modalBackdrop.addEventListener('click', function(event) {
    // 모달 내용(content)을 클릭한 게 아니라 배경(backdrop)을 클릭한 경우에만 닫기
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

// ESC 키를 눌러도 모달 닫기 (선택사항)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 페이지 로드 시 모달 표시
window.addEventListener('load', function() {
    modalBackdrop.style.display = 'flex';
});
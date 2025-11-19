document.addEventListener('DOMContentLoaded', () => {
    // 1. 주요 요소 선택
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const closeButton = document.querySelector('.close-button');
    const startButton = document.querySelector('.start-button');
    
    // 모달을 숨기는 함수 정의
    const hideModal = () => {
        if (modalBackdrop) {
            // 모달 배경 전체를 숨깁니다.
            modalBackdrop.style.display = 'none';
            console.log("모달 창이 닫혔습니다.");
        }
    };

    // --- 닫기 버튼 이벤트 처리 ---
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    // --- ESC 키 이벤트 처리 (선택 사항) ---
    document.addEventListener('keydown', (event) => {
        // ESC 키(keyCode 27 또는 key 'Escape')를 눌렀을 때 모달 닫기
        if (event.key === 'Escape') {
            hideModal();
        }
    });

    // --- 시작하기 버튼 이벤트 처리 ---
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            // 실제 게임 시작 로직이 들어갈 부분입니다.
            console.log("게임 시작 버튼이 클릭되었습니다. 게임을 로드합니다.");
            
            // 필요하다면 모달을 닫습니다.
            // hideModal();
            
            // 게임 페이지로 이동하는 코드 (예시)
            // window.location.href = '/game/start';
        });
    }

    // (참고) 모달을 보이게 하려면 (예: 페이지 로드 시)
    // modalBackdrop.style.display = 'flex';
});
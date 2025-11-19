// 모달 표시/숨김 및 정렬 버튼/플래시카드 버튼 제어
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('startModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const startBtn = document.getElementById('startStudyBtn');
  const flashcardBtn = document.querySelector('.add-folder-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // ---- 정렬 버튼 활성화 ----
  filterBtns.forEach(btn => {
    btn.onclick = function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // 실제 정렬 함수 호출은 여기에 구현
    };
  });

  // 플래시카드로 보기 버튼 클릭 시 모달 오픈
  if (flashcardBtn) {
    flashcardBtn.onclick = function() {
      modal.style.display = "flex";
    };
  }

  // 닫기 버튼
  if (closeModalBtn) {
    closeModalBtn.onclick = function() {
      modal.style.display = "none";
    };
  }

  // 학습 시작하기 버튼
  if (startBtn) {
    startBtn.onclick = function() {
      modal.style.display = "none";
      // 학습 모드 진입 등 추가 행동은 여기에 작성
    };
  }
});
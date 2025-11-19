document.addEventListener('DOMContentLoaded', function() {
  // 정렬 버튼 활성화
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });

  // 플래시카드 모달 제어
  const flashcardModal = document.getElementById('flashcardModal');
  const flashcardBtn = document.querySelector('.add-folder-btn');

  // 단어/의미 관련 핸들
  let currentIndex = 0;
  let isMeaningShown = false;
  let words = [];

  // DOM 요소
  const prevBtn = document.getElementById('cardPrevBtn');
  const nextBtn = document.getElementById('cardNextBtn');
  const showMeaningBtn = document.getElementById('showMeaningBtn');
  const flashcardWord = document.querySelector('.flashcard-word');
  const flashcardHalf = document.querySelector('.flashcard-half');
  
  // 상세뜻 표시 영역 준비 (.flashcard-detail)
  let flashcardDetail = document.querySelector('.flashcard-detail');
  if (!flashcardDetail) {
    flashcardDetail = document.createElement('div');
    flashcardDetail.className = 'flashcard-detail';
    flashcardDetail.style.display = "none";
    // flashcardWord의 형제로 추가하여 중앙 정렬에 도움을 줍니다.
    flashcardWord.after(flashcardDetail);
  }

  // 1. 페이지 로드 시 단어 데이터를 읽어 모달을 바로 띄웁니다.
  function loadWordsAndOpenModal() {
    const cardNodes = document.querySelectorAll('.word-card');
    words = Array.from(cardNodes).map(card => {
      return {
        word: card.querySelector('.word-header')?.childNodes[0]?.textContent.trim() || "",
        meaning: card.querySelector('.word-detail')?.childNodes[0]?.textContent.trim() || "",
        detail: card.querySelector('.word-detail')?.innerHTML.split("<br>")[1]?.trim() || ""
      }
    });
    currentIndex = 0;
    isMeaningShown = false;
    renderFlashcard();
    flashcardModal.style.display = "flex";
  }
  
  // 페이지 로드 후 바로 실행
  loadWordsAndOpenModal();


  // 모달 바깥 클릭 시 닫기
  flashcardModal.addEventListener('mousedown', function(e) {
    if (e.target === flashcardModal) {
      flashcardModal.style.display = "none";
    }
  });

  // '플래시 카드로 보기' 버튼 클릭 시 모달 재오픈
  if (flashcardBtn) {
    flashcardBtn.onclick = function() {
      loadWordsAndOpenModal();
    };
  }

  function renderFlashcard() {
    if (words.length === 0) {
      flashcardWord.textContent = "단어 없음";
      flashcardHalf.style.display = "";
      flashcardDetail.style.display = "none";
      showMeaningBtn.disabled = true;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    showMeaningBtn.disabled = false;

    if (!isMeaningShown) {
      // 단어만 보이는 상태
      flashcardHalf.style.display = "";
      flashcardWord.textContent = words[currentIndex].word;
      showMeaningBtn.textContent = "의미보기 | SPACE";
      flashcardDetail.style.display = "none";
      // 단어 텍스트의 세로 위치 조정 (CSS에서 margin-top을 조정했다면 여기서는 추가 로직 불필요)
    } else {
      // 의미가 보이는 상태
      flashcardHalf.style.display = "none";
      flashcardWord.textContent = words[currentIndex].word;
      flashcardDetail.innerHTML =
        `<hr class="card-divider">
         <div class="meaning-content">${words[currentIndex].meaning}</div>`; // 상세 뜻의 첫 줄만 표시
      flashcardDetail.style.display = "";
      showMeaningBtn.textContent = "단어보기 | SPACE";
    }
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === words.length - 1);
  }

  if (showMeaningBtn) {
    showMeaningBtn.onclick = function() {
      if(words.length === 0) return;
      isMeaningShown = !isMeaningShown;
      renderFlashcard();
    };

    // SPACE 키로 의미보기 토글
    window.addEventListener('keydown', function(e) {
      if (flashcardModal.style.display === "flex" && (e.code === "Space" || e.key === " ")) {
        e.preventDefault();
        showMeaningBtn.click();
      }
    });
  }

  if (prevBtn) {
    prevBtn.onclick = function() {
      if (currentIndex > 0) {
        currentIndex--;
        isMeaningShown = false;
        renderFlashcard();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = function() {
      if (currentIndex < words.length - 1) {
        currentIndex++;
        isMeaningShown = false;
        renderFlashcard();
      }
    };
  }
});
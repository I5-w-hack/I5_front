let currentPage = 1;
const totalPages = 2;

// 페이지에 맞는 단어 표시
function displayWords(page) {
    const allCards = document.querySelectorAll('.word-card');
    
    allCards.forEach(card => {
        if (parseInt(card.dataset.page) === page) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 페이지 번호 버튼 생성
function createPageNumbers() {
    const pageNumbers = document.getElementById('pageNumbers');
    
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = 'page-number' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        pageNumbers.appendChild(pageBtn);
    }
    
    updateNavigationButtons();
}

// 특정 페이지로 이동
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayWords(currentPage);
    createPageNumbers();
    
    // 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 이전/다음 버튼 상태 업데이트
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    displayWords(currentPage);
    createPageNumbers();
    
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });
});

// 필터 버튼 기능
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
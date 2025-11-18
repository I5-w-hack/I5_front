document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const wordGrid = document.getElementById('wordGrid');
    const allCards = document.querySelectorAll('.word-card');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    // 페이지네이션
    let currentPage = 1;
    let totalPages = 0;

   
    function initFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
               
                filterButtons.forEach(btn => btn.classList.remove('active'));
               
                button.classList.add('active');
                
                
            });
        });
    }

   
    function initBookmarks() {
      
        wordGrid.addEventListener('click', (event) => {
        
            if (event.target.classList.contains('bookmark-icon')) {
                const icon = event.target;
                
              
                if (icon.textContent === '🔖') {
                    icon.textContent = ''; // 비어있는 상태 
                    icon.textContent = '🔖'; // 채워진 상태
                }
            }
        });
    }

  
   
     /* @param {number} page - 보여줄 페이지 번호
     */
    function showPage(page) {
        allCards.forEach(card => {
            // 카드의 data-page 속성값이 현재 페이지와 일치하는지 확인
            if (parseInt(card.dataset.page) === page) {
                card.style.display = ''; // CSS 그리드 기본값으로 복원
            } else {
                card.style.display = 'none'; 
            }
        });
    }

   
    function updateNavButtons() {
        // 현재 페이지가 1페이지면 '이전' 버튼 비활성화
        prevPageBtn.disabled = (currentPage === 1);
        // 현재 페이지가 마지막 페이지면 '다음' 버튼 비활성화
        nextPageBtn.disabled = (currentPage === totalPages);
    }

   
     /* @param {number} page - 이동할 페이지 번호
     */
    function goToPage(page) {
        // 페이지 범위 유효성 검사
        if (page < 1 || page > totalPages) return;
        
        currentPage = page; 
        showPage(currentPage);
        
        // 페이지 번호 버튼의 'active' 상태 업데이트
       
        document.querySelector('.page-number.active').classList.remove('active');
       
        document.querySelector(`.page-number[data-page-num="${currentPage}"]`).classList.add('active');
        
        updateNavButtons();
    }

    /**
     * 페이지네이션 초기 설정 함수
     */
    function initPagination() {
        // 1. 전체 페이지 수 계산
        
        totalPages = Math.max(...Array.from(allCards).map(card => parseInt(card.dataset.page || 1)));

      
        if (totalPages <= 1) {
            document.querySelector('.pagination').style.display = 'none';
            showPage(1); // 1페이지만 표시
            return;
        }

        // 2. '이전', '다음' 버튼 텍스트/이벤트 설정
        prevPageBtn.textContent = '<';
        nextPageBtn.textContent = '>';
        
        prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
        nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));

        // 3. 페이지 번호 버튼 동적 생성
        pageNumbersContainer.innerHTML = ''; // 기존 내용 초기화
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = 'page-number';
            pageBtn.dataset.pageNum = i;
            
            if (i === 1) {
                pageBtn.classList.add('active'); // 첫 페이지를 활성 상태로
            }
            
            // 각 페이지 번호 버튼에 클릭 이벤트 추가
            pageBtn.addEventListener('click', () => goToPage(i));
            pageNumbersContainer.appendChild(pageBtn);
        }

        //  초기 상태 설정 (1페이지 표시)
        showPage(1);
        updateNavButtons();
    }

   
    if (allCards.length > 0) {
        initPagination(); // 페이지네이션 초기화
    }
    initFilters(); // 필터 버튼 초기화
    initBookmarks(); // 북마크 기능 초기화

});
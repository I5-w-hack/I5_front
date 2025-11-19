document.addEventListener('DOMContentLoaded', () => {
    // 1. 게임 카드 요소들을 선택합니다.
    const gameCards = document.querySelectorAll('.game-card');

    // 2. 각 게임 카드에 클릭 이벤트를 추가합니다.
    gameCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // 기본 링크 이동 동작을 막습니다. (주석 처리하면 페이지 이동 시뮬레이션 가능)
            // e.preventDefault(); 
            
            const cardTitle = card.querySelector('h2').innerText.trim().replace(/\n/g, ' ');

            // 어떤 게임이 선택되었는지 콘솔에 출력
            console.log(`[게임 시작] "${cardTitle}" 게임이 선택되었습니다. 게임 페이지로 이동합니다.`);
            
            // 실제 페이지 이동 로직 (예: window.location.href = '/game/' + card.id;)
        });
    });

    // 3. 랭킹 버튼 요소를 선택합니다.
    const rankingButton = document.querySelector('.ranking-button');

    // 4. 랭킹 버튼에 클릭 이벤트를 추가합니다.
    if (rankingButton) {
        rankingButton.addEventListener('click', (e) => {
            // 기본 링크 이동 동작을 막습니다.
            // e.preventDefault(); 

            // 랭킹 페이지로 이동함을 콘솔에 출력
            console.log('[페이지 이동] 랭킹 페이지로 이동합니다.');
            
            // 실제 페이지 이동 로직 (예: window.location.href = '/ranking';)
        });
    }

    // (보너스) 검색 버튼 클릭 이벤트 처리
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            console.log(`[검색] "${query}"(으)로 검색을 시작합니다.`);
        });
    }
});
// 랭킹 데이터 생성
const rankingData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: 'Username',
    date: 'Date',
    score: 95
}));

// 랭킹 리스트 렌더링
function renderRankingList() {
    const rankingList = document.getElementById('rankingList');
    
    rankingList.innerHTML = rankingData.map(item => `
        <div class="ranking-item">
            <div class="user-info">
                <div class="avatar"></div>
                <div class="user-details">
                    <div class="username">${item.username}</div>
                    <div class="date">${item.date}</div>
                </div>
            </div>
            <div class="score">${item.score}</div>
        </div>
    `).join('');
}

// 필터 버튼 이벤트
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 모든 버튼에서 active 클래스 제거
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // 클릭된 버튼에 active 클래스 추가
        this.classList.add('active');
        
        // 필터에 따른 데이터 로드 (실제로는 API 호출 등)
        const filter = this.dataset.filter;
        console.log('Filter selected:', filter);
        
        // 여기서 필터에 맞는 데이터를 불러올 수 있습니다
        renderRankingList();
    });
});

// 초기 렌더링
renderRankingList();
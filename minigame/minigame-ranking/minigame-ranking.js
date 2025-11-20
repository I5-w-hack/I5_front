document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const rankingList = document.getElementById('ranking-list');

    // 💡 랭킹 데이터 (점수와 기타 정보가 포함됩니다. 게임이 끝날 때마다 이 데이터를 업데이트하면 됩니다.)
    const rankingData = {
        'today': [
            { username: 'TodayUser1', date: '오늘', score: 99 },
            { username: 'TodayUser2', date: '오늘', score: 98 },
            { username: 'TodayUser3', date: '오늘', score: 85 }
        ],
        'this-week': [
            // 게임 결과에 따라 이 점수(score)가 바뀝니다.
            { username: 'Username1', date: '11월 셋째 주', score: 95 }, 
            { username: 'Username2', date: '11월 셋째 주', score: 94 },
            { username: 'Username3', date: '11월 셋째 주', score: 93 },
            { username: 'Username4', date: '11월 셋째 주', score: 92 },
            { username: 'Username5', date: '11월 셋째 주', score: 88 }
        ],
        'all-time': [
            { username: 'AllTimeKing', date: '전체', score: 100 },
            { username: 'OldTimer', date: '전체', score: 97 },
            { username: 'Newbie', date: '전체', score: 80 }
        ]
    };

    /**
     * @description 제공된 데이터를 기반으로 랭킹 목록 HTML을 생성하고 렌더링합니다.
     * @param {Array<Object>} data 랭킹 항목 배열
     */
    function renderRanking(data) {
        rankingList.innerHTML = ''; // 기존 목록 비우기
        
        data.forEach(item => {
            const itemHTML = `
                <div class="ranking-item">
                    <div class="rank-info">
                        <div class="user-avatar"></div>
                        <div class="user-details">
                            <span class="username">${item.username}</span>
                            <span class="date">${item.date}</span>
                        </div>
                    </div>
                    <span class="score">${item.score}</span> 
                </div>
            `;
            rankingList.innerHTML += itemHTML;
        });
    }

    // 초기 로드: 'this-week' 데이터 렌더링
    renderRanking(rankingData['this-week']);


    // 필터 버튼 클릭 이벤트 리스너
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.getAttribute('data-filter');

            // 1. 모든 버튼에서 'active' 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // 2. 클릭된 버튼에 'active' 클래스 추가
            button.classList.add('active');

            // 3. 해당 필터에 맞는 데이터를 렌더링
            if (rankingData[filterType]) {
                renderRanking(rankingData[filterType]);
            }
        });
    });
});
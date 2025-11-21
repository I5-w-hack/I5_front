// ========== 단어 설명 데이터베이스 ==========
const dictionary = {
};

// ========== DOM 요소 ==========
let scale = 1;
const page = document.getElementById("document-page");
const sidebar = document.getElementById("sidebar");
const wordList = document.getElementById("word-list");
const closeBtn = document.getElementById("closePanel");
const addedWords = new Set();

// ========== 줌 기능 ==========
document.getElementById("zoomIn").onclick = () => {
    scale = Math.min(2.0, scale + 0.1);
    page.style.transform = `scale(${scale})`;
};

document.getElementById("zoomOut").onclick = () => {
    scale = Math.max(0.5, scale - 0.1);
    page.style.transform = `scale(${scale})`;
};

// ========== 텍스트 처리 함수 ==========
// 모든 단어를 .word 클래스로 감싸기
function processText(text) {
    // HTML 태그는 보존하고 텍스트만 처리
    return text.replace(/\b([a-zA-Z가-힣]+)\b/g, '<span class="word">$1</span>');
}

// 샘플 텍스트 로드
const sampleText = ``;

page.innerHTML = processText(sampleText);

// ========== 본문 단어 클릭 이벤트 ==========
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target.innerText.toLowerCase();
        if (!addedWords.has(word)) {
            addedWords.add(word);
            sidebar.classList.remove("hidden");
            addWordToSidebar(word);
        }
    }
});

// ========== 단어를 사이드바에 추가 ==========
function addWordToSidebar(word) {
    const meaning = dictionary[word] || "뜻이 없습니다.";
    const item = document.createElement("div");
    item.className = "word-item";

    item.innerHTML = `
        <div class="word-item-header">
            <span class="word-item-text">${word}</span>
            <button class="save-btn">
                <svg viewBox="0 0 24 24" width="20" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21l-7-3-7 3V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#4A90E2" stroke-width="2" fill="white" stroke-linejoin="round" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="word-item-meaning">${meaning}</div>
    `;

    wordList.prepend(item);

    // 저장 버튼 클릭 이벤트
    item.querySelector(".save-btn").addEventListener("click", (e) => {
        e.target.closest('.save-btn').classList.toggle("saved");
        alert(`"${word}"가 저장되었습니다!`);
    });
}

// ========== 사이드바 닫기 ==========
closeBtn.addEventListener("click", () => {
    sidebar.classList.add("hidden");
    wordList.innerHTML = "";
    addedWords.clear();
});


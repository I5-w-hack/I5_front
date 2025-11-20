let scale = 1;
const page = document.querySelector(".document-page");

document.getElementById("zoomIn").onclick = () => {
    scale += 0.1;
    page.style.transform = `scale(${scale})`;
};

document.getElementById("zoomOut").onclick = () => {
    scale = Math.max(0.5, scale - 0.1);
    page.style.transform = `scale(${scale})`;
};


// 오른쪽 패널 닫기
document.getElementById("closePanel").onclick = () => {
    document.getElementById("sidePanel").style.display = "none";
};
// 사이드바 요소
const sidebar = document.getElementById("sidebar");
const wordList = document.getElementById("word-list");
const closeBtn = document.querySelector(".close-btn");

// 단어 설명(툴팁용)
const dictionary = {
    "impact": "영향, 충격",
    "dynamic": "역동적인 / 계속 변화하는",
    "optimize": "최적화하다",
    "analysis": "분석",
    "design": "설계",
    // 필요한 단어 계속 추가 가능
};

/* -------------------------  
   본문에서 단어 클릭 → 사이드바 열기
------------------------- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target.innerText;
        openSidebar(word);
    }
});

/* -------------------------
    사이드바 열기 & 단어 추가
------------------------- */
function openSidebar(word) {
    sidebar.classList.remove("hidden");

    // open 애니메이션 적용 위해 약간 딜레이
    setTimeout(() => {
        sidebar.classList.add("open");
    }, 10);

    addWordToSidebar(word);
}

/* -------------------------
    단어 박스 생성
------------------------- */
function addWordToSidebar(word) {
    const item = document.createElement("div");
    item.className = "word-item";

    const tooltipText = dictionary[word] || "설명이 없습니다.";

    item.innerHTML = `
        <span>${word}</span>
        <button class="save-btn">📌</button>
        <div class="tooltip">${tooltipText}</div>
    `;

    wordList.appendChild(item);
}

/* -------------------------
    저장 버튼 클릭 → localStorage 저장
------------------------- */
wordList.addEventListener("click", (e) => {
    if (e.target.classList.contains("save-btn")) {
        const word = e.target.parentElement.querySelector("span").innerText;
        saveWord(word);
    }
});

function saveWord(word) {
    let saved = JSON.parse(localStorage.getItem("savedWords") || "[]");

    if (!saved.includes(word)) {
        saved.push(word);
        localStorage.setItem("savedWords", JSON.stringify(saved));
    }

    alert(`"${word}" 저장됨`);
}

/* -------------------------
    사이드바 닫기
------------------------- */
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");

    setTimeout(() => {
        sidebar.classList.add("hidden");
    }, 300);
});

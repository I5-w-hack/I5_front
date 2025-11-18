
document.addEventListener("DOMContentLoaded", () => {


    const editButton = document.querySelector(".profile-edit-btn");
    if (editButton) {
        editButton.addEventListener("click", () => {
            alert("프로필 수정 버튼이 클릭되었습니다.");
            // 나중에 여기에 '프로필 수정' 팝업을 띄우는 코드를 작성ㄱㄴ
        });
    }


    const settingItems = document.querySelectorAll(".setting-item");
    
    settingItems.forEach(item => {
        item.addEventListener("click", () => {
            // 클릭된 아이템의 텍스트 가져오기
            const settingName = item.querySelector("span").textContent;
            alert(settingName + " 메뉴가 클릭되었습니다.");
            // 각 설정 페이지로 이동하는 코드를 작성.
        });
    });


    const vocaLink = document.querySelector(".voca-link");
    if (vocaLink) {
        vocaLink.addEventListener("click", (event) => {
            event.preventDefault(); // 기본 링크 이동 방지
            alert("단어장으로 이동합니다.");
            // window.location.href = "이동할_페이지_주소.html";
        });
    }

});
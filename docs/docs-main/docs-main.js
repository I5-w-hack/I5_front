document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-upload');
    const filterButtons = document.querySelectorAll('.translation-filter .filter-btn');
    const uploadSection = document.getElementById('uploadSection');
    const viewerSection = document.getElementById('viewerSection');
    
    // 1. 문서 업로드 버튼 클릭 시 파일 입력창 열기
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // 2. 파일 선택 시 로직
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileName = file.name;
            
            alert(`파일 '${fileName}' 업로드 완료. 문서 보기로 전환됩니다.`);
            
            // 업로드 섹션 숨기고 뷰어 섹션 표시
            uploadSection.classList.add('hidden');
            uploadSection.classList.remove('active');
            viewerSection.classList.remove('hidden');
        }
    });

    // 3. 필터 버튼 활성화/비활성화
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 추가
            button.classList.add('active');
        });
    });
});

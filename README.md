# I5_front

피그마 → 프론트엔드 작업 정리 how?

#1. Figma에서 개발 정보 "빼내는" 방법

1.1 [Inspect] 탭 활용
- Figma 화면 오른쪽 패널을 보면 [Design], [Prototype], [Inspect] 탭 존재.
- [Inspect] 탭을 클릭(개발자 모드)
- 디자인 화면에서 '로그인 버튼' 같은 특정 요소를 클릭
- [Inspect] 탭에 해당 요소의 CSS 코드가 그대로 나옴.
- 
EX)

width, height (크기)
color (글자 색)
background (배경 색)
font-family, font-size (폰트)
padding, margin (간격)

이 정보들을 복사해서 VSCode의 .css 파일에 붙여넣으며 작업

#2. 이미지 / 아이콘 내보내기 (Export)
-디자인에 쓰인 로고, 아이콘, 특정 이미지 등은 이미지 파일로 저장해야함.(코드 x)
-Figma에서 해당 이미지를 클릭
-[Inspect] 탭 맨 아래로 내려가면 [Export] 섹션 존재.
-PNG, JPG, SVG 등 형식을 선택하고 + 버튼을 눌러 Export  (아이콘이나 로고는 SVG가 좋음)
-다운로드한 이미지 파일은 VSCode의 파일 탐색기에서 images 같은 폴더를 새로 만들어 그 안에 넣어두고, <img> 태그로 사용.

4. Figma 작업을 Git으로 관리하는 법 (워크플로우)
가장 중요합니다. Figma 디자인 전체를 base-html 브랜치 하나에서 한 번에 다 만들려고 하면 안됨.
Figma 디자인을 '조각'으로 나눠서 작업해야 함.
Figma 디자인이 '로그인 페이지'라고 가정
-> 그 페이지도 '로고', '아이디/비번 입력창', '로그인 버튼' 등으로 나뉠 것.
   
결론 : *"하나의 기능 조각 = 하나의 브랜치"**가 가장 이상적입니다.

# 작업 순서
현재 상태: feature/base-html 브랜치에서 index.html 기본 뼈대를 만든 Draft PR을 업로드한 상태
작업 구체화: feature/base-html 브랜치에서 Figma의 '헤더(Header)' 부분 또는 **'로그인 폼'** 처럼 ** 가장 위에 있거나 가장 핵심적인 '조각' 만들기 **

VSCode에서 index.html에 헤더 HTML 코드를 짬(일단 저장함)
css/style.css 같은 CSS 파일을 새로 만들기(이미 만들었음)
Figma의 [Inspect] 탭에서 헤더에 필요한 CSS 속성들을 복사해와 style.css에 붙여넣고 수정!(위 방법대로)

'조각' 완성 후 푸시(Push):
'헤더' 하나가 대충 완성 되면, 터미널을 열고  다시 커밋과 푸시 하기(아래 방식 참고)

 git add . 
 git commit -m "feat: 헤더 UI 구현”
 git push origin feature/base-html`

다음 '조각' 작업:
헤더 PR이 승인(Merge)되면, 다시 main 브랜치로 돌아와 git pull upstream main으로 동기화

그다음 feature/login-form (로그인 폼) 같은 새 브랜치를 만들어서 다음 '조각'을 작업.

**이 과정을 계속 반복!!**

#요약: feature/base-html 브랜치에서 Figma의 가장 작은 조각(예: 헤더) 하나만 더 만들고, add -> commit -> push를 하기!

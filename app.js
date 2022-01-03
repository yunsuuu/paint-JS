// Array.from 메소드는 object로부터 array를 만듦
// console.log(Array.from(colors));
// ctx.fillRect(50, 20, 100, 40); // x,y 좌표 / width, height 설정해서 도형 생성
// window.location.reload(); // 브라우저 새로고침

// 우클릭 제거 (*contextmenu*)
// if(canvas){
//     canvas.addEventListener("contextmenu", handleClickCM);
// }
// function handleClickCM(event){
//     event.preventDefault();
// }

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");

// 반복되는 색상(#2c2c2c)을 INITIAL_COLOR 변수로 저장&초기화
// ctx.strokeStyle = "#2c2c2c"; // paint mode line 색상
// ctx.fillStyle = "#2c2c2c" // fill mode에 작동
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas element(픽셀 같은) 너비, 높이도 정해줘야 함수 실행됨
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 이미지 저장시 나타나는 canvas bg color 설정
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 칠해지는 라인 너비

let painting = false; // painting 변수의 기본값은 false
let filling = false; // FILL button clikc -> canvas 전체 색칠

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// onMouseMove 중요!
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // !false = (true)
        // console.log("creating path in", x, y);
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x, y); // 선 시작 좌표
    } else { // false
        // console.log("creating line in", x, y);
        ctx.lineTo(x, y); // 선 끝 좌표(현재의 sub-path에서 마지막 지점을 특정 좌표로 연결)
        ctx.stroke(); // 선 그리기
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; // Fill mode 반영(색상 클릭했을 때 fillStyle도 같게)
}

function handleRangeChange(event){
    const size = event.target.value; // brush size (0.1씩 증감)
    ctx.lineWidth = size;
}

// 기본적으로 painting mode, 클릭하면 filling mode
function handleModeClick(){
    if(filling === true){ // paint mode
        filling = false;
        mode.innerText = "Fill";
    } else { // fill mode
        filling = true;
        mode.innerText = "Paint";
    }
}

 // FILL MODE
 // x,y=0 -> canvas 코너부터 시작해서 canvas 사이즈와 동일한 사각형 만들기
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function saveBtn(){
    const image = canvas.toDataURL(); // 기본값 png (jpeg 저장시 괄호 안에 "jpeg")
    const link = document.createElement("a"); // <a href> 생성
    link.href = image;
    link.download = "PaintJS[🎨]" // img 저장시 파일명
    link.click();
}

function resetBtn(){
    window.location.reload(); // 브라우저 새로고침
}

function handleClickCM(event){
    event.preventDefault(); // 우클릭 제거
}

if(canvas){ // canvas 위에서 발생하는 이벤트
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleClickCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", saveBtn);
}

if(reset){
    reset.addEventListener("click", resetBtn);
}
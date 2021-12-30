// Array.from 메소드는 object로부터 array를 만듦
// console.log(Array.from(colors));

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// canvas element(픽셀 같은) 너비, 높이도 정해줘야 함수 실행됨
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 기본값
ctx.lineWidth = 2.5; // 칠해지는 라인 너비

let painting = false; // painting 변수의 기본값은 false
let filling = false; // FILL button click -> canvas click 하면 색상 채워짐

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
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value; // brush size (0.1씩 증감)
    ctx.lineWidth = size;
}

// 기본적으로 painting mode, 클릭하면 filling mode
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas){ // canvas 위에서 발생하는 이벤트
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
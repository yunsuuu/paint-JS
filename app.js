// Array.from 메소드는 object로부터 array를 만듦
// console.log(Array.from(colors));
// ctx.fillRect(50, 20, 100, 40); // x,y 좌표 / width, height 설정해서 도형 생성

// 브라우저 새로고침
// window.location.reload(); // 

// 우클릭 방지 (*contextmenu*)
// if(canvas){
//     canvas.addEventListener("contextmenu", handleClickCM);
// }
// function handleClickCM(event){
//     event.preventDefault();
// }

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 2차원
const arcBtn = document.getElementById("jsArc");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

// 반복되는 색상(#2c2c2c)을 INITIAL_COLOR 변수로 저장&초기화
// ctx.strokeStyle = "#2c2c2c"; // paint mode line 색상
// ctx.fillStyle = "#2c2c2c" // fill mode에 작동
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas size 설정 (css, js 사이즈 모두 지정)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 이미지 저장시 나타나는 canvas bg color 설정(안해주면 투명 bg로 저장)
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 칠해지는 라인 너비

let painting = false;
let filling = false;
let arc = false;
let arcX;
let arcY;

function stopPainting(){ // mouseup
    painting = false;
}

function startPainting(){ // mousedown
    painting = true;
}

// onMouseMove 중요!
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // not painting (painting === false)
    if(!filling && !arc){
        if(!painting){
            // console.log("creating path in", x, y);
            ctx.beginPath(); // 선 그리기 시작을 선언
            ctx.moveTo(x, y); // 좌표 이동
        } else {
            // console.log("creating line in", x, y);
            ctx.lineTo(x, y); // x, y 좌표 연결
            ctx.stroke(); // 선 그리기
        }
    }
}

function onMouseOver(event){
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x, y);
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

function handleArcClick(){
    if(arc === true){ // paint mode
        arc = false;
        arcBtn.innerText = "arc";
    } else { // arc mode
        arc = true;
        arcBtn.innerText = "paint";
    }
}

function arcInit(event){
    if(arc){
        ctx.beginPath();
        arcX = event.offsetX;
		arcY = event.offsetY;
    }
}

function arcPainting(event){
    if(arc){
        const x = arcX - event.offsetX;
		const y = arcY - event.offsetY;
        ctx.arc(arcX, arcY, 80, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

// 기본적으로 painting mode, 클릭하면 filling mode
function handleModeClick(){
    if(filling === true){ // paint mode
        filling = false;
        modeBtn.innerText = "fill";
    } else { // fill mode
        filling = true;
        modeBtn.innerText = "paint";
    }
}

 // FILL MODE
 // x,y=0 -> canvas 코너부터 시작해서 canvas 사이즈와 동일한 사각형 만들기
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL(); // 기본값 png (jpeg 저장시 괄호 안에 "jpeg")
    const link = document.createElement("a"); // <a href> 생성
    link.href = image;
    link.download = "PaintJS[🎨]" // img 저장시 파일명
    link.click();
}

function handleResetClick(){
    window.location.reload(); // 브라우저 새로고침
}

function handleClickCM(event){
    event.preventDefault(); // 우클릭 제거
}

if(canvas){ // canvas 위에서 발생하는 이벤트
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseover", onMouseOver);
    // canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleClickCM);
    canvas.addEventListener("mousedown", arcInit);
	canvas.addEventListener("mouseup", arcPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(arcBtn){
    arcBtn.addEventListener("click", handleArcClick);
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(resetBtn){
    resetBtn.addEventListener("click", handleResetClick);
}
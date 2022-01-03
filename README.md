# paintjs
Painting Board made with VaillaJS

## Reset CSS
* 각 브라우저마다 기본으로 설정되어있는 스타일이 다른데, 이로인한 출력시 브라우저간의 표시가 생각처럼 되지 않을 때 각 브라우저의 스타일을 초기화하기 위해 사용

## const ctx = canvas.getContext("2d");
* 2D 렌더링 컨텍스트
* 호출을 얻기 위해 취해줘야 하는 코드

## 기능추가
### mouseover
function onMouseOver(event){
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x, y);
}

if(canvas){
    canvas.addEventListener("mouseover", onMouseOver);
}

### reset
function handleResetClick(){
    window.location.reload();
}

### 원그리기
* html 코드에서 fill 버튼 옆에 arc 버튼 추가
* FILL, PAINT 버튼과 동일하게 작동하는 코드 작성

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

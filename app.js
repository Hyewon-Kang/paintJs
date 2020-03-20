
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"


//css에서도 사이즈 지정해줘야하고 js에서도 사이즈 지정해줘야함!
canvas.width = 700;
canvas.height = 400;

//기본 배경색 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 400);

//선과 페인트 색, 브러쉬 기본 크기 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}


//모든 움직임 감지, 라인 만들기
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function onMouseUp(event){
    stopPainting();
}

function onMouseLeave(event){
    painting = false;
}

function hanldeColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, 700, 400);
    }
}

function handleCM(event){
    //마우스 우클릭 막음
    event.preventDefault();
}

function handleSaveImage(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", hanldeColorClick)
    );

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveImage);
}
//BOOK COVER randomization and rotation

// Rotate the image according to mouse position
window.addEventListener('mousemove', function(e) {
    var img = document.getElementById('generativeBookImg');
    var width = window.innerWidth;
    var mouseX = e.clientX;
    var rotation = -10 + (mouseX / width) * 20;
    img.style.transform = 'rotate(' + rotation + 'deg)';
});

// Function to set a random cover image
function setRandomCover() {
    var img = document.getElementById('generativeBookImg');
    var randomCoverNumber = Math.floor(Math.random() * 21); // gets a random number between 0 and 20
    img.src = "coverImgs/" + randomCoverNumber + ".jpg";
}

// Call the function to set a random cover on page load
setRandomCover();

// Cycle through covers on mouseover
var coverInterval;
var currentCover = 0;
var img = document.getElementById('generativeBookImg');

img.onmouseover = function() {
    coverInterval = setInterval(function() {
        currentCover = (currentCover + 1) % 21; // increment the cover number, and loop back to 0 when it reaches 21
        img.src = "coverImgs/" + currentCover + ".jpg";
    }, 100); // change the image every 100 milliseconds
};

img.onmouseout = function() {
    clearInterval(coverInterval); // stop changing the image when the mouse is no longer over it
};


//BACKGROUND:
let grid = document.getElementById("grid");
let imgsGrid = [];
let numOfObjs = 200;

for (let i = 0; i < numOfObjs; i++) {
	imgsGrid[i] = document.createElement("img");
	imgsGrid[i].classList.add("img-grid");
	imgsGrid[i].src = `alpha_array_web/${i}.png`;
}
shuffle(imgsGrid);

let style = getComputedStyle(document.body);
let wNode = style.getPropertyValue("--wNode");
wNode = wNode.substring(0, wNode.length - 2);

let coverGridRow = 17;
let coverGridColumn = 17;
let count = 0;

let imgsXY = [];
let imgsL = [];

let shadowObjs = [];

for (let x = 1; x < coverGridColumn; x = x + 2) {
	for (let y = 1; y < coverGridRow; y = y + 2) {
		shadowObjs[count] = document.createElement("div");
		//create shadows behind nodes
		imgsGrid[count].style.gridRow = y;
		imgsGrid[count].style.gridColumn = x;
		imgsGrid[count].style.width = `${60 + count}%`;
		imgsGrid[count].style.height = `${60 + count}%`;
		grid.appendChild(imgsGrid[count]);
		imgsXY[count] = getOffset(imgsGrid[count]);
		imgsL[count] = imgsGrid[count].width;
		count++;
	}
}
console.log(imgsXY);

empty = [];
protocolsBG = document.getElementById("protocolsBG");
let drawing = document.getElementById("drawing");
let mFrames = [];
let rMFrameXY = [];
let mFramesW = 220;
let mFramesH = 220;

for (let m = 0; m < 6; m++) {
	let rDarkR = rndmInt(0, 15);
	let rDarkG = rndmInt(0, 40);
	let rDarkB = rndmInt(0, 15);
	let rDarkA = rndmInt(0, 2);
	let rLightR = rndmInt(10, 255);
	let rLightG = rndmInt(20, 225);
	let rLightB = rndmInt(10, 200);
	rMFrameXY[m] = rndmInt(0, imgsXY.length - 2);
	mFrames[m] = document.createElement("div");
	mFrames[m].classList.add("drawingElement");
	mFrames[m].classList.add("mFrames");
	mFramesW = imgsL[rMFrameXY[m]] + 20;
	mFramesH = imgsL[rMFrameXY[m]] + 20;
	mFrames[m].style.width = `${mFramesW}px`;
	mFrames[m].style.height = `${mFramesH}px`;

	mFrames[
		m
	].style.backgroundImage = `linear-gradient( rgba(${rLightR}, ${rLightG}, ${rLightB}, 0.5), rgba(${rDarkR}, ${rDarkG}, ${rDarkB}, 0.${rDarkA}) 70%)`;
	mFrames[m].style.marginLeft = `${imgsXY[rMFrameXY[m]].left - mFramesW / 2}px`;
	mFrames[m].style.marginTop = `${imgsXY[rMFrameXY[m]].top - mFramesH / 2}px`;

	drawing.appendChild(mFrames[m]);
}

//SHAPE
let shapeRectA = document.createElement("div");

rShapePointA = rndmInt(0, imgsXY.length);
rShapePointB = rndmInt(0, imgsXY.length);
shapeRectA.classList.add("drawingElement");
shapeRectA.classList.add("gradientCone");
shapeRectA.style.width = `250px`;
shapeRectA.style.height = `150px`;
shapeRectA.style.marginLeft = `${imgsXY[rShapePointA].left}px`;
shapeRectA.style.marginTop = `${imgsXY[rShapePointA].top}px`;

rShapeColors = [
	"rgba(237, 235, 183, 0.2)",
	"rgba(84, 255, 249, 0.1)",
	"rgba(28, 38, 236, 0.1)",
	"rgba(13, 137, 255,0.3)",
	"rgba(167, 29, 0,0.5)",
	"rgba(37, 9, 65,0.1)",
	"rgba(218, 180, 10,0.3)",
];
shuffle(rShapeColors);

shapeRectA.style.backgroundImage = `radial-gradient(farthest-corner at 0px 0px, ${rShapeColors[0]}, ${rShapeColors[1]}, transparent 70%)`;
drawing.appendChild(shapeRectA);

let shapeRectB = document.createElement("div");

rShapePointB = rndmInt(0, imgsXY.length);
shapeRectB.classList.add("drawingElement");
shapeRectB.classList.add("gradientCone");
shapeRectB.style.width = `250px`;
shapeRectB.style.height = `150px`;
shapeRectB.style.marginLeft = `${imgsXY[rShapePointB].left}px`;
shapeRectB.style.marginTop = `${imgsXY[rShapePointB].top}px`;
shapeRectB.style.backgroundImage = `radial-gradient(farthest-corner at 100% 100%, transparent 10%, ${rShapeColors[0]},${rShapeColors[2]},transparent 70%)`;
//drawing.appendChild(shapeRectB);

//PIPE
let rndmXYPipeStartA = rndmInt(7, imgsXY.length - 7);
let rndmXYPipeMidA = rndmXYPipeStartA - 1;
let rndmXYPipeEndA = rndmXYPipeStartA + 2;
let pipeSVGStrokeA = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"svg"
);
let pipeStrokeA = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"path"
);

let firstPointA = `${imgsXY[rndmXYPipeStartA].left},${imgsXY[rndmXYPipeStartA].top}`;
let midPointA = `${imgsXY[rndmXYPipeMidA].top},${imgsXY[rndmXYPipeMidA].top}`;
let lastPointA = `${imgsXY[rndmXYPipeEndA].left},${imgsXY[rndmXYPipeEndA].top}`;
let finalPathA = `M${firstPointA} Q${midPointA} ${lastPointA}`;

pipeStrokeA.setAttribute("d", finalPathA.toString());
let pipeGradientDefA = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"defs"
);

let rA = rndmInt(0, 65);
let gA = rndmInt(80, 200);
let bA = rndmInt(100, 200);
let pipeGradientA = `
        <linearGradient id="pipeGradientA" gradientTransform="rotate(90)">
        <stop offset="70%"  style="stop-color: rgb(${rA},${gA},${bA}); stop-opacity:0.8" />
        <stop offset="100%"  style="stop-color: rgb(${rA},${gA},${bA}); stop-opacity:0" />
        </linearGradient>`;

pipeSVGStrokeA.appendChild(pipeGradientDefA);
pipeGradientDefA.innerHTML = pipeGradientA.toString();

pipeStrokeA.setAttribute("fill", "none");
pipeStrokeA.setAttribute("stroke", `url(#pipeGradientA)`);
pipeStrokeA.setAttribute("stroke-linecap", `round`);
pipeStrokeA.setAttribute("stroke-width", "20");
pipeSVGStrokeA.setAttribute("id", "pipe");
pipeSVGStrokeA.classList.add("drawingElement");
pipeSVGStrokeA.classList.add("pipe");

pipeSVGStrokeA.appendChild(pipeStrokeA);
drawing.appendChild(pipeSVGStrokeA);

//PIPEB
let rndmXYPipeStartB = rndmInt(7, imgsXY.length - 7);
let rndmXYPipeMidB = rndmXYPipeStartB - 2;
let rndmXYPipeEndB = rndmXYPipeStartB + 2;
let pipeSVGStrokeB = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"svg"
);
let pipeStrokeB = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"path"
);

let firstPointB = `${imgsXY[rndmXYPipeStartB].left},${imgsXY[rndmXYPipeStartB].top}`;
let midPointB = `${imgsXY[rndmXYPipeMidB].top},${imgsXY[rndmXYPipeMidB].top}`;
let lastPointB = `${imgsXY[rndmXYPipeEndB].left},${imgsXY[rndmXYPipeEndB].top}`;
let finalPathB = `M${lastPointA} Q${midPointB} ${lastPointB}`;
pipeStrokeB.setAttribute("d", finalPathB.toString());

let pipeGradientDefB = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"defs"
);

let rB = rndmInt(180, 220);
let gB = rndmInt(150, 210);
let bB = rndmInt(160, 225);
let pipeGradientB = `
        <linearGradient id="pipeGradientB" gradientTransform="rotate(90)">
        <stop offset="50%"  style="stop-color: rgb(${rB},${gB},${bB}); stop-opacity:0.3" />
        <stop offset="100%"  style="stop-color: rgb(${rA},${gA},${bA}); stop-opacity:0.7" />
        </linearGradient>`;

pipeSVGStrokeB.appendChild(pipeGradientDefB);
pipeGradientDefB.innerHTML = pipeGradientB.toString();
pipeStrokeB.setAttribute("fill", "none");
pipeStrokeB.setAttribute("stroke", `url(#pipeGradientB)`);
pipeStrokeB.setAttribute("stroke-linecap", `round`);
pipeStrokeB.setAttribute("stroke-width", "20");
pipeSVGStrokeB.setAttribute("id", "pipe");
pipeSVGStrokeB.classList.add("drawingElement");
pipeSVGStrokeB.classList.add("pipeB");

pipeSVGStrokeB.appendChild(pipeStrokeB);
drawing.appendChild(pipeSVGStrokeB);

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Existing code here...

function resizeElements() {

  imgsXY = [];
  for (let i = 0; i < count; i++) {
      imgsXY[i] = getOffset(imgsGrid[i]);
      imgsL[i] = imgsGrid[i].width;
  }
  console.log(imgsXY);
  for (let m = 0; m < 6; m++) {
      mFramesW = imgsL[rMFrameXY[m]] + 20;
      mFramesH = imgsL[rMFrameXY[m]] + 20;
      mFrames[m].style.width = `${mFramesW}px`;
      mFrames[m].style.height = `${mFramesH}px`;
      mFrames[m].style.marginLeft = `${imgsXY[rMFrameXY[m]].left - mFramesW / 2}px`;
      mFrames[m].style.marginTop = `${imgsXY[rMFrameXY[m]].top - mFramesH / 2}px`;
  }
  shapeRectA.style.marginLeft = `${imgsXY[rShapePointA].left}px`;
  shapeRectA.style.marginTop = `${imgsXY[rShapePointA].top}px`;
  shapeRectB.style.marginLeft = `${imgsXY[rShapePointB].left}px`;
  shapeRectB.style.marginTop = `${imgsXY[rShapePointB].top}px`;
  firstPointA = `${imgsXY[rndmXYPipeStartA].left},${imgsXY[rndmXYPipeStartA].top}`;
  midPointA = `${imgsXY[rndmXYPipeMidA].top},${imgsXY[rndmXYPipeMidA].top}`;
  lastPointA = `${imgsXY[rndmXYPipeEndA].left},${imgsXY[rndmXYPipeEndA].top}`;
  finalPathA = `M${firstPointA} Q${midPointA} ${lastPointA}`;
  pipeStrokeA.setAttribute("d", finalPathA.toString());
  firstPointB = `${imgsXY[rndmXYPipeStartB].left},${imgsXY[rndmXYPipeStartB].top}`;
  midPointB = `${imgsXY[rndmXYPipeMidB].top},${imgsXY[rndmXYPipeMidB].top}`;
  lastPointB = `${imgsXY[rndmXYPipeEndB].left},${imgsXY[rndmXYPipeEndB].top}`;
  finalPathB = `M${lastPointA} Q${midPointB} ${lastPointB}`;
  pipeStrokeB.setAttribute("d", finalPathB.toString());
}

// Invoke the function at the start
resizeElements();

// Listen for resize event
window.addEventListener("resize", resizeElements);


function rndmInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX + el.width / 2,
		top: rect.top + window.scrollY + el.height / 2,
	};
}

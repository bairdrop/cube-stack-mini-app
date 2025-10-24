const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

let stack = [];
let cubeSize = 50;
let x = 0;
let y = 0;
let speed = 2;
let movingRight = true;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

function drawCube(x, y) {
    ctx.fillStyle = "#ff4";
    ctx.fillRect(x, y, cubeSize, cubeSize);
}

function drawStack() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stack.forEach(cube => drawCube(cube.x, cube.y));
    drawCube(x, y);
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('best-score').innerText = "Best: " + bestScore;
}

function update() {
    if (movingRight) x += speed;
    else x -= speed;

    if (x + cubeSize > canvas.width) movingRight = false;
    if (x < 0) movingRight = true;

    drawStack();
    requestAnimationFrame(update);
}

canvas.addEventListener('click', () => {
    stack.push({x: x, y: canvas.height - cubeSize - stack.length * cubeSize});
    score++;
    if(score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
});

update();

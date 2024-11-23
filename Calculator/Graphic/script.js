
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

function plotGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const inputFunction = document.getElementById('functionInput').value;
    
    try {
        const fn = new Function('x', 'return ' + mathParser(inputFunction));

        drawGrid();  
        drawGraph(fn);  
    } catch (error) {
        alert("Invalid function! Please try again.");
    }
}

function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    const scale = 20; 

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    for (let x = scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
}

function drawGraph(fn) {
    const width = canvas.width;
    const height = canvas.height;
    const scale = 20; 
    const step = 0.1; 

    ctx.strokeStyle = '#e10d90';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let first = true;
    for (let x = -width / 2; x < width / 2; x += step) {
        const xPos = width / 2 + x * scale;
        const yPos = height / 2 - fn(x) * scale;

        if (first) {
            ctx.moveTo(xPos, yPos);
            first = false;
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }

    ctx.stroke();
}

function mathParser(input) {
    return input
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
}
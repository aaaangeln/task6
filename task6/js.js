const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let tool = 'circle';
let isDrawing = false;
let startX, startY;
let color = '#000';
let isTextPromptOpen = false;
let previousX, previousY;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  startX = event.offsetX;
  startY = event.offsetY;
}

function draw(event) {
  if (!isDrawing) return;
  const currentX = event.offsetX;
  const currentY = event.offsetY;
  if (tool === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  } else if (tool === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, width, height);
  } else if (tool === 'line') {
    if (!isDrawing) {
      return;
    }
    if (previousX !== undefined && previousY !== undefined) {
      ctx.beginPath();
      ctx.moveTo(previousX, previousY);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    previousX = currentX;
    previousY = currentY;
  } else if (tool === 'text') {
    canvas.addEventListener('click', handleClick);
  }
}

function handleClick(event) {
  if (tool === 'text') {
    if (!isTextPromptOpen) {
      isTextPromptOpen = true;
      const text = prompt('Введите текст:');
      if (text) {
        ctx.fillStyle = color;
        ctx.font = '16px Arial';
        ctx.fillText(text, event.offsetX, event.offsetY);
      }
      isTextPromptOpen = false;
    }
  }
}

function stopDrawing() {
  isDrawing = false;
  previousX = undefined;
  previousY = undefined;
}

function changeTool(selectedTool) {
  tool = selectedTool;
}

document.getElementById('colorPicker').addEventListener('change', (event) => {
  color = event.target.value;
});

document.getElementById('sizePicker').addEventListener('input', (event) => {
  size = event.target.value;
});
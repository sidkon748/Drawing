// Configure the JavaScript for Drawing Context
const canvas = document.getElementById('myCanvas'); // Get the canvas element by its ID
const ctx = canvas.getContext('2d'); // Get the 2D drawing context

let isDrawing = false; // Flag to track whether drawing is in progress
let startX = 0; // Starting X coordinate for drawing
let startY = 0; // Starting Y coordinate for drawing
let selectedColor = '#000000'; // Default color for drawing
let selectedShape = 'line'; // Default shape for drawing (can be 'line', 'rectangle', or 'circle')

// Event listener for mouse down event to start drawing
canvas.addEventListener('mousedown', (mouse) => {
    isDrawing = true; // Set drawing flag to true
    startX = mouse.offsetX; // Record starting X coordinate
    startY = mouse.offsetY; // Record starting Y coordinate
});

// Event listener for mouse up event to stop drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false; // Set drawing flag to false
});

// Event listener for mouse movement to handle drawing shapes
canvas.addEventListener('mousemove', (mouse) => {
    if (!isDrawing) return; // If not drawing, exit the function

    ctx.strokeStyle = selectedColor; // Set the stroke color
    ctx.lineWidth = 5; // Set the stroke width
    ctx.lineJoin = 'round'; // Set line join style to round

    // Draw the selected shape
    if (selectedShape === 'line') {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(startX, startY); // Move to the starting point
        ctx.lineTo(mouse.offsetX, mouse.offsetY); // Draw line to the current mouse position
        ctx.stroke(); // Render the line
    } else if (selectedShape === 'rectangle') {
        ctx.strokeRect(startX, startY, mouse.offsetX - startX, mouse.offsetY - startY); // Draw rectangle
    } else if (selectedShape === 'circle') {
        const radius = Math.sqrt(Math.pow(mouse.offsetX - startX, 2) + Math.pow(mouse.offsetY - startY, 2)); // Calculate radius
        ctx.beginPath(); // Start a new path
        ctx.arc(startX, startY, radius, 0, Math.PI * 2); // Draw circle
        ctx.stroke(); // Render the circle
    }

    // Update starting coordinates for the next segment
    startX = mouse.offsetX; 
    startY = mouse.offsetY;
});

// Event listener for color picker input to change drawing color
const colorPicker = document.getElementById('colorPicker'); 
colorPicker.addEventListener('input', (mouse) => {
    selectedColor = mouse.target.value; // Update selected color based on user input
});

// Event listener for clear button to clear the canvas
const clearButton = document.getElementById('clearCanvas'); 
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
});
// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Initialize drawing state variables
let isDrawing = false; // Flag to track if the mouse is currently pressed down for drawing
let startX = 0; // Starting X coordinate for drawing
let startY = 0; // Starting Y coordinate for drawing
let selectedColor = '#000000'; // Default color for drawing
let selectedShape = 'line'; // Default shape for drawing

// Get references to the color picker and clear button
const colorPicker = document.getElementById('colorSelect');
const clearButton = document.getElementById('clearCanvas');
const shapeSelectors = document.querySelectorAll('input[name="drawingTool"]'); // Get shape radio buttons

// Event listener for mouse down event to start drawing
canvas.addEventListener('mousedown', (mouse) => {
    isDrawing = true; // Set drawing flag to true
    startX = mouse.offsetX; // Record starting X coordinate
    startY = mouse.offsetY; // Record starting Y coordinate
});

// Event listener for mouse up event to stop drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false; // Set drawing flag to false
    ctx.beginPath(); // Reset the drawing path to avoid connecting shapes
});

// Event listener for mouse movement to handle drawing shapes
canvas.addEventListener('mousemove', (mouse) => {
    if (!isDrawing) return; // Exit if not currently drawing

    // Set the drawing properties
    ctx.strokeStyle = selectedColor; // Use the selected color for stroke
    ctx.lineWidth = 5; // Set stroke width
    ctx.lineJoin = 'round'; // Set the style for joining lines

    // Clear the canvas for real-time drawing effect
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Draw the selected shape based on user choice
    if (selectedShape === 'line') {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(startX, startY); // Move to the starting point
        ctx.lineTo(mouse.offsetX, mouse.offsetY); // Draw line to the current mouse position
        ctx.stroke(); // Render the line
    } else if (selectedShape === 'rectangle') {
        ctx.strokeRect(startX, startY, mouse.offsetX - startX, mouse.offsetY - startY); // Draw rectangle
    } else if (selectedShape === 'circle') {
        // Calculate radius based on distance from starting point to current mouse position
        const radius = Math.sqrt(Math.pow(mouse.offsetX - startX, 2) + Math.pow(mouse.offsetY - startY, 2));
        ctx.beginPath(); // Start a new path
        ctx.arc(startX, startY, radius, 0, Math.PI * 2); // Draw circle
        ctx.stroke(); // Render the circle
    }
});

// Update selected shape based on user input from radio buttons
shapeSelectors.forEach((selector) => {
    selector.addEventListener('change', (event) => {
        selectedShape = event.target.value; // Update selected shape when the radio button changes
    });
});

// Event listener for color picker input to change drawing color
colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value; // Update selected color based on user input
});

// Event listener for clear button to clear the canvas
clearButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
});

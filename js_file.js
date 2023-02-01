

const createGrid = function (sideLength) {
    let container = document.querySelector('.container');  
    container.innerHTML = '';
    totalSquares = sideLength**2;
    for (let i = 1; i <= totalSquares; i++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.addEventListener('mouseover', changeColourOver);
        square.addEventListener('mousedown', changeColourDown);
        container.appendChild(square);
    }
    container.setAttribute('style', `grid-template: repeat(${sideLength}, 1fr) / repeat(${sideLength}, 1fr)`);
}

let mouseDown = false;
//Deal with mousedown events outside the grid.
document.body.onmouseup = () => mouseDown = false;
document.body.onmousedown = () => mouseDown = true;

document.body.ondragstart = () => false;

const changeColourDown = function () {
    mouseDown = true;
    this.setAttribute('class', 'visited');
}

const changeColourOver = function () {
    if (mouseDown) {
    this.setAttribute('class', 'visited');
    }
}

const clearGrid = function () {
    visited = document.querySelectorAll('.visited');
    visited.forEach(square => square.setAttribute('class', 'square'));
}

let clear = document.querySelector('#reset');
clear.addEventListener('click', clearGrid);

let slider = document.querySelector('.slider');
let gridMessage = document.querySelector('#gridSize');
gridMessage.textContent = `Grid Size: ${slider.value}x${slider.value}`;
slider.oninput = function() {
    gridMessage.textContent = `Grid Size: ${this.value}x${this.value}`;
    clearGrid();
    createGrid(this.value);
}


createGrid(16);  //Create initial grid.
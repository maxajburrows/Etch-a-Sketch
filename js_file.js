

const createGrid = function (sideLength) {
    let container = document.querySelector('.container');
    
    totalSquares = sideLength**2;
    for (let i = 1; i <= totalSquares; i++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.addEventListener('mouseover', changeColourOver);
        square.addEventListener('mousedown', changeColourDown);
        square.ondragstart = () => false;
        container.appendChild(square);
    }
}

let mouseDown = false;
document.body.onmouseup = () => mouseDown = false;
document.body.onmousedown = () => mouseDown = true;

const changeColourDown = function () {
    mouseDown = true;
    this.setAttribute('class', 'visited');
}

const changeColourOver = function () {
    if (mouseDown) {
    this.setAttribute('class', 'visited');
    }
}

createGrid(16);  //Create initial grid.
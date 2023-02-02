let gridLines = true;
let erasing = false;

const createGrid = function (sideLength, gridLines) {
    let container = document.querySelector('.container');  
    container.innerHTML = '';
    totalSquares = sideLength**2;
    for (let i = 1; i <= totalSquares; i++) {
        let square = document.createElement('div');
        if (gridLines) square.setAttribute('class', 'square');
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
    styleSelector.call(this);
    //this.setAttribute('class', 'standard');
}

const changeColourOver = function () {
    if (mouseDown) {
        styleSelector.call(this);
        //this.setAttribute('class', 'standard');
    }
}

const styleSelector = function () {
    if (erasing === false) {
        addStyle.call(this, 'standard');
    } else if ((erasing === true) && (gridLines === true)) {
        addStyle.call(this, 'square');
    }
     else if ((erasing === true) && (gridLines === false)) {
        addStyle.call(this, '')
    } 
}

const addStyle = function (style) {
    this.setAttribute('class', style);
}

createGrid(16, gridLines);  //Create initial grid.

const clearGrid = function () {
    squares = document.querySelector('.container').childNodes;
    squares.forEach(square => {
        (gridLines) ? square.setAttribute('class', 'square')
                    : square.setAttribute('class', '');
    });
}

let clear = document.querySelector('#reset');
clear.addEventListener('click', clearGrid);

let slider = document.querySelector('#slider');
let gridMessage = document.querySelector('#gridSize');
gridMessage.textContent = `Grid Size: ${slider.value}x${slider.value}`;
slider.oninput = function() {
    gridMessage.textContent = `Grid Size: ${this.value}x${this.value}`;
    clearGrid();
    createGrid(this.value, gridLines);
}

toggleLines = document.querySelector('.gridLines');
toggleLines.addEventListener('click', () => {
    if (gridLines) {
        gridLines = false
        toggleLines.textContent = 'Grid lines: Off'
    } else {
        gridLines = true;
        toggleLines.textContent = 'Grid lines: On'
    }
    squares = document.querySelector('.container').childNodes;
    squares.forEach(square => square.classList.toggle('square'));
});

let erase = document.querySelector('.erase');
erase.addEventListener('click', () => {
    erase.classList.toggle('eraseOn');
    (erasing) ? erasing = false : erasing = true;
})
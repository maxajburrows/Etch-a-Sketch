let gridLines = true;
let erasing = false;
let mouseDown = false;
let mode = 'Standard'
document.body.onmouseup = () => mouseDown = false; //Deal with mousedown events outside the grid.
document.body.onmousedown = () => mouseDown = true;
document.body.ondragstart = () => false;



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

const changeColourDown = function () {
    mouseDown = true;
    styleSelector.call(this);
}

const changeColourOver = function () {
    if (mouseDown) {
        styleSelector.call(this);
    }
}

const styleSelector = function () {
    if ((erasing === true) && (gridLines === true)) {
        addStyle.call(this, 'square');
    } else if ((erasing === true) && (gridLines === false)) {
        addStyle.call(this, '')
    } else if ((erasing === false) && (mode === 'Standard')) {
        addStyle.call(this, 'standard');
    } else if ((erasing === false) && (mode === 'Rainbow')) {
        rainbowClass.call(this);
    } else if ((erasing === false) && (mode === 'Shade')) {
        shade.call(this);
    }
}

const addStyle = function (style) {
    this.setAttribute('class', style);
    this.setAttribute('style', '');
}

const rainbowClass = function () {
    let red = Math.floor(Math.random()*257);
    let green = Math.floor(Math.random()*257);
    let blue = Math.floor(Math.random()*257);
    console.log(this);
    this.setAttribute('style', `background-color: rgb(${red}, ${green}, ${blue}); border: 0.01px solid rgb(${red}, ${green}, ${blue});`);
    console.log(this.style===true);
}

const shade = function () {
    if (!this.classList.contains('shade')) {
        this.classList.add('shade');
        this.setAttribute('shadingPercent', 0.1);
        this.setAttribute('style', `background-color: rgba(0, 0, 0, 0.1); border-width: 0px`);
    } else if ((Math.round(Number(this.getAttribute('shadingPercent'))*10)/10) === 1) {
        return;
    } else {
        let alpha = Number(this.getAttribute('shadingPercent'));
        alpha += 0.1;
        this.setAttribute('shadingPercent', Math.round(alpha*10)/10);
        this.setAttribute('style', `border-width: 0px; background-color: rgba(0, 0, 0, ${alpha});`);
        console.log(this);
    }

}

createGrid(16, gridLines);  //Create initial grid.



const clearGrid = function () {
    squares = document.querySelector('.container').childNodes;
    squares.forEach(square => {
        square.setAttribute('style', '');
        (gridLines) ? square.setAttribute('class', 'square')
                    : square.setAttribute('class', '');
    });
}

let clear = document.querySelector('#reset');
clear.addEventListener('click', clearGrid);



let slider = document.querySelector('#slider');
let gridMessage = document.querySelector('#gridSize');
gridMessage.textContent = `Grid Size: ${slider.value}x${slider.value}`;
slider.oninput = function () {
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


let multiColour = document.querySelector('select');
multiColour.oninput = function () {
    mode = this.value;
}
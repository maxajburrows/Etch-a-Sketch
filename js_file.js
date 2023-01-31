

const createGrid = function (sideLength) {
    let container = document.querySelector('.container');
    totalSquares = sideLength**2;
    for (let i = 1; i <= totalSquares; i++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.addEventListener('mouseenter', changeColour);
        container.appendChild(square);
    }
}

const changeColour = function () {
    this.setAttribute('class', 'visited');
}

createGrid(16);  //Create initial grid.
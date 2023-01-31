

const createGrid = function (sideLength) {
    let container = document.querySelector('.container');
    totalSquares = sideLength**2;
    for (let i = 1; i <= totalSquares; i++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        container.appendChild(square);
    }
}

createGrid(16);
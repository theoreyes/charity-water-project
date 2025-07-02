const gameModel = {
    state: 'playing',
    score: 0,
    level: 1,
    time: 60,
    gameBoard: levels[1],
    isFocused: false,
    focusedTile: null,
}

const tileset = {
    'S': 'assets/images/source-icon.png',
    'T': 'assets/images/target-icon.png',
    'R': 'assets/images/rock.png',
    'X': undefined, // Wall tiles do not have an image TODO: see if undefined works
    'ns': 'assets/images/pipe-straight-ns.png',
    'ew': 'assets/images/pipe-straight-ew.png',
    'ne': 'assets/images/pipe-bent-ne.png',
    'es': 'assets/images/pipe-bent-es.png',
    'sw': 'assets/images/pipe-bent-sw.png',
    'nw': 'assets/images/pipe-bent-nw.png'
}

// Function to check whether a tile click should trigger a "focusTile" action
// or a "swapTiles" action. Also grabs the row, col coordinates of the tile that
// was clicked.
function tileAction(row, col) {
    if (gameModel.isFocused) { // We need to swap tiles
        swapTiles(gameModel.focusedTile.row, gameModel.focusedTile.col, row, col);
    } else { // We need to focus the clicked tile
        gameModel.isFocused = true;
        gameModel.focusedTile = { row: row, col: col };
    }
}

// Function to swap two tiles given the row, col coordinates of each tile
// and the game board. 
function swapTiles(rowA, colA, rowB, colB) {
    const tempPipe = gameModel.gameBoard.grid[rowB][colB]; // saves unfocused tile's pipe type
    gameModel.gameBoard.grid[rowB][colB] = gameModel.gameBoard.grid[rowA][colA]; // Replaces unfocused tile with focused tile
    gameModel.gameBoard.grid[rowA][colA] = tempPipe; // Replace focused tile with the pipe that was inside the unfocused tile
    gameModel.isFocused = false;
    //updateGameBoard(); // responsibility of the view
    // TODO: call checkWinState
}

// Function responsible for loading the initial grid, event listeners, and DOM
// content to the display
function loadInitBoard() {

}

// Function responsible for visually swapping tiles on screen
function updateGameBoard() {

}

function checkWinState() {

}

// For debug
function printGameBoard() {
    for (let i = 1; i < 6; i++) {
        console.log(`${gameModel.gameBoard.grid[i]}`);
    }
}



// ~~~~ Simulate a move ~~~~
printGameBoard(); // Before a move
tileAction('1', '1');
tileAction('1', '2');
console.log('\n\n');
printGameBoard();

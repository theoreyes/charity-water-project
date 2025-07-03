const gameModel = {
    state: 'playing',
    score: 0,
    level: 1,
    time: 60,
    gameBoard: levels[1],
    isFocused: false,
    focusedTile: null,
};

const movables = ['ns', 'ew', 'ne', 'es', 'sw', 'nw'];

// Mapping of internal tile representations and their images
const imageMap = {
    'S': 'assets/images/source-icon.png',
    'T': 'assets/images/target-icon.png',
    'R': 'assets/images/rock.png',
    'ns': 'assets/images/pipe-straight-ns.png',
    'ew': 'assets/images/pipe-straight-ew.png',
    'ne': 'assets/images/pipe-bent-ne.png',
    'es': 'assets/images/pipe-bent-es.png',
    'sw': 'assets/images/pipe-bent-sw.png',
    'nw': 'assets/images/pipe-bent-nw.png'
};

// Image alt texts
const imageAltMap = {
    'S': 'Source icon',
    'T': 'Target icon',
    'R': 'Rock',
    'ns': 'North-south pipe',
    'ew': 'East-west pipe',
    'ne': 'North-east pipe',
    'es': 'East-south pipe',
    'sw': 'South-west pipe',
    'nw': 'South-west pipe'
};

// Mappings of tiles and their possible flow directions
const flowGuide = {
    'X': [],
    'R': [],
    'S': ['north', 'south'],
    'T': ['north', 'south'],
    'ns': ['north', 'south'],
    'ew': ['east', 'west'],
    'ne': ['north', 'east'],
    'es': ['east', 'south'],
    'sw': ['south', 'west'],
    'nw': ['north', 'west']
};

const intakeMap = {
    'X': [],
    'R': [],
    'S': ['north', 'south'],
    'T': ['north', 'south'],
    'ns': ['north', 'south'],
    'ew': ['east', 'west'],
    'ne': ['south', 'west'],
    'es': ['west', 'north'],
    'sw': ['north', 'east'],
    'nw': ['south', 'east']
}

// Map of which directions 'connect' each other
const dirMap = {
    'south': 'north',
    'north': 'south',
    'east': 'west',
    'west': 'east'
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
    updateGameBoard(rowA, colA, rowB, colB);
    if (checkWinState() == true) {
        console.log("You won!")
    } else {
        console.log("Nope!");
    }

}

// Function responsible for loading the initial grid, event listeners, and DOM
// content to the display
function loadBoard() {
    const gameSection = document.getElementById('game-wrapper');
    gameSection.innerHTML = ''; // Wipes old board
    board = gameModel.gameBoard.grid;
    for (let row = 0; row < 7; row++) {
        for (let col = 1; col < 6; col++) {
            // Creates element and assigns it the appropriate row, col
            const tile = document.createElement('div');
            tile.setAttribute('data-row', row);
            tile.setAttribute('data-col', col);
            tileType = board[row][col];
            // Adds event listener, if tile is a pipe
            if (movables.includes(tileType)) {
                tile.addEventListener('click', function () {
                    const row = parseInt(this.dataset.row);
                    const col = parseInt(this.dataset.col);
                    tileAction(row, col);
                });
            }
            // Adds corresponding tile image tag to the div
            if (tileType != 'X') {
                const img = document.createElement('img');
                img.src = imageMap[tileType];
                img.alt = imageAltMap[tileType];
                if (tileType == 'S' || tileType == 'T')
                    img.classList.add('noborder-tile');
                tile.appendChild(img);
            } else
                tile.classList.add('wall');
            gameSection.appendChild(tile);
        }
    }
}

// Function responsible for visually swapping tiles on screen
function updateGameBoard(rowA, colA, rowB, colB) {
    board = gameModel.gameBoard.grid;
    const tileA = document.querySelector(`[data-row='${rowA}'][data-col='${colA}']`)
                             .querySelector('img');
    const tileB = document.querySelector(`[data-row='${rowB}'][data-col='${colB}']`)
                             .querySelector('img');
    const typeA = board[rowA][colA];
    const typeB = board[rowB][colB];
    tileA.setAttribute('src', imageMap[typeA]);
    tileB.setAttribute('src', imageMap[typeB]);
}

// Checks if a tile move resulted in a winning board state
function checkWinState() {
    winChecked = false;
    winState = false;
    flowdir = 'north';
    const curTile = {row: gameModel.gameBoard.sourcexy.row,
                   col: gameModel.gameBoard.sourcexy.col
    };
    console.log("Origin:");
    console.log(gameModel.gameBoard.sourcexy);
    while (!winChecked) {
        console.log(`Begin loop dir: ${flowdir}`);
        if (curTile == 'X' || curTile =='R')
            return false; // short-circuits from function, means we encountered a wall
        switch (flowdir) {
            case 'north':
                curTile.row -= 1;  // Follows path up
                break;
            case 'south':
                curTile.row += 1;  // Follows path down
                break;
            case 'east':
                curTile.col += 1;  // Follows path right
                break;
            case 'west':
                curTile.col -= 1;  // Follows path left
                break;
        }
        // Checks if the tile path we followed was valid
        //console.log(curTile);
        pipeType = gameModel.gameBoard.grid[curTile.row][curTile.col];
        targ = gameModel.gameBoard.targetxy;
        if (!intakeMap[pipeType].includes(flowdir)) {
            // Tile path followed was not valid
            winChecked = true;
            winState = false;
        } else if ((curTile.row == targ.row) && (curTile.col == targ.col)) {
            // Game was won
            winChecked = true;
            winState = true;
        } else {
            // Continue iterating through tile path
            originFace = dirMap[flowdir];
            flowdir = flowGuide[pipeType].find(element => element !== originFace);
        }
    }
    return winState;
}

// For debug
function printGameBoard() {
    for (let i = 1; i < 6; i++) {
        console.log(`${gameModel.gameBoard.grid[i]}`);
    }
}

loadBoard();
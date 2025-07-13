TIME_BLOCK_SIZE = 60
TOTAL_LEVELS = 5;
let levels = {}; // placeholder reference, dictates which level set is used (easy/med/hard)
const popSound = new Audio('assets/sounds/pop.mp3');

const gameModel = {
    difficulty: 0,  // 0 is set as default to avoid using undefined
    score: 0,
    level: 1,
    lastLevel: TOTAL_LEVELS,
    timeId: null,
    time: TIME_BLOCK_SIZE,
    gameBoard: {},
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

// Changes difficulty based off integer value (0/1/2 for easy/med/hard)
function selectDifficulty(diffInt) {
    switch (diffInt) {
        case 0:
            TIME_BLOCK_SIZE = 60;
            levels = levelsEasy;
            break;
        case 1:
            TIME_BLOCK_SIZE = 45;
            levels = levelsMed;
            break;
        case 2:
            TIME_BLOCK_SIZE = 30;
            levels = levelsHard;
            break;
    }
    gameModel.gameBoard = JSON.parse(JSON.stringify(levels[gameModel.level]));
}

// Function to check whether a tile click should trigger a "focusTile" action
// or a "swapTiles" action. Also grabs the row, col coordinates of the tile that
// was clicked.
function tileAction(row, col) {
    if (gameModel.isFocused) { // We need to swap tiles
        swapTiles(gameModel.focusedTile.row, gameModel.focusedTile.col, row, col);
        removeHighlightFocus();
    } else { // We need to focus the clicked tile
        gameModel.isFocused = true;
        gameModel.focusedTile = { row: row, col: col };
        highlightFocusedPipe();
    }
}

function highlightFocusedPipe() {
    if (gameModel.focusedTile) { // Prevents grabbing null tile
        const tile = document.querySelector(`[data-row='${gameModel.focusedTile.row}'][data-col='${gameModel.focusedTile.col}']`);
        tile.classList.add('tile-focused');
    }
}

function removeHighlightFocus() {
    if (gameModel.focusedTile) { // Prevents grabbing null tile
        const tile = document.querySelector(`[data-row='${gameModel.focusedTile.row}'][data-col='${gameModel.focusedTile.col}']`);
        tile.classList.remove('tile-focused');
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
        if (gameModel.level == gameModel.lastLevel) {
            updateScore();
            displayLastLevelModal();
        } else {
            displayNextLevelModal();
        }
    }
    popSound.currentTime = 0;
    popSound.play();
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
    while (!winChecked) {
        //console.log(`Begin loop dir: ${flowdir}`);
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

// Resets model for game to defaults
function resetGame() {
    gameModel.score = 0;
    document.getElementById('score').textContent = "💧 Score: 0";
    gameModel.level = 1;
    gameModel.gameBoard = JSON.parse(JSON.stringify(levels[1]));
}

function startGame() {
    const gameSection = document.getElementById('game-wrapper');
    gameSection.innerHTML = '';
    const gameStartModal = new bootstrap.Modal(document.getElementById('gameStartModal'));
    document.getElementById('easyButton').addEventListener('click', function () {
        selectDifficulty(0);
        loadBoard();
        startTimer();
    });
    document.getElementById('medButton').addEventListener('click', function () {
        selectDifficulty(1);
        loadBoard();
        startTimer();
    });
    document.getElementById('hardButton').addEventListener('click', function () {
        selectDifficulty(2);
        loadBoard();
        startTimer();
    });

    // NOTE: old start game event listener, for reference
    /* 
    document.getElementById('startButton').onclick = function () {
        loadBoard();
        startTimer();
    };
    */
    gameStartModal.show();
    
}

function transitionLevel(gamestate) {
    // JSON parse/stringify used to create new JS object, avoids mutating the original levels
    gameModel.gameBoard = JSON.parse(JSON.stringify(levels[gameModel.level]));
    if (gamestate != "lost") updateScore();
    loadBoard();
    startTimer();

}

function displayNextLevelModal() {
    const nextLevelModal = new bootstrap.Modal(document.getElementById('nextLevelModal'));
    document.getElementById('nextLevelModalHd').textContent = `🎉 Level ${gameModel.level} Complete! 🎉`
    document.getElementById('currentScore').textContent = `+${100 + (5 * gameModel.time)} Score`;
    document.getElementById('triviaSection').textContent = `${trivia[gameModel.level - 1]}`;
    document.getElementById('nextLevelButton').onclick = function () {
        transitionLevel();
    };
    gameModel.level += 1;
    nextLevelModal.show();
}

function displayLastLevelModal() {
    const lastLevelModal = new bootstrap.Modal(document.getElementById('lastLevelModal'));
    document.getElementById('finalScore').textContent = `Final Score: ${gameModel.score}`;
    document.getElementById('resetButton').onclick = function () {
        resetGame();
        startGame();
    };
    lastLevelModal.show();
}

function displayLostLevelModal() {
    const lostModal = new bootstrap.Modal(document.getElementById('lostModal'));
    document.getElementById('levelResetButton').onclick = function () {
        transitionLevel("lost");
    }
    lostModal.show();
}

function startTimer() {
    gameModel.time = TIME_BLOCK_SIZE;
    updateTime();
    if (gameModel.timeId)
        clearInterval(gameModel.timeId);
    gameModel.timeId = setInterval(() => {
        const modalVis = document.querySelector('.modal.show') != null;
        if (!modalVis) {
            gameModel.time -= 1;
            updateTime();
            if (gameModel.time == 0) {
                clearInterval(gameModel.timeId);
                displayLostLevelModal();
            }
        }
    }, 1000);
}

function updateTime() {
    document.getElementById('time').textContent = `⏱️ Time: ${gameModel.time}`;
}

function updateScore() {
    gameModel.score += (100 + (5 * gameModel.time));
    document.getElementById('score').textContent = `💧 Score: ${gameModel.score}`;
}

function learnMore() {
    window.open('https://www.charitywater.org/donate', '_blank');
}

// Initializes reset button on main menu
document.getElementById('reset-button').onclick = function () {
    const resetModal = new bootstrap.Modal(document.getElementById('resetGameModal'));
    resetModal.show();
};
document.getElementById('reset-button').addEventListener('mouseenter', function () {
    this.src = "assets/images/reset-button-hover-img.png";
});
document.getElementById('reset-button').addEventListener('mouseleave', function () {
    this.src = "assets/images/reset-button-img.png";
});

document.getElementById('menuResetButton').onclick = function () {
    resetGame();
    startGame();
};

// Initializes pause button on main menu
document.getElementById('pause-button').onclick = function () {
    const pauseModal = new bootstrap.Modal(document.getElementById('pauseGameModal'));
    pauseModal.show();
};

document.getElementById('pause-button').addEventListener('mouseenter', function () {
    this.src = "assets/images/pause-button-hover-img.png";
});
document.getElementById('pause-button').addEventListener('mouseleave', function () {
    this.src = "assets/images/pause-button-img.png";
});

// Shuffle trivia ordering
trivia.sort(() => (Math.random() - 0.5));
console.log(trivia);
// Game starts here
startGame();

// Debug
/*
function printGameBoard() {
    for (let i = 1; i < 6; i++) {
        console.log(`${gameModel.gameBoard.grid[i]}`);
    }
}
*/
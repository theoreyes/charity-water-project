const levels = {
    1:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','es', 'nw', 'ns', 'ew', 'X'],
            ['X', 'nw','ns', 'ns', 'nw', 'sw', 'X'],
            ['X', 'ew','R', 'sw', 'es', 'nw',  'X'],
            ['X', 'es','ew', 'ns', 'R',  'ew', 'X'],
            ['X', 'ns','es', 'ew', 'es', 'ew', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
    2: {
        grid: [
            ['X', 'X', 'T',  'X',  'X',  'X',  'X'],
            ['X', 'sw','ns', 'es', 'ew', 'ns', 'X'],
            ['X', 'nw','es', 'sw', 'ns', 'sw', 'X'],
            ['X', 'es','R', 'nw', 'ew', 'ns',  'X'],
            ['X', 'R','es', 'nw', 'ne',  'sw', 'X'],
            ['X', 'ew','sw', 'ns', 'nw', 'es', 'X'],
            ['X', 'X', 'S',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 2},
        targetxy: {row: 0, col: 2}
    },
    3: {
        grid: [
            ['X', 'X', 'X',  'X',  'T',  'X',  'X'],
            ['X', 'ew','R', 'sw', 'es',   'R', 'X'],
            ['X', 'ns','R', 'sw', 'R',   'ns', 'X'],
            ['X', 'nw','es', 'ew', 'es', 'nw', 'X'],
            ['X', 'ns','R', 'es', 'ns',  'nw', 'X'],
            ['X', 'ew','ns', 'nw', 'nw', 'sw', 'X'],
            ['X', 'X', 'S',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 2},
        targetxy: {row: 0, col: 4}
    },
    4:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','es', 'nw', 'ns', 'ew', 'X'],
            ['X', 'nw','ns', 'ns', 'nw', 'sw', 'X'],
            ['X', 'ew','R', 'sw', 'es', 'nw',  'X'],
            ['X', 'es','ew', 'ns', 'R',  'ew', 'X'],
            ['X', 'ns','es', 'ew', 'es', 'ew', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
    5:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','es', 'nw', 'ns', 'ew', 'X'],
            ['X', 'nw','ns', 'ns', 'nw', 'sw', 'X'],
            ['X', 'ew','R', 'sw', 'es', 'nw',  'X'],
            ['X', 'es','ew', 'ns', 'R',  'ew', 'X'],
            ['X', 'ns','es', 'ew', 'es', 'ew', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
    6:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','es', 'nw', 'ns', 'ew', 'X'],
            ['X', 'nw','ns', 'ns', 'nw', 'sw', 'X'],
            ['X', 'ew','R', 'sw', 'es', 'nw',  'X'],
            ['X', 'es','ew', 'ns', 'R',  'ew', 'X'],
            ['X', 'ns','es', 'ew', 'es', 'ew', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
    7:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','es', 'nw', 'ns', 'ew', 'X'],
            ['X', 'nw','ns', 'ns', 'nw', 'sw', 'X'],
            ['X', 'ew','R', 'sw', 'es', 'nw',  'X'],
            ['X', 'es','ew', 'ns', 'R',  'ew', 'X'],
            ['X', 'ns','es', 'ew', 'es', 'ew', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
}
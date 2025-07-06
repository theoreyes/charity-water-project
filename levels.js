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
            ['X', 'T', 'X',  'X',  'X',  'X',  'X'],
            ['X', 'ew','ew', 'es', 'ns', 'R', 'X'],
            ['X', 'sw','R', 'R', 'R', 'sw', 'X'],
            ['X', 'ne','ns', 'ns', 'sw', 'nw',  'X'],
            ['X', 'es','R', 'R', 'R',  'ns', 'X'],
            ['X', 'nw','ns', 'ew', 'ne', 'es', 'X'],
            ['X', 'X', 'X',  'X',  'X',  'S',  'X'],
        ],
        sourcexy: {row: 6, col: 5},
        targetxy: {row: 0, col: 1}
    },
    5:  {
        grid: [
            ['X', 'X', 'X',  'T',  'X',  'X',  'X'],
            ['X', 'ew','R', 'sw', 'ns', 'ns', 'X'],
            ['X', 'es','R', 'R', 'R', 'ew', 'X'],
            ['X', 'ns','sw', 'sw', 'ew', 'sw',  'X'],
            ['X', 'es','R', 'es', 'nw',  'ew', 'X'],
            ['X', 'nw','R', 'ne', 'ew', 'nw', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 3}
    },
    6:  {
        grid: [
            ['X', 'T', 'X',  'X',  'X',  'X',  'X'],
            ['X', 'es','ns', 'ns', 'nw', 'R', 'X'],
            ['X', 'ew','sw', 'R', 'ew', 'R', 'X'],
            ['X', 'ew','ew', 'R', 'ns', 'es',  'X'],
            ['X', 'R','R', 'ew', 'R',  'ne', 'X'],
            ['X', 'ne','nw', 'nw', 'ew', 'sw', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 1}
    },
    7:  {
        grid: [
            ['X', 'X', 'X',  'X',  'X',  'T',  'X'],
            ['X', 'ns','ns', 'ns', 'R', 'ns', 'X'],
            ['X', 'ne','R', 'ew', 'R', 'es', 'X'],
            ['X', 'ew','R', 'ne', 'R', 'sw',  'X'],
            ['X', 'sw','R', 'ns', 'nw',  'ns', 'X'],
            ['X', 'ns','ns', 'R', 'ns', 'R', 'X'],
            ['X', 'S', 'X',  'X',  'X',  'X',  'X'],
        ],
        sourcexy: {row: 6, col: 1},
        targetxy: {row: 0, col: 5}
    },
}
export const BLOCK_SIZE = 24
export const BLOCK_RAWS = 22
export const BLOCK_COLS = 12
export const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
export const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_RAWS
export const EFFECT_CYCLE = 2 // ticks

export const BACK_COLOR = "#fffffe"
export const TEXT_COLOR = "#222222"
export const GAMEOVER_COLOR = "palevioletred"
export const BLOCK_COLOR = "#3da9fc"
export const LOCK_COLOR = "#90b4ce"
export const WALL_COLOR = "#094067"
export const ERROR_COLOR = "tomato"
export const EFFECT_COLOR1 = "#eeeeee"
export const EFFECT_COLOR2 = LOCK_COLOR

export const NEXTLEVEL = 10

export const BLOCKS_MASTER = [
  {
    name: 'T',
    pattern: [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    name: 'S',
    pattern: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    name: 'I',
    pattern: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ]
  },
  {
    name: 'Z',
    pattern: [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    name: 'J',
    pattern: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    name: 'L',
    pattern: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    name: 'O',
    pattern: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  }
]

export const STAGE_MASTER: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
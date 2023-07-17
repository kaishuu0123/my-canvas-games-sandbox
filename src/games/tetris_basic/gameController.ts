import {
  BACK_COLOR, BLOCKS_MASTER, BLOCK_COLOR, BLOCK_COLS, BLOCK_RAWS, BLOCK_SIZE, EFFECT_COLOR1, EFFECT_COLOR2, LOCK_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH, STAGE_MASTER, WALL_COLOR, TEXT_COLOR
} from "./consts";

const GameMode = {
  Opening: 0,
  Playing: 1,
  GameOver: 2,
  Effect: 3,
} as const

type GameMode = (typeof GameMode)[keyof typeof GameMode]

const PlayingMode = {
  Playing: 0,
  ClearBlock: 1
}

type PlayingMode = (typeof PlayingMode)[keyof typeof PlayingMode]

const BlockState = {
  Empty: 0,
  Movable: 1,
  Locked: 2,
  Clear: 3,
  Wall: 9
}

export class GameController {
  private static instance: GameController
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null

  private gameMode: GameMode = GameMode.Opening
  private playingMode: PlayingMode = PlayingMode.Playing

  private currentStage: number[][] = []
  private currentBlockX: number = 0
  private currentBlockY: number = 0
  private currentBlock: {name: string, pattern: number[][]} | null = null

  private intervalByMiliSeconds: number = 1000
  private currentDelta: number = 0.0
  private prevTimestamp: number = 0.0
  private elapsedMiliSeconds: number = 0.0
  private lastElapsedMiliSecondsForOpening: number = 0.0
  private lastElapsedMiliSecondsForPlaying: number = 0.0
  private lastElapsedMiliSecondsForGameover: number = 0.0
  private openingTextDisplay = true
  private gameoverTextDisplay = true
  private currentEffectBlinking = true
  private animationCount: number = 0

  private constructor() {}

  public static getInstance(): GameController {
    if (GameController.instance == null) {
      GameController.instance = new GameController()
    }

    return GameController.instance
  }

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT
    this.ctx = this.canvas?.getContext("2d")

    this.initStage()
    this.gameMode = GameMode.Opening
    this.intervalByMiliSeconds = 1000
  }

  public initStage() {
    this.currentBlock = null

    for (let i = 0; i < BLOCK_RAWS; i++) {
      for (let j = 0; j < BLOCK_COLS; j++) {
        if (this.currentStage[i] == null) {
          this.currentStage[i] = []
        }

        this.currentStage[i][j] = STAGE_MASTER[i][j]
      }
    }
  }

  public reset() {
    if (this.canvas == null) {
      return
    }

    this.init(this.canvas)
  }

  public drawScene(timestamp: number) {
    const now = timestamp
    if (this.prevTimestamp === 0) {
      this.prevTimestamp = now
      return
    }
    this.currentDelta = now - this.prevTimestamp
    this.prevTimestamp = now
    this.elapsedMiliSeconds += this.currentDelta

    switch(this.gameMode) {
    case GameMode.Opening:
      this.drawOpeningScene()
      break
    case GameMode.Playing:
      this.drawPlayingScene()
      break
    case GameMode.GameOver:
      this.drawGameOverScene()
      break
    }
  }

  public drawOpeningScene() {
    if (this.canvas == null || this.ctx == null) {
      return
    }

    if (this.lastElapsedMiliSecondsForOpening === 0.0) {
      this.lastElapsedMiliSecondsForOpening = this.elapsedMiliSeconds
      return
    }

    if ((this.elapsedMiliSeconds - this.lastElapsedMiliSecondsForOpening) > 1000) {
      this.openingTextDisplay = !this.openingTextDisplay
      this.lastElapsedMiliSecondsForOpening = this.elapsedMiliSeconds
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.openingTextDisplay) {
      const message = "Tetris Basic"
      this.ctx.font = '28px sans-serif'
      this.ctx.fillStyle = TEXT_COLOR
      const measure = this.ctx.measureText(message)
      const centerX = (this.canvas.width - measure.width) / 2
      const centerY = (this.canvas.height - (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent)) / 2
      this.ctx.fillText(message, centerX, centerY)

      const body = "Press 'Enter' to start"
      this.ctx.font = '14px sans-serif'
      this.ctx.fillStyle = TEXT_COLOR
      const measureBody = this.ctx.measureText(body)
      const centerBodyX = (this.canvas.width - measureBody.width) / 2
      const bodyHeight = (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent)
      this.ctx.fillText(body, centerBodyX, centerY + bodyHeight)
    }
  }

  public drawPlayingScene() {
    this.clearCanvas()

    if (this.playingMode === PlayingMode.Playing) {
      if (this.currentBlock == null) {
        this.pickCurrentBlock()
      }

      const prevCurrentBlockX = this.currentBlockX
      const prevCurrentBlockY = this.currentBlockY

      if ((this.elapsedMiliSeconds - this.lastElapsedMiliSecondsForPlaying) > this.intervalByMiliSeconds) {
        this.lastElapsedMiliSecondsForPlaying = this.elapsedMiliSeconds

        this.currentBlockY++
      }

      if (this.checkColision()) {
        this.currentBlockX = prevCurrentBlockX
        this.currentBlockY = prevCurrentBlockY
        this.lockCurrentBlock()
      }

      this.clearCurrentBlockFromStage()
      this.drawCurrentBlockToStage()

      this.drawStage()

      if (this.checkLine()) {
        this.playingMode = PlayingMode.ClearBlock
      }

      if (this.checkGameOver()) {
        this.gameMode = GameMode.GameOver
      }
    } else if (this.playingMode === PlayingMode.ClearBlock) {
      if ((this.elapsedMiliSeconds - this.lastElapsedMiliSecondsForPlaying) > 250) {
        this.currentEffectBlinking = !this.currentEffectBlinking
        this.lastElapsedMiliSecondsForPlaying = this.elapsedMiliSeconds
        this.animationCount++
      }

      if (this.animationCount > 4) {
        this.animationCount = 0

        this.deleteLine()

        this.playingMode = PlayingMode.Playing
      }

      this.clearCurrentBlockFromStage()
      this.drawCurrentBlockToStage()

      this.drawStage()
    }

  }

  public checkColision() {
    if (this.currentBlock == null) {
      return 0
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.currentStage[i + this.currentBlockY][j + this.currentBlockX] > 1 && this.currentBlock.pattern[i][j]) {
          return 1
        }
      }
    }

    return 0
  }

  public pickCurrentBlock() {
    this.currentBlockX = Math.floor(BLOCK_COLS / 3)
    this.currentBlockY = 0
    const blockTypeIndex = Math.floor(Math.random() * BLOCKS_MASTER.length)

    this.currentBlock = {
      name: '',
      pattern: []
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.currentBlock.name = BLOCKS_MASTER[blockTypeIndex].name
        this.currentBlock.pattern = structuredClone(BLOCKS_MASTER[blockTypeIndex].pattern)
      }
    }
  }

  public lockCurrentBlock() {
    if (this.currentBlock == null) {
      return
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.currentBlock.pattern[i][j]) {
          this.currentStage[i + this.currentBlockY][j + this.currentBlockX] = 2
        }
      }
    }

    this.currentBlock = null
  }

  public clearCanvas() {
    if (this.canvas == null || this.ctx == null) {
      return
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  public clearCurrentBlockFromStage() {
    for (let i = 0; i < BLOCK_RAWS; i++) {
      for (let j = 0; j < BLOCK_COLS; j++) {
        if (this.currentStage[i][j] === 1) {
          this.currentStage[i][j] = 0
        }
      }
    }
  }

  public drawStage() {
    if (this.canvas == null || this.ctx == null) {
      return
    }

    for (let i = 0; i < BLOCK_RAWS; i++) {
      for (let j = 0; j < BLOCK_COLS; j++) {
        switch(this.currentStage[i][j]) {
        case BlockState.Empty:
          this.ctx.fillStyle = BACK_COLOR
          break
        case BlockState.Movable:
          this.ctx.fillStyle = BLOCK_COLOR
          break
        case BlockState.Locked:
          this.ctx.fillStyle = LOCK_COLOR
          break
        case BlockState.Clear:
          if (this.currentEffectBlinking) {
            this.ctx.fillStyle = EFFECT_COLOR1
          } else {
            this.ctx.fillStyle = EFFECT_COLOR2
          }
          break
        case BlockState.Wall:
          this.ctx.fillStyle = WALL_COLOR
          break
        }
        this.ctx.fillRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1)
      }
    }
  }

  public drawGameOverScene() {
    if (this.canvas == null || this.ctx == null) {
      return
    }

    if (this.lastElapsedMiliSecondsForGameover === 0.0) {
      this.lastElapsedMiliSecondsForGameover = this.elapsedMiliSeconds
      return
    }

    if ((this.elapsedMiliSeconds - this.lastElapsedMiliSecondsForGameover) > 1000) {
      this.gameoverTextDisplay = !this.gameoverTextDisplay
      this.lastElapsedMiliSecondsForGameover = this.elapsedMiliSeconds
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.gameoverTextDisplay) {
      const message = "Game Over"
      this.ctx.font = '28px sans-serif'
      this.ctx.fillStyle = TEXT_COLOR
      const measure = this.ctx.measureText(message)
      const centerX = (this.canvas.width - measure.width) / 2
      const centerY = (this.canvas.height - (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent)) / 2
      this.ctx.fillText(message, centerX, centerY)

      const body = "Press 'Enter' to contine"
      this.ctx.font = '14px sans-serif'
      this.ctx.fillStyle = TEXT_COLOR
      const bodyHeight = (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent)
      this.ctx.fillText(body, centerX, centerY + bodyHeight)
    }
  }

  public GoPlayingScene() {
    this.gameMode = GameMode.Playing
  }

  public RotateBlock() {
    if (this.currentBlock == null) {
      return
    }

    let tmpBlock: {name: string, pattern: number[][]} = {name: '', pattern: []}
    tmpBlock.pattern = structuredClone(this.currentBlock.pattern)

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.currentBlock.pattern[i][j] = tmpBlock.pattern[3 - j][i]
      }
    }

    if (this.checkColision()) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          this.currentBlock.pattern[i][j] = tmpBlock.pattern[i][j]
        }
      }
    }
  }

  public MoveBlockLeft() {
    const prevCurrentBlockX = this.currentBlockX
    this.currentBlockX--

    if (this.checkColision()) {
      this.currentBlockX = prevCurrentBlockX
    }
  }

  public MoveBlockRight() {
    const prevCurrentBlockX = this.currentBlockX
    this.currentBlockX++

    if (this.checkColision()) {
      this.currentBlockX = prevCurrentBlockX
    }
  }

  public MoveBlockDown() {
    const prevCurrentBlockY = this.currentBlockY
    this.currentBlockY++

    if (this.checkColision()) {
      this.currentBlockY = prevCurrentBlockY
      this.lockCurrentBlock()
    }
  }

  public isOpening() {
    return this.gameMode === GameMode.Opening
  }

  public isPlaying() {
    return this.gameMode === GameMode.Playing
  }

  public isGameover() {
    return this.gameMode === GameMode.GameOver
  }

  public isClearBlock() {
    return this.playingMode == PlayingMode.ClearBlock
  }

  public drawCurrentBlockToStage() {
    if (this.currentBlock == null) {
      return
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.currentBlock.pattern[i][j]) {
          this.currentStage[i + this.currentBlockY][j + this.currentBlockX] = this.currentBlock.pattern[i][j]
        }
      }
    }
  }

  public checkLine() {
    let detectClearLine = false

    for (let i = 1; i < BLOCK_RAWS - 2; i++) {
      let count = 0;

      for (let j = 1; j < BLOCK_COLS - 1; j++) {
        if (this.currentStage[i][j] === BlockState.Locked) {
          count++
        }
      }

      if (count === BLOCK_COLS - 2) {
        detectClearLine = true

        for (let j = 1; j < BLOCK_COLS - 1; j++) {
          this.currentStage[i][j] = BlockState.Clear
        }
      }
    }

    return detectClearLine
  }

  public deleteLine() {
    let detectClearLine = true
    let lineIndex = 0
    while (detectClearLine) {
      detectClearLine = false

      for (let i = BLOCK_RAWS - 1; i > 0; i--) {
        if (this.currentStage[i][1] === BlockState.Clear) {
          detectClearLine = true
          lineIndex = i
          break
        }
      }

      if (detectClearLine) {
        for (let i = lineIndex; i > 0; i--) {
          for (let j = 1; j < BLOCK_COLS - 1; j++) {
            if (this.currentStage[i - 1][j] == BlockState.Empty || this.currentStage[i - 1][j] == BlockState.Locked) {
              this.currentStage[i][j] = this.currentStage[i - 1][j]
            }
          }
        }
      }
    }
  }

  public checkGameOver() {
    for (let j = 1; j < BLOCK_COLS - 1; j++) {
      if (this.currentStage[0][j] === BlockState.Locked) {
        return 1
      }
    }

    return 0
  }
}

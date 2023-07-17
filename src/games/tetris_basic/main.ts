import { KeyDownHandler, KeyUpHandler } from './keyHandler'
import { GameController } from './gameController'

const gameLoop = (timestamp: number): void => {
  const gameController = GameController.getInstance()
  gameController.drawScene(timestamp)

  requestAnimationFrame(gameLoop)
}

const tetrisMain = (): void => {
  window.addEventListener("keydown", KeyDownHandler, false)
  window.addEventListener("keyup", KeyUpHandler, false)

  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement

  const gameController = GameController.getInstance()
  gameController.init(canvas)

  requestAnimationFrame(gameLoop)
}

window.addEventListener('DOMContentLoaded', tetrisMain)
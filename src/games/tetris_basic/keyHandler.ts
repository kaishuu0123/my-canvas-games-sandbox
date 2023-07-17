import { GameController } from "./gameController"

export const KeyDownHandler = (e: KeyboardEvent): void => {
  const gameController = GameController.getInstance()
  if (gameController.isPlaying() && gameController.isClearBlock()) {
    // disable key event
    return
  }

  if (gameController.isOpening() && e.code === 'Enter') {
    gameController.GoPlayingScene()
    return
  }

  if (gameController.isGameover() && e.code === 'Enter') {
    gameController.reset()
    gameController.GoPlayingScene()
    return
  }

  switch(e.code) {
  case 'ArrowLeft':
    gameController.MoveBlockLeft()
    break
  case 'ArrowRight':
    gameController.MoveBlockRight()
    break
  case 'ArrowDown':
    gameController.MoveBlockDown()
    break
  case 'ArrowUp':
    gameController.RotateBlock()
    break
  case 'Enter':
    gameController.RotateBlock()
    break
  }
}

export const KeyUpHandler = (): void => {

}

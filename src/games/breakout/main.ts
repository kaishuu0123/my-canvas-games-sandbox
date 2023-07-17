const main = (): void => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
  const ctx = canvas.getContext("2d")

  if (ctx == null) {
    console.log('Cannot find myCanvas.')
    return
  }

  const baseColor = "#0095DD"
  let x = canvas.width / 2
  let y = canvas.height - 30
  let dx = 2
  let dy = -2
  const ballRadius = 10
  const paddleWidth = 75
  const paddleHeight = 10
  let paddleX = (canvas.width - paddleWidth) / 2
  let leftPressed = false
  let rightPressed = false
  let interval: NodeJS.Timer | null = null
  const brickRowCount = 3
  const brickColumnCount = 5
  const brickWidth = 75
  const brickHeight = 20
  const brickPadding = 10
  const brickOffsetTop = 30
  const brickOffsetLeft = 30
  let score = 0
  let lives = 3

  const mouseMoveHandler = (e: MouseEvent): void => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }
  document.addEventListener("mousemove", mouseMoveHandler, false);

  const keyDownHandler = (e: KeyboardEvent): void => {
    if (e.key === "Right" || e.key == "ArrowRight") {
      rightPressed = true
    } else if (e.key === "Left" || e.key == "ArrowLeft") {
      leftPressed = true
    }
  }
  const keyUpHandler = (e: KeyboardEvent): void => {
    if (e.key === "Right" || e.key == "ArrowRight") {
      rightPressed = false
    } else if (e.key === "Left" || e.key == "ArrowLeft") {
      leftPressed = false
    }
  }
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)

  const drawLives = (): void => {
    ctx.font = "16px Arial"
    ctx.fillStyle = baseColor
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20)
  }

  const drawScore = (): void => {
    ctx.font = "16px Arial"
    ctx.fillStyle = baseColor
    ctx.fillText(`Score: ${score}`, 8, 20)
  }

  const collisionDetection = (): void => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r]
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy
            b.status = 0
            score++

            if (score === brickRowCount * brickColumnCount) {
              alert("YOU WIN, CONGRATULATIONS!")
              document.location.reload()
            }
          }
        }
      }
    }
  }

  const bricks: {x: number, y: number, status: number}[][] = []
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  const drawBricks = (): void => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop

          bricks[c][r].x = brickX
          bricks[c][r].y = brickY

          ctx.beginPath()
          ctx.rect(brickX, brickY, brickWidth, brickHeight)
          ctx.fillStyle = baseColor
          ctx.fill()
          ctx.closePath()
        }
      }
    }
  }

  const drawPaddle = (): void => {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = baseColor
    ctx.fill()
    ctx.closePath()

    if (rightPressed) {
      paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
      paddleX = Math.max(paddleX - 7, 0)
    }
  }

  const drawBall = (): void => {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = baseColor
    ctx.fill()
    ctx.closePath()
  }

  const draw = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBricks()
    drawBall()
    drawPaddle()
    collisionDetection()
    drawScore()
    drawLives()

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx
    }
    if (y + dy < ballRadius) {
      dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy
      } else {
        lives--
        if (lives <= 0) {
          alert("GAME OVER")
          document.location.reload()
        } else {
          x = canvas.width / 2
          y = canvas.height - 30
          dx = 2
          dy = -2
          paddleX = (canvas.width - paddleWidth) / 2
        }
      }
    }

    x += dx
    y += dy

    requestAnimationFrame(draw)
  }

  draw()
}

document.addEventListener("DOMContentLoaded", main)
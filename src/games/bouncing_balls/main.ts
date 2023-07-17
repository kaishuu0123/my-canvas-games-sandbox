document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
  const ctx = canvas?.getContext('2d')

  if (ctx == null) {
    console.log('Cannot get canvas element')
    return
  }

  const ball = {
    x: 25,
    y: 25
  }

  const velocity = 3
  const startingAngle = 70
  const rad = 20

  let moveX = Math.cos(Math.PI / 180 * startingAngle) * velocity
  let moveY = Math.sin(Math.PI / 180 * startingAngle) * velocity

  const draw = () => {
    const clientRect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, clientRect.width, clientRect.height)

    if (ball.x > clientRect.width - rad || ball.x < rad) {
      moveX = -moveX
    }
    if (ball.y > clientRect.height - rad || ball.y < rad) {
      moveY = -moveY
    }

    ball.x += moveX
    ball.y += moveY

    ctx.beginPath()
    ctx.fillStyle = 'green'
    ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    // requestAnimationFrame(draw)
  }

  // draw()
  setInterval(draw, 10)
})
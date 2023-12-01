import React, { useState } from 'react'
import { colors } from '../constants/color.constant'
import { useOnDraw } from '../hooks/useOnDraw'

const Canvas = ({ width, height }) => {
  const [currentColor, SetCurrentColor] = useState('#000')

  function drawLine(start, end, context, width, color) {
    start = start ?? end
    context.beginPath()
    context.lineWidth = width
    context.strokeColor = color
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.stroke()

    context.fillStyle = color
    context.beginPath()
    context.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    context.fill()
  }
  function onDraw(context, position, prevPosition) {
    drawLine(prevPosition, position, context, 5, currentColor)
  }
  const ref = useOnDraw(onDraw, currentColor)

  return (
    <main>
      <div className="color-container">
        {colors.map((color) => (
          <div
            onClick={() => SetCurrentColor(color)}
            className="color"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>

      <canvas width={width} height={height} style={canvasStyle} ref={ref} />
    </main>
  )
}

export default Canvas

const canvasStyle = {
  border: '1px solid black',
}

import { useEffect, useRef } from 'react'

export function useOnDraw(onDraw, initialColor) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const mouseMoveListenerRef = useRef(null)
  const mouseDownListenerRef = useRef(null)
  const mouseUpListenerRef = useRef(null)
  const prevPositionRef = useRef(null)

  useEffect(() => {
    function handleMouseMove(e) {
      if (isDrawingRef.current) {
        const position = zeroPosition(e.clientX, e.clientY)
        const context = canvasRef.current.getContext('2d')
        context.strokeStyle = initialColor
        if (onDraw) onDraw(context, position, prevPositionRef.current)
        prevPositionRef.current = position
      }
    }

    function handleMouseDown() {
      isDrawingRef.current = true
    }

    function handleMouseUp() {
      isDrawingRef.current = false
      prevPositionRef.current = null
    }

    const canvas = canvasRef.current

    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)

      mouseMoveListenerRef.current = handleMouseMove
      mouseDownListenerRef.current = handleMouseDown
      mouseUpListenerRef.current = handleMouseUp
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [onDraw, initialColor])

  function setCanvasRef(ref) {
    if (!ref) return
    canvasRef.current = ref
  }

  function zeroPosition(clientX, clientY) {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    } else {
      return null
    }
  }

  return setCanvasRef
}

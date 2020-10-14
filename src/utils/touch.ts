export function handleTouchStart(event: TouchEvent) {
  event.preventDefault();

  const canvas = event.target as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Canvas is undefiend');
  }

  return touchPosition(canvas, event.touches[0]);
}

export function handleTouchMove(event: TouchEvent) {
  event.preventDefault();

  const canvas = event.target as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Canvas is undefiend');
  }

  return touchPosition(canvas, event.changedTouches[0]);
}

let canvasRect: DOMRect | undefined;

function touchPosition(canvas: HTMLCanvasElement, touch: Touch) {
  if (!canvasRect) {
    canvasRect = canvas.getBoundingClientRect();
  }

  return {
    offsetX: touch.pageX - canvasRect.left,
    offsetY: touch.pageY - canvasRect.top
  };
}
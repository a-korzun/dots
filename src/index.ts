import { canvasWidth, canvasHeight, ratio} from './constants';
import { Board } from './Board';
import { handleTouchMove, handleTouchStart } from './utils/touch';

(function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');

  if (!canvas) {
    return;
  }

  canvas.setAttribute('width', String(canvasWidth * ratio));
  canvas.setAttribute('height', String(canvasHeight * ratio));
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const board = new Board(ctx, canvasWidth, canvasHeight);

  console.log(board);

  canvas.addEventListener('mousedown', board.handleStart, false);
  canvas.addEventListener('mousemove', board.handleMove, false);
  canvas.addEventListener('mouseup', board.handleEnd, false);

  canvas.addEventListener('touchstart', event => board.handleStart(handleTouchStart(event)), false);
  canvas.addEventListener('touchmove', event => board.handleMove(handleTouchMove(event)), false);
  canvas.addEventListener('touchend', board.handleEnd, false);
  canvas.addEventListener('touchcancel', board.handleEnd, false);

  render(board);
})();

function render(board: Board) {
  board.render();

  requestAnimationFrame(render.bind(null, board));
}

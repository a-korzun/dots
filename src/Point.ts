import { pointSize, pointArea, columns } from './constants';
import { Color, randomColor } from './utils/color';
import { getX, getY } from './utils/coords';

export class Point {
  public x: number;
  public y: number;
  public color: Color;
  public connected: boolean = false;

  private prevY?: number;

  constructor(index: number) {
    this.x = getX(index - (columns * columns));
    this.y = getY(index - (columns * columns));

    this.moveTo(index)

    this.color = randomColor();
  }

  get actualCoords(): { x: number, y: number } {
    return {
      x: this.x * pointArea + pointArea / 2,
      y: this.y * pointArea + pointArea / 2
    };
  }

  setConnected(state: boolean) {
    this.connected = state;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    const coords = this.actualCoords;

    if (this.prevY !== undefined) {
      coords.y = this.prevY;
      this.prevY = this.prevY + (this.actualCoords.y - this.prevY) / 3;
    }

    if (this.prevY !== undefined && this.prevY >= this.actualCoords.y) {
      this.prevY = undefined;
    }

    if (this.connected) {
      ctx.globalAlpha = 0.2;

      const shadow = new Path2D();
      shadow.arc(
        coords.x,
        coords.y,
        pointSize + 4,
        0,
        2 * Math.PI
      );

      ctx.fill(shadow);

      ctx.globalAlpha = 1;
    }

    const point = new Path2D();
    point.arc(
      coords.x,
      coords.y,
      pointSize,
      0,
      2 * Math.PI
    );

    ctx.fill(point);
  }

  moveTo(index: number) {
    this.prevY = this.actualCoords.y;

    this.x = getX(index);
    this.y = getY(index);
  }

  isSibling(point: Point) {
    if (this.x === point.x && Math.abs(this.y - point.y) === 1) {
      return true;
    }

    if (this.y === point.y && Math.abs(this.x - point.x) === 1) {
      return true;
    }
  }
}

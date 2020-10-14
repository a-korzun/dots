import { ratio } from './constants';

interface Coordinates {
  x: number;
  y: number;
}

export class Segment {
  constructor(
    public from: Coordinates,
    public to: Coordinates,
  ) {}

  render(ctx: CanvasRenderingContext2D, color: string) {
    ctx.strokeStyle = color;
    ctx.lineWidth = ratio * 2;

    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }
}
import { columns, pointArea, ratio } from './constants';
import { Point } from './Point';
import { Segment } from './Segment';
import { Color } from './utils/color';
import { getIndex } from './utils/coords';

export class Board {
  private points: Array<Point | undefined>;
  private segments: Array<Segment> = [];

  public activeColor: Color = 'black';

  constructor(
    public ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number,
  ) {
    this.points = Array.from({ length: columns * columns }, (_, index) => new Point(index));
  }

  get lastSegment() {
    return this.segments[this.segments.length - 1];
  }

  handleStart = ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) => {
    const point = this.getPoint(offsetX * ratio, offsetY * ratio);

    if (!point) {
      return;
    }

    point.setConnected(true);

    const start = point.actualCoords;

    this.segments.push(new Segment(
      start,
      { x: offsetX * ratio, y: offsetY * ratio },
    ));

    this.activeColor = point.color;
  }

  handleMove = ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) => {
    if (!this.segments.length) {
      return;
    }

    const x = offsetX * ratio;
    const y = offsetY * ratio;

    this.lastSegment.to = { x, y };

    this.resolveAction(x, y);

    if (this.isLoop()) {
      this.connectAll();
    }
  }

  handleEnd = () => {
    this.removeSelected();
    this.movePointsToNewIndeces();
    this.fillBoard();

    this.points.forEach(p => p && p.setConnected(false));
    this.segments = [];

    this.activeColor = 'black';
  }

  render() {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.width * ratio, this.height * ratio);

    this.points.forEach(p => p && p.render(this.ctx));
    this.segments.forEach(s => s.render(this.ctx, this.activeColor));
  }

  getPoint(offsetX: number, offsetY: number): Point | undefined {
    const x = Math.floor(offsetX / pointArea);
    const y = Math.floor(offsetY / pointArea);

    const index = getIndex(x, y);

    return this.points[index];
  }

  resolveAction(x: number, y: number) {
    const prevPoint = this.getPoint(this.lastSegment.from.x, this.lastSegment.from.y);
    const nextPoint = this.getPoint(x, y);

    if (!prevPoint || !nextPoint) {
      return;
    }

    if (prevPoint === nextPoint) {
      return;
    }

    const connectable = prevPoint.isSibling(nextPoint) && prevPoint.color === nextPoint.color;

    if (!connectable) {
      return;
    }

    if (this.isBackwards(nextPoint)) {
      return this.disconnect(prevPoint);
    }

    return this.connect(nextPoint);
  }

  isBackwards(point: Point) {
    if (this.segments.length < 2) {
      return false;
    }

    const prevSegment = this.segments[this.segments.length - 2];

    const to = point.actualCoords;

    return prevSegment.from.x === to.x && prevSegment.from.y === to.y;
  }

  isLoop() {
    return this.segments
      .slice(0, this.segments.length - 1)
      .some(segment => segment.from.x === this.lastSegment.from.x && segment.from.y === this.lastSegment.from.y);
  }

  connectAll() {
    this.points.forEach(point => {
      if (point && point.color === this.activeColor) {
        point.setConnected(true);
      }
    });
  }

  connect(point: Point) {
    point.setConnected(true);

    const to = point.actualCoords;

    this.lastSegment.to = to;

    this.segments.push(new Segment(
      { ...this.lastSegment.to },
      { ...this.lastSegment.to },
    ));
  }

  disconnect(nextPoint: Point) {
    nextPoint.setConnected(false);

    this.segments.pop();
  }

  removeSelected() {
    const connected = this.points.filter(point => point && point.connected).length;

    if (connected < 2) {
      return;
    }

    this.points.forEach((point, index) => {
      if (point && point.connected) {
        this.points[index] = undefined;
      }
    });
  }

  movePointsToNewIndeces() {
    let q: number[] = [];


    for (let x = columns - 1; x >= 0; x--) {
      q = [];

      for (let y = columns - 1; y >= 0; y--) {
        const index = getIndex(x, y);
        const point = this.points[index];

        if (!point) {
          q.push(index);
          continue;
        }

        if (q.length) {
          const lastIndex = q.shift() as number;

          point.moveTo(lastIndex);
          this.points[lastIndex] = point;

          q.push(index);
          this.points[index] = undefined;
        }
      }
    }
  }

  fillBoard() {
    this.points.forEach((point, index) => {
      if (point) {
        return;
      }

      this.points[index] = new Point(index);
    });
  }
}
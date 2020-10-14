import { columns } from '../constants';

export const getX = (index: number) => index - (columns * Math.floor(index / columns));

export const getY = (index: number) => Math.floor(index / columns);

export const getIndex = (x: number, y: number) => y * columns + x;

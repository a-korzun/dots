const colors = {
  red: 'rgb(242, 50, 12)',
  blue: 'rgb(25, 135, 252)',
  green: 'rgb(13, 214, 57)',
  orange: 'rgb(255, 213, 0)',
  purple: 'rgb(255, 43, 241)',
} as const;

export type Color = typeof colors[keyof typeof  colors] | 'black';

export const randomColor = (): Color => Object.values(colors)[Math.ceil(Math.random() * 4)];

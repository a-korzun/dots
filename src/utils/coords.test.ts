import { getX, getY, getIndex } from './coords';

describe('coords', () => {
  test('getX', () => {
    expect(getX(0)).toBe(0);
    expect(getX(1)).toBe(1);
    expect(getX(2)).toBe(2);
    expect(getX(3)).toBe(3);
    expect(getX(4)).toBe(4);
    expect(getX(5)).toBe(0);
    expect(getX(6)).toBe(1);
    expect(getX(7)).toBe(2);
    expect(getX(8)).toBe(3);
    expect(getX(9)).toBe(4);
    expect(getX(10)).toBe(0);
    expect(getX(11)).toBe(1);
    expect(getX(12)).toBe(2);
    expect(getX(13)).toBe(3);
    expect(getX(14)).toBe(4);
    expect(getX(15)).toBe(0);
    expect(getX(16)).toBe(1);
    expect(getX(17)).toBe(2);
    expect(getX(18)).toBe(3);
    expect(getX(19)).toBe(4);
    expect(getX(20)).toBe(0);
    expect(getX(21)).toBe(1);
    expect(getX(22)).toBe(2);
    expect(getX(23)).toBe(3);
    expect(getX(24)).toBe(4);
  });

  test('getY', () => {
    expect(getY(0)).toBe(0);
    expect(getY(1)).toBe(0);
    expect(getY(2)).toBe(0);
    expect(getY(3)).toBe(0);
    expect(getY(4)).toBe(0);
    expect(getY(5)).toBe(1);
    expect(getY(6)).toBe(1);
    expect(getY(7)).toBe(1);
    expect(getY(8)).toBe(1);
    expect(getY(9)).toBe(1);
    expect(getY(10)).toBe(2);
    expect(getY(11)).toBe(2);
    expect(getY(12)).toBe(2);
    expect(getY(13)).toBe(2);
    expect(getY(14)).toBe(2);
    expect(getY(15)).toBe(3);
    expect(getY(16)).toBe(3);
    expect(getY(17)).toBe(3);
    expect(getY(18)).toBe(3);
    expect(getY(19)).toBe(3);
    expect(getY(20)).toBe(4);
    expect(getY(21)).toBe(4);
    expect(getY(22)).toBe(4);
    expect(getY(23)).toBe(4);
    expect(getY(24)).toBe(4);
  });


  test('getY', () => {
    expect(getIndex(0, 0)).toBe(0);
    expect(getIndex(1, 0)).toBe(1);
    expect(getIndex(2, 0)).toBe(2);
    expect(getIndex(3, 0)).toBe(3);
    expect(getIndex(4, 0)).toBe(4);
    expect(getIndex(0, 1)).toBe(5);
    expect(getIndex(1, 1)).toBe(6);
    expect(getIndex(2, 1)).toBe(7);
    expect(getIndex(3, 1)).toBe(8);
    expect(getIndex(4, 1)).toBe(9);
    expect(getIndex(0, 2)).toBe(10);
    expect(getIndex(1, 2)).toBe(11);
    expect(getIndex(2, 2)).toBe(12);
    expect(getIndex(3, 2)).toBe(13);
    expect(getIndex(4, 2)).toBe(14);
    expect(getIndex(0, 3)).toBe(15);
    expect(getIndex(1, 3)).toBe(16);
    expect(getIndex(2, 3)).toBe(17);
    expect(getIndex(3, 3)).toBe(18);
    expect(getIndex(4, 3)).toBe(19);
    expect(getIndex(0, 4)).toBe(20);
    expect(getIndex(1, 4)).toBe(21);
    expect(getIndex(2, 4)).toBe(22);
    expect(getIndex(3, 4)).toBe(23);
    expect(getIndex(4, 4)).toBe(24);
  });
});

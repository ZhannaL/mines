/* eslint-disable no-plusplus */

type GameFieldMines = '' | 'm' | number;

export const findEmptySlotIndex = (arrInd: Array<number>): number => {
  const index = Math.floor(Math.random() * arrInd.length);
  const indexToReturn = arrInd[index];
  arrInd.splice(index, 1);
  return indexToReturn;
};

export const getNumbersToField = (
  arr: Array<GameFieldMines>,
  width: number,
  height: number
): void => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (arr[width * j + i] !== 'm') {
        let count = 0;
        if (j > 0 && i > 0) {
          if (arr[width * (j - 1) + (i - 1)] === 'm') {
            count++;
          }
        }
        if (j > 0) {
          if (arr[width * (j - 1) + i] === 'm') {
            count++;
          }
        }
        if (j > 0 && i < height - 1) {
          if (arr[width * (j - 1) + (i + 1)] === 'm') {
            count++;
          }
        }
        if (i > 0) {
          if (arr[width * j + (i - 1)] === 'm') {
            count++;
          }
        }
        if (i < height - 1) {
          if (arr[width * j + (i + 1)] === 'm') {
            count++;
          }
        }
        if (j < width - 1 && i > 0) {
          if (arr[width * (j + 1) + (i - 1)] === 'm') {
            count++;
          }
        }
        if (j < width - 1) {
          if (arr[width * (j + 1) + i] === 'm') {
            count++;
          }
        }
        if (j < width - 1 && i < height - 1) {
          if (arr[width * (j + 1) + (i + 1)] === 'm') {
            count++;
          }
        }
        // eslint-disable-next-line no-param-reassign
        arr[width * j + i] = count;
      }
    }
  }
};

export const getIndexesAdjustment = (
  index: number,
  width: number,
  height: number
): Array<number> => {
  const arrayToReturn = [];

  const j = Math.floor(index / width);
  const i = Math.abs(width * j - index);

  if (j > 0 && i > 0) {
    arrayToReturn.push(width * (j - 1) + (i - 1));
  }
  if (j > 0) {
    arrayToReturn.push(width * (j - 1) + i);
  }
  if (j > 0 && i < height - 1) {
    arrayToReturn.push(width * (j - 1) + (i + 1));
  }
  if (i > 0) {
    arrayToReturn.push(width * j + (i - 1));
  }
  if (i < height - 1) {
    arrayToReturn.push(width * j + (i + 1));
  }
  if (j < width - 1 && i > 0) {
    arrayToReturn.push(width * (j + 1) + (i - 1));
  }
  if (j < width - 1) {
    arrayToReturn.push(width * (j + 1) + i);
  }
  if (j < width - 1 && i < height - 1) {
    arrayToReturn.push(width * (j + 1) + (i + 1));
  }

  return arrayToReturn;
};

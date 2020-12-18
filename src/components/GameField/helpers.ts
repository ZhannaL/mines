/* eslint-disable no-plusplus */
import { GameFieldStatus, GameFieldData } from 'src/hooks/types';

type GameFieldMines = '' | 'm' | number;

export const genaratedEmptyField = (
  width: number,
  height: number
): Array<{
  content: 0;
  status: 'close';
}> => {
  const fieldsElementsMines = new Array(width * height).fill('');
  const firstField = fieldsElementsMines.map(
    () =>
      ({
        content: 0,
        status: 'close',
      } as const)
  );
  return firstField;
};

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

export const getFieldWithOpenedSlot = (
  array: Array<GameFieldData>,
  indexToSet: number,
  width: number,
  height: number
): Array<GameFieldData> => {
  const copied = [...array];
  const innerFn = (indexToOpen: number) => {
    if (copied[indexToOpen].content !== 'm') {
      copied[indexToOpen] = { ...copied[indexToOpen], status: 'open' };
    }
    if (copied[indexToOpen].content === 0) {
      const indexes = getIndexesAdjustment(indexToOpen, width, height);
      indexes.forEach((index) => {
        if (copied[index].status !== 'open') {
          innerFn(index);
        }
      });
    }
    return copied;
  };
  innerFn(indexToSet);
  return copied;
};

export const getFieldFinishingGameByFault = (
  array: Array<GameFieldData>,
  indexFault: number
): Array<GameFieldData> => {
  return array.map((el, index) => {
    if (indexFault === index) {
      return { ...el, status: 'fault' };
    }
    if (el.content === 'm' && el.status !== 'flag') {
      return { ...el, status: 'mine' };
    }
    return el;
  });
};

export const getFieldWithNewStatus = (
  array: Array<GameFieldData>,
  indexToSet: number,
  statusToSet: GameFieldStatus
): Array<GameFieldData> => {
  return array.map((el, index) => {
    if (indexToSet === index) {
      return { content: el.content, status: statusToSet };
    }
    return el;
  });
};

export const generatedFieldsElements = (
  indexToSkip: number,
  width: number,
  height: number,
  mines: number
): Array<GameFieldData> => {
  const fieldsElementsMines = new Array(width * height).fill('');
  const arrayOfIndexes = fieldsElementsMines.map((el, ind) => ind);
  arrayOfIndexes.splice(indexToSkip, 1);
  for (let i = 0; i < mines; i++) {
    fieldsElementsMines[findEmptySlotIndex(arrayOfIndexes)] = 'm';
  }
  getNumbersToField(fieldsElementsMines, width, height);
  return fieldsElementsMines.map((el) => ({ content: el, status: 'close' }));
};

export const isMinesPlaced = (
  field: Array<GameFieldData>,
  mines: number
): boolean => {
  const closed = field.filter((el) => el.status === 'close');
  const setsMines = field.filter(
    (el) => el.status === 'flag' && el.content === 'm'
  );
  return closed.length === 0 && setsMines.length === mines;
};

export const getNewFieldAfterOpenedSlot = (
  field: Array<GameFieldData>,
  ind: number,
  width: number,
  height: number,
  element: GameFieldData,
  onFinishGame: (
    array: Array<GameFieldData>,
    index: number
  ) => Array<GameFieldData>
): Array<GameFieldData> => {
  let newField = getFieldWithOpenedSlot(field, ind, width, height);
  if (element.content === 'm') {
    newField = onFinishGame(field, ind);
  }
  if (element.status === 'open') {
    const indexesAdjustment = getIndexesAdjustment(ind, width, height);
    const flagsAround = indexesAdjustment.reduce((acc, indexAdj) => {
      if (field[indexAdj].status === 'flag') {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (flagsAround === Number(element.content)) {
      newField = field;
      indexesAdjustment.forEach((indexAdj) => {
        if (field[indexAdj].status !== 'close') return;
        if (field[indexAdj].content !== 'm') {
          newField = getFieldWithOpenedSlot(newField, indexAdj, width, height);
        }
        if (field[indexAdj].content === 'm') {
          newField = onFinishGame(newField, indexAdj);
        }
      });
    }
  }

  return newField;
};

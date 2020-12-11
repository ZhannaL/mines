export const updateUserNameInArr = (
  array: Array<{ time: number; user: string }>,
  userName: string
): Array<{ time: number; user: string }> => {
  const newArr = array.map((el) => {
    if (el.user === 'Your Result') {
      return { time: el.time, user: userName };
    }
    return el;
  });

  return newArr.reduce((acc, curr, ind) => {
    if (
      ind === 0 ||
      curr.time !== newArr[ind - 1].time ||
      curr.user !== newArr[ind - 1].user
    ) {
      acc.push(curr);
      return acc;
    }
    return acc;
  }, [] as Array<{ time: number; user: string }>);
};

export const sortByTime = (
  array: Array<{ time: number; user: string }>
): Array<{ time: number; user: string }> => {
  const sorted = [...array].sort((prev, curr) => prev.time - curr.time);
  return sorted;
};

export const getTop10 = (
  array: Array<{ time: number; user: string }>
): Array<{ time: number; user: string }> => {
  const sorted = sortByTime(array).filter((el) => el.time !== 0);
  return sorted.slice(0, 10);
};

export const isYourResultInTop10 = (
  array: Array<{ time: number; user: string }>
): boolean => {
  return !!array.filter((el) => el.user === 'Your Result').length;
};

import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import style from './buttonElementField.module.css';

type GameFieldElement = 'm' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type Props = Readonly<{
  onChange?: () => unknown;
  element: GameFieldElement;
}>;

export const ButtonElementField = ({
  onChange,
  element,
}: Props): JSX.Element => {
  return (
    <button type="button" className={style.fieldElement}>
      {element === 'm' ? <FlagIcon /> : ''}
    </button>
  );
};

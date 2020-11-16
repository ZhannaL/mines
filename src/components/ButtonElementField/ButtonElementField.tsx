import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import classnames from 'classnames';
import style from './buttonElementField.module.css';

export type GameFieldElement = 'm' | number;
export type GameFieldStatus = 'open' | 'close' | 'flag' | 'fault';
export type GameStatus = 'none' | 'started' | 'finished';

type Props = Readonly<{
  onChange: () => unknown;
  onChangeStatusToFlag: () => unknown;
  element: {
    content: GameFieldElement;
    status: GameFieldStatus;
  };
  gameStatus: GameStatus;
}>;

export const ButtonElementField = ({
  onChange,
  onChangeStatusToFlag,
  element,
  gameStatus,
}: Props): JSX.Element => {
  return (
    <button
      type="button"
      disabled={gameStatus === 'finished'}
      className={classnames(
        style.fieldElement,
        element.status === 'open' ? style.openedElement : ''
      )}
      onClick={() => {
        onChange();
      }}
      onContextMenuCapture={(event) => {
        event.preventDefault();
        onChangeStatusToFlag();
      }}
    >
      <b>
        {element.status === 'open'
          ? element.content === 0
            ? ''
            : element.content
          : ''}
      </b>
      {element.status === 'flag' || element.status === 'fault' ? (
        <FlagIcon color={element.status === 'fault' ? 'error' : 'inherit'} />
      ) : (
        ''
      )}
    </button>
  );
};

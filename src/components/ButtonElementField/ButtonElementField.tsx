import React, { useRef } from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import classnames from 'classnames';
import { GameFieldElement, GameFieldStatus, GameStatus } from 'src/hooks/types';
import style from './buttonElementField.module.css';

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
  const button = useRef(null);
  return (
    <button
      type="button"
      disabled={gameStatus === 'finished' || gameStatus === 'lost'}
      className={classnames(
        style.fieldElement,
        element.status === 'open' ? style.openedElement : '',
        element.status === 'open' && element.content === 0
          ? style.emptyElement
          : ''
      )}
      onClick={() => {
        if (element.status !== 'flag') {
          onChange();
        }
      }}
      onContextMenuCapture={(event) => {
        event.preventDefault();
        onChangeStatusToFlag();
      }}
      ref={button}
    >
      <div
        style={{
          fontSize: `${
            button.current ? button.current.clientWidth / 2 : '1em'
          }px`,
          lineHeight: '0.5',
          fontWeight: 'bold',
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {element.status === 'open'
          ? element.content === 0
            ? ' '
            : element.content
          : ' '}
      </div>
      {element.status === 'flag' || element.status === 'fault' ? (
        <FlagIcon color={element.status === 'fault' ? 'error' : 'inherit'} />
      ) : (
        ''
      )}
    </button>
  );
};

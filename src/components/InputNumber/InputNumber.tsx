/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import style from './inputNumber.module.css';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '9px 14px',
    '&::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
  root: {
    borderRadius: '0',
    maxWidth: '80px',
  },
  button: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    padding: '6px',
    minWidth: '0',
  },
}));

type Props = Readonly<{
  onChange: (number: number) => unknown;
  defaultValue?: number;
}>;

export const InputNumber = ({ onChange, defaultValue }: Props): JSX.Element => {
  const [amount, setAmount] = useState(defaultValue || 1);
  const classes = useStyles();

  return (
    <div>
      <Button
        onClick={() => {
          setAmount(amount > 1 ? amount - 1 : 1);
          onChange(amount > 1 ? amount - 1 : 1);
        }}
        variant="contained"
        color="primary"
        className={classnames(classes.button, style.leftBtn)}
      >
        <RemoveIcon />
      </Button>
      <TextField
        type="number"
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.root,
            input: classes.input,
          },
        }}
        value={amount}
        onChange={(event) => {
          const parsedValue = Number(event?.target.value);
          setAmount(parsedValue <= 0 ? 1 : parsedValue);
          onChange(parsedValue <= 0 ? 1 : parsedValue);
        }}
        inputProps={{
          min: 1,
        }}
      />
      <Button
        onClick={() => {
          setAmount(amount + 1);
          onChange(amount + 1);
        }}
        variant="contained"
        color="primary"
        className={classnames(classes.button, style.rightBtn)}
      >
        <AddIcon />
      </Button>
    </div>
  );
};

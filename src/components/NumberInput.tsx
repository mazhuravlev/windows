import * as React from 'react';
import '../styles/NumberInput.css';

import { IStyleObj } from '../interface';

interface IProps {
  id: string;
  value: number;
  min: number;
  max: number;
  style: IStyleObj;
  onChange: (value: number) => void;
}

const handleInc = (props: IProps) => () => {
  if (!props.onChange || !(props.onChange instanceof Function)) return;
  if (props.value >= props.max) return;
  props.onChange(props.value + 1);
};

const handleDec = (props: IProps) => () => {
  if (!props.onChange || !(props.onChange instanceof Function)) return;
  if (props.value <= props.min) return;
  props.onChange(props.value - 1);
};

// tslint:disable-next-line:function-name
function NumberInput(props: IProps) {
  return (
    <div id={props.id} style={props.style} className="number-input">
      <div className="ctl" onClick={handleDec(props)}>-</div>
      <div className="val">{props.value}</div>
      <div className="ctl" onClick={handleInc(props)}>+</div>
    </div>
  );
}

export default NumberInput;

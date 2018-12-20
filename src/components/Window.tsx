import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISize } from '../interface';

interface InjectedProps extends ISize {
  step: number;
  margin: INumObjType;
}

const Window = (props: InjectedProps & React.HTMLProps<HTMLDivElement>) => {
  const { step, className, margin, width, height } = props;

  const syleObj = {
    ...buildSizeStyleObj({ width, height }, step),
    ...buildSizeStyleObj(margin, step),
  };
  return (
    <div style={syleObj} className={className} />
  );
};

export default Window;

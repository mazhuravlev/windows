import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';

interface InjectedProps {
  width: number;
  height: number;
  step: number;
}

// tslint:disable-next-line:variable-name
const Window = (props: InjectedProps & React.HTMLProps<HTMLDivElement>) => {
  const { step, className, ...size } = props;
  return (
    <div style={buildSizeStyleObj(size, step)} className={className} />
  );
};

export default Window;

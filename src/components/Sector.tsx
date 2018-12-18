import * as React from 'react';

// import { buildSizeStyleObj } from '../helpers';
import { ISector } from './ColorInsertEditor';

interface IProps {
  sector: ISector;
  step: number;
}

// tslint:disable-next-line:variable-name
const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step } = props;
  const objStyle = {
    gridArea: `sector${sector.id}`,
    height: sector.padding * step,
    width: sector.width * step,
  };
  return (
    <div key={sector.id} style={objStyle} className={className}>{''}</div>
  );
};

export default Sector;

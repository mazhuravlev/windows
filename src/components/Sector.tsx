import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISector } from '../interface';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
}

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize } = props;
  const objStyle = {
    gridArea: `sector${sector.id}`,
    ...buildSizeStyleObj(sectorSize, step),
  };
  return (
    <div
      key={sector.id}
      style={{ ...objStyle }}
      className={className}
    >
      {''}
    </div>
  );
};

export default Sector;

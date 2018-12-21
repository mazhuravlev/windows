import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISector } from '../interface';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
  gridArea: number;
}

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea } = props;
  const objStyle = {
    gridArea: `sector${gridArea}`,
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

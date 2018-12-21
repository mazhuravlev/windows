import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISector, ITextureList } from '../interface';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
  gridArea: number;
  textureList: ITextureList;
}

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea, textureList } = props;
  const url = textureList[sector.id] ? textureList[sector.id].url : '';
  const objStyle = {
    gridArea: `sector${gridArea}`,
    backgroundImage: `url(${url})`,
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

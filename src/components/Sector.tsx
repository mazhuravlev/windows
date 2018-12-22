import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISector, IStyleObj, ITexture, ITextureList } from '../interface';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
  gridArea: number;
  textureList: ITextureList;
}

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea, textureList } = props;

  let styleObj: IStyleObj = {
    gridArea: `sector${gridArea}`,
    ...buildSizeStyleObj(sectorSize, step),
  };

  if (textureList[sector.id]) {
    const texture = textureList[sector.id] as ITexture;
    const { url, VOffset, HOffset } = texture;
    styleObj = {
      ...styleObj,
      backgroundImage: `url(${url})`,
      backgroundPosition: `left ${HOffset * step}px top ${VOffset * step}px`,
    };
  }
  return (
    <div
      key={sector.id}
      style={{ ...styleObj }}
      className={className}
    >
      {''}
    </div>
  );
};

export default Sector;

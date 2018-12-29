import * as React from 'react';

import { BRICK } from 'src/static';
import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISector, IStyleObj, ITexture, ITextureList } from '../interface';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
  gridArea: number;
  textureList: ITextureList;
  textureType: string;
  currentSector: number;
}

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea, textureList, onClick, currentSector } = props;

  const boxShadow = 'inset 0px 0px 0px 2px red';
  let styleObj: IStyleObj = {
    gridArea: `sector${gridArea}`,
    ...buildSizeStyleObj(sectorSize, step),
    boxShadow: currentSector === Number(sector.id) ? boxShadow : '',
  };

  if (textureList[sector.id]) {
    const texture = textureList[sector.id] as ITexture;
    const { url, VOffset, HOffset } = texture;
    styleObj = {
      ...styleObj,
      background: `url(${url}) ${props.textureType === BRICK ? '100% 100%' : '133% 133%'}`,
      backgroundPosition: `left ${HOffset * step}px top ${VOffset * step}px`,
    };
  }
  return (
    <div
      key={sector.id}
      style={styleObj}
      className={className}
      onClick={onClick}
    >
      {''}
    </div>
  );
};

export default Sector;

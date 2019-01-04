import * as React from 'react';

import { BRICK, BRICK_SIZE, TILE_SIZE } from 'src/static';
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

const getTextureSize = (textureType: string, texture: ITexture, ratio: number): string => {
  return `${textureType === BRICK ?
    `${texture.width}px ${texture.height}px`
    : `${texture.width * ratio}px ${texture.height * ratio}px`}`;
};

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea, textureList, onClick, currentSector } = props;

  const boxShadow = 'inset 0px 0px 0px 3px red';
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
      backgroundImage: `url(${url})`,
      backgroundSize: getTextureSize(props.textureType, texture, TILE_SIZE / BRICK_SIZE),
      backgroundPosition: `left ${HOffset * step}px top ${VOffset * step}px`,
    };
  }
  return (
    <div
      key={sector.id}
      style={styleObj}
      className={`${className}`}
      onClick={onClick}
    >
      {''}
    </div>
  );
};

export default Sector;

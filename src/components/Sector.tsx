import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
// import { getOffsetInWindowAxes } from '../helpers/coordinateСonverter';
import { INumObjType, ISector, ISectorTexture, IStyleObj, ITexture, ITextureList } from '../interface';
import { BRICK, BRICK_SIZE, TILE_SIZE } from '../static';

interface IProps {
  sector: ISector;
  step: number;
  sectorSize: INumObjType;
  gridArea: number;
  textureList: ITextureList;
  textureType: string;
  currentSector: number;
  textureOffset: Partial<ISectorTexture>;
}

const getTextureSize = (textureType: string, texture: ITexture, ratio: number): string => {
  return `${textureType === BRICK ?
    `${texture.width}px ${texture.height}px`
    : `${texture.width * ratio}px ${texture.height * ratio}px`}`;
};

const Sector = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sector, className, step, sectorSize, gridArea, textureList, onClick, currentSector } = props;

  const boxShadow = 'inset 0px 0px 0px 4px black';
  let styleObj: IStyleObj = {
    gridArea: `sector${gridArea}`,
    ...buildSizeStyleObj(sectorSize, step),
    boxShadow: currentSector === Number(sector.id) ? boxShadow : '',
  };

  if (textureList[sector.id]) {
    const texture = textureList[sector.id];
    const { url } = texture;
    styleObj = {
      ...styleObj,
      backgroundImage: `url(${url})`,
      backgroundSize: getTextureSize(props.textureType, texture, TILE_SIZE / BRICK_SIZE),
      backgroundPosition: `left ${props.textureOffset.HOffset as number * step}px bottom ${props.textureOffset.VOffset as number * step}px`,
    };
  }
  return (
    <div
      key={sector.id}
      style={styleObj}
      className={`${className}`}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
};

export default Sector;

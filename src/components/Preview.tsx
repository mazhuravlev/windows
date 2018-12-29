import * as React from 'react';
import Sector from './Sector';
import Window from './Window';

import { getSectorSize } from 'src/helpers';
import { ISectorList, ISideSize, ITextureList, IWindowSize } from '../interface';
import { BRICK, BRICK_SIZE, DOUBLE_WINDOW, TILE, TILE_SIZE, WINDOW } from '../static';

const shiftGridPosition = (sector: number, paddind: number): number => {
  if (paddind === 0) {
    switch (sector) {
      case 5: return 3;
      case 8: return 7;
      case 13: return 11;
      default: return sector;
    }
  }
  return sector;
};

const getStepSize = (textureType: string): number => {
  switch (textureType) {
    case BRICK: return BRICK_SIZE;
    case TILE: return TILE_SIZE;
    default: return 0;
  }
};

const getWindowSize = (textureType: string, windowType: string): IWindowSize => {
  // for double width = 32- padding - sector7Width
  if (textureType === BRICK && windowType === WINDOW) {
    return { width: 32, height: 24, padding: 0 };
  }
  if (textureType === BRICK && windowType === DOUBLE_WINDOW) {
    return { width: 28, height: 24, padding: 8 };
  }
  if (textureType === TILE && windowType === WINDOW) {
    return { width: 24, height: 18, padding: 0 };
  }
  // DOUBLE_WINDOW and TILE (default)
  return { width: 21, height: 18, padding: 6 };
};

const getSector7Width = (textureType: string): number => {
  switch (textureType) {
    case BRICK: return 4;
    case TILE: return 3;
    default: return 0;
  }
};

interface IProps {
  sectorList: ISectorList;
  textureType: string;
  windowType: string;
  side: ISideSize;
  textureList: ITextureList;
  currentSector: number;
  handleClick: (sectorId: string) => (event: React.FormEvent<HTMLDivElement>) => void;
}

const Preview = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sectorList, className, side, handleClick, textureType, windowType } = props;
  const step = getStepSize(textureType);
  const window = getWindowSize(textureType, windowType);
  const sizeWindow1 = {
    width: window.width - window.padding,
    height: window.height,
  };
  const sizeWindow2 = {
    width: window.padding,
    height: window.height,
  };
  const marginWindow1 = {
    marginTop: side.topMargin,
    marginRight: window.padding === 0 ? side.rightMargin : 0,
    marginBottom: side.bottomMargin,
    marginLeft: side.leftMargin,
  };
  const marginWindow2 = {
    marginTop: side.topMargin,
    marginRight: window.padding === 0 ? 0 : side.rightMargin,
    marginLeft: side.middleMargin,
    marginBottom: side.bottomMargin,
  };
  const sector7Width = getSector7Width(textureType);
  return (
    <div style={props.style} className={className}>
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          const sectorNumber = Number(key);
          const size = getSectorSize(side, sectorNumber, window.padding, sector7Width);
          return (
            <Sector
              key={sector.id}
              textureType={textureType}
              sector={sector}
              step={step}
              className={
                `preview-container-item sector${sectorNumber}`}
              sectorSize={size}
              currentSector={props.currentSector}
              textureList={props.textureList}
              onClick={handleClick(sector.id)}
              gridArea={shiftGridPosition(sectorNumber, window.padding)}
            />
          );
        })
      }
      <Window margin={marginWindow1} {...sizeWindow1} step={step} className="window1" />
      <Window margin={marginWindow2}{...sizeWindow2} step={step} className="window2" />
    </div>
  );
};

export default Preview;

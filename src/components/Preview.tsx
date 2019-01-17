import * as React from 'react';
import Sector from './Sector';
import Window from './Window';

import { getGridItemSize, getSectorSize } from '../helpers';
import { ISectorList, ISideSize, ITextureList, IWindowSize } from '../interface';
import { BRICK, BRICK_SIZE, DOUBLE_WINDOW, PREVIEW_MAX_SECTOR_SIZE as PREVIEW_MAX_MARGIN, TILE, TILE_SIZE, WINDOW } from '../static';

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

const getPreviewPosition = (side: ISideSize, step: number) => {
  const { leftWidth, leftMargin, topMargin, topWidth } = side;
  const top = PREVIEW_MAX_MARGIN - (topMargin + topWidth) * step;
  const left = PREVIEW_MAX_MARGIN - (leftWidth + leftMargin) * step;
  return { top, left };
};

const getArrowForSector = (selectedSector: number, sectorId: number, textureList: ITextureList): string => {
  if (selectedSector !== sectorId) return '';
  if (!textureList[selectedSector]) return 'arrow';
  return textureList[selectedSector].root === 'sector' ? 'arrow' : '';
};

const getArrowForWindow = (selectedSector: number, textureList: ITextureList): boolean => {
  if (!textureList[selectedSector]) return false;
  return textureList[selectedSector].root === 'window';
};

interface IProps {
  sectorList: ISectorList;
  textureType: string;
  windowType: string;
  side: ISideSize;
  textureList: ITextureList;
  currentSector: number;
  gridHide: boolean;
  handleClick: (sectorId: number) => (event: React.FormEvent<HTMLDivElement>) => void;
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
  const previewPosition = getPreviewPosition(side, step);
  return (
    <div style={{ ...previewPosition }} className={className}>
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
                `preview-container-item
                sector${sectorNumber}
                ${getArrowForSector(props.currentSector, sectorNumber, props.textureList)}`}
              sectorSize={size}
              currentSector={props.currentSector}
              textureList={props.textureList}
              onClick={handleClick(sector.id)}
              gridArea={shiftGridPosition(sectorNumber, window.padding)}
            >
              <div
                className={`${props.gridHide ? 'grid-item' : `sector${sectorNumber}-grid-mask grid-item`} `}
                style={getGridItemSize(sectorNumber, side, windowType, step, props.gridHide)}
              >
                {''}
              </div>
            </Sector>
          );
        })
      }
      <Window
        margin={marginWindow1}
        {...sizeWindow1}
        step={step}
        className="window1"
        arrowVisible={getArrowForWindow(props.currentSector, props.textureList)}
      />
      <Window
        margin={marginWindow2}
        {...sizeWindow2}
        step={step}
        className="window2"
        arrowVisible={false}
      />
    </div>
  );
};

export default Preview;

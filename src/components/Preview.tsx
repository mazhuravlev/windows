import * as React from 'react';
import Sector from './Sector';
import Window from './Window';

import { getGridItemSize, getSectorSize } from '../helpers';
import { getOffsetInWindowAxes, getWindowSize } from '../helpers/coordinateСonverter';
import { ISectorList, ISectorTexture, ISideSize, ITextureList, IWindowParams, TextureType, WindowType } from '../interface';
import { BRICK, BRICK_SIZE, DOUBLE_WINDOW, PREVIEW_MAX_SECTOR_SIZE as PREVIEW_MAX_MARGIN, TILE, TILE_SIZE, WINDOW } from '../static';

const shiftGridPosition = (sector: number, windowType: WindowType): number => {
  if (windowType === WINDOW) {
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

const getTextureOffset = (sectorId: number, textureList: ITextureList, side: ISideSize, window: IWindowParams): Partial<ISectorTexture> => {
  if (textureList[sectorId]) {
    const texture = textureList[sectorId];
    return texture.root === 'window' ?
      getOffsetInWindowAxes(texture, side, window)
      : { VOffset: texture.VOffset, HOffset: texture.HOffset };
  }
  return { HOffset: 0, VOffset: 0 };
};

interface IProps {
  sectorList: ISectorList;
  textureType: TextureType;
  windowType: WindowType;
  side: ISideSize;
  textureList: ITextureList;
  currentSector: number;
  gridHide: boolean;
  handleClick: (sectorId: number) => (event: React.FormEvent<HTMLDivElement>) => void;
}

const Preview = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sectorList, className, side, handleClick, textureType, windowType } = props;
  const step = getStepSize(textureType);
  const window = getWindowSize(windowType, textureType);

  const marginWindow1 = {
    marginTop: side.topMargin,
    marginRight: windowType === WINDOW ? side.rightMargin : 0,
    marginBottom: side.bottomMargin,
    marginLeft: side.leftMargin,
  };
  const marginWindow2 = {
    marginTop: side.topMargin,
    marginRight: windowType === DOUBLE_WINDOW ? side.rightMargin : 0,
    marginLeft: side.middleMargin,
    marginBottom: side.bottomMargin,
  };
  const sector7Width = getSector7Width(textureType);
  const previewPosition = getPreviewPosition(side, step);
  return (
    <div id="colorPrewiew" style={{ ...previewPosition }} className={className}>
      {
        Object.keys(sectorList).map((sectorId) => {
          const sector = sectorList[sectorId];
          const sectorNumber = Number(sectorId);
          const size = getSectorSize(side, sectorNumber, windowType, sector7Width);
          const textureOffset = getTextureOffset(sectorNumber, props.textureList, side, window);
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
              gridArea={shiftGridPosition(sectorNumber, windowType)}
              textureOffset={textureOffset}
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
        {...{ width: window.width1, height: window.height }}
        step={step}
        className="window1"
        arrowVisible={getArrowForWindow(props.currentSector, props.textureList)}
      />
      <Window
        margin={marginWindow2}
        // {...sizeWindow2}
        {...{ width: window.width2, height: window.height }}
        step={step}
        className="window2"
        arrowVisible={false}
      />
    </div>
  );
};

export default Preview;

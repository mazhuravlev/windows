import * as React from 'react';
import Sector from './Sector';
import Window from './Window';

import { INumObjType, ISectorList, ISideSize, ITextureList, IWindowSize } from '../interface';

const getSectorSize = (side: ISideSize, sector: number, padding: number): INumObjType => {
  switch (sector) {
    case 1: {
      return { width: side.leftWidth };
    }
    case 2: {
      return { height: side.topWidth };
    }
    case 3: {
      const height = padding === 0 ? 0 : side.topWidth;
      return { height };
    }
    case 4: {
      const height = padding === 0 ? 0 : side.topWidth;
      return { height };
    }
    case 5: {
      return { width: side.rightWidth };
    }
    case 6: {
      return { width: side.leftWidth };
    }
    case 7: {
      const width = padding === 0 ? 0 : side.middleWidth;
      return { width };
    }
    case 8: {
      return { width: side.rightWidth };
    }
    case 9: {
      return { width: side.leftWidth };
    }
    case 10: {
      return { height: side.bottomWidth };
    }
    case 11: {
      const height = padding === 0 ? 0 : side.bottomWidth;
      return { height };
    }
    case 12: {
      const height = padding === 0 ? 0 : side.bottomWidth;
      return { height };
    }
    case 13: {
      return { width: side.rightWidth };
    }
    default: return {};
  }
};

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

interface IProps {
  sectorList: ISectorList;
  step: number;
  window: IWindowSize;
  side: ISideSize;
  textureList: ITextureList;
}

const Preview = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sectorList, step, className, window, side } = props;
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
  return (
    <div style={props.style} className={className}>
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          const sectorNumber = Number(key);
          const size = getSectorSize(side, sectorNumber, window.padding);
          return (
            <Sector
              key={sector.id}
              sector={sector}
              step={step}
              className={
                `preview-container-item sector${sectorNumber}`}
              sectorSize={size}
              gridArea={shiftGridPosition(sectorNumber, window.padding)}
              textureList={props.textureList}
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

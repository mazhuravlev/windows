import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISectorList, ISideSize, IWindowSize } from '../interface';

const getSectorSize = (side: ISideSize, sector: number, padding: number): INumObjType => {
  switch (sector) {
    case 1: {
      return { width: side.leftWidth };
    }
    case 2: {
      return { height: side.topWidth };
    }
    case 3: {
      return { height: side.topWidth };
    }
    case 4: {
      return { height: side.topWidth };
    }
    case 5: {
      return { width: side.rightWidth };
    }
    case 6: {
      return { width: side.leftWidth };
    }
    case 7: {
      return { width: side.middleWidth };
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
      return { height: side.bottomWidth };
    }
    case 12: {
      return { height: side.bottomWidth };
    }
    case 13: {
      return { width: side.rightWidth };
    }
    default: return {};
  }
};

interface IProps {
  sectorList: ISectorList;
  step: number;
  window: IWindowSize;
  side: ISideSize;
  handleClick: (sectorId: string) => () => void;
}

const Preview = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sectorList, step, className, window, side, handleClick } = props;
  return (
    <div style={props.style} className={className}>
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          const sectorNumber = Number(key);
          const size = getSectorSize(side, sectorNumber, window.padding);
          const objStyle = {
            gridArea: `sector${key}`,
            ...buildSizeStyleObj(size, step),
          };
          return (
            <div
              key={sector.id}
              style={{ ...objStyle }}
              className={`preview-container-item sector${sectorNumber}`}
              onClick={handleClick(sector.id)}
            >
              {''}
            </div>
          );
        })
      }
      <div style={buildSizeStyleObj({ width: 4, height: 4 }, step)} className="window1" />
      <div style={buildSizeStyleObj({ width: 4, height: 4 }, step)} className="window2" />
    </div>
  );
};

export default Preview;

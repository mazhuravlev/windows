import * as React from 'react';

import { buildSizeStyleObj } from '../helpers';
import { INumObjType, ISectorList } from '../interface';

const side = {
  bottomWidth: 1,
  bottomMargin: 0,
  leftWidth: 1,
  leftMargin: 0,
  middleWidth: 1,
  middleMargin: 0,
  rightWidth: 1,
  rightMargin: 0,
  topWidth: 1,
  topMargin: 0,
};

const getSectorSize = (sector: number): INumObjType => {
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
  handleClick: (sectorId: string) => () => void;
}

const Preview = (props: IProps & React.HTMLProps<HTMLDivElement>) => {
  const { sectorList, step, className, handleClick } = props;
  return (
    <div style={props.style} className={className}>
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          const sectorNumber = Number(key);
          const size = getSectorSize(sectorNumber);
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

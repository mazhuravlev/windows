import * as React from 'react';
import Sector from './Sector';
import Window from './Window';

import { INumObjType, ISectorList, ISideSize, IWindowSize } from '../interface';

const getSectorSize = (side: ISideSize, i: number, padding: number): INumObjType => {
  switch (i) {
    case 2: {
      return { height: side.topWidth };
    }
    case 3: {
      return { height: side.topWidth };
    }
    case 6: {
      return { width: side.leftWidth };
    }
    case 7: {
      return { width: side.middleWidth };
    }
    case 8: {
      const width = padding === 0 ? 0 : side.rightWidth;
      return { width };
    }
    case 10: {
      return { height: side.bottomWidth };
    }
    case 11: {
      return { height: side.bottomWidth };
    }
    default: return {};
  }
};

interface IProps {
  sectorList: ISectorList;
  step: number;
  window: IWindowSize;
  side: ISideSize;
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
    marginRight: side.middleMargin,
    marginBottom: side.bottomMargin,
    marginLeft: side.leftMargin,
  };
  const marginWindow2 = {
    marginTop: side.topMargin,
    marginRight: window.padding === 0 ? 0 : side.rightMargin,
    marginLeft: window.padding === 0 ? 0 : side.middleMargin,
    marginBottom: side.bottomMargin,
  };
  return (
    <div style={props.style} className={className}>
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          const size = getSectorSize(side, Number(key), window.padding);
          return (
            <Sector
              key={sector.id}
              sector={sector}
              step={step}
              className={`preview-container-item sector${key}`}
              sectorSize={size}
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

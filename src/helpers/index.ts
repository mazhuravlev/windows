import { INumObjType, ISideSize } from '../interface';

export const buildSizeStyleObj = (sizeObj: INumObjType, step: number) => {
  return Object.keys(sizeObj).reduce((acc, key) =>
    ({ ...acc, [key]: `${sizeObj[key] * step}px` }
  ),                                 {});
};

export const getSectorSize = (side: ISideSize, sector: number, padding: number, sector7Width: number): INumObjType => {
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
      const width = padding === 0 ? 0 : sector7Width;
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

import { INumObjType, ISideSize, ISize, ITexture, TextureType, WindowType } from '../interface';
import { BRICK, BRICK_SIZE, TILE_SIZE, WINDOW } from '../static';

export const buildSizeStyleObj = (sizeObj: INumObjType, step: number) => {
  return Object.keys(sizeObj).reduce((acc, key) =>
    ({ ...acc, [key]: `${sizeObj[key] * step}px` }
    ),                               {});
};

export const getSectorSize = (side: ISideSize, sector: number, windowType: WindowType, sector7Width: number): INumObjType => {
  switch (sector) {
    case 1: {
      return { width: side.leftWidth };
    }
    case 2: {
      return { height: side.topWidth };
    }
    case 3: {
      const height = windowType === WINDOW ? 0 : side.topWidth;
      return { height };
    }
    case 4: {
      const height = windowType === WINDOW ? 0 : side.topWidth;
      return { height };
    }
    case 5: {
      return { width: side.rightWidth };
    }
    case 6: {
      return { width: side.leftWidth };
    }
    case 7: {
      const width = windowType === WINDOW ? 0 : sector7Width;
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
      const height = windowType === WINDOW ? 0 : side.bottomWidth;
      return { height };
    }
    case 12: {
      const height = windowType === WINDOW ? 0 : side.bottomWidth;
      return { height };
    }
    case 13: {
      return { width: side.rightWidth };
    }
    default: return {};
  }
};

export const getGridItemStyle = (sector: number, sideSize: ISideSize, windowType: string, step: number, hide: boolean): any => {
  if (hide) return { width: 0, height: 0 };
  switch (sector) {
    case 1: {
      const width = 120 - sideSize.leftMargin * step;
      const height = 120 - sideSize.topMargin * step;
      return { width, height };
    }
    case 2: {
      const height = 120 - sideSize.topMargin * step;
      const width = windowType === WINDOW ?
        480 + (sideSize.leftMargin + sideSize.rightMargin) * step
        : 300 + sideSize.leftMargin * step;
      return { width, height };
    }
    case 3: {
      const width = 60;
      const height = 120 - sideSize.topMargin * step;
      return windowType === WINDOW ? { width: 0, height: 0, border: 'none' } : { width, height };
    }
    case 4: {
      const width = 120 + sideSize.rightMargin * step;
      const height = 120 - sideSize.topMargin * step;
      return windowType === WINDOW ? { width: 0, height: 0, border: 'none' } : { width, height };
    }
    case 5: {
      const width = 120 - sideSize.rightMargin * step;
      const height = 120 - sideSize.topMargin * step;
      return { width, height };
    }
    case 6: {
      const width = 120 - sideSize.leftMargin * step;
      const height = 360 + (sideSize.topMargin + sideSize.bottomMargin) * step;
      return { width, height };
    }
    case 7: {
      const width = 60;
      const height = 360 + (sideSize.topMargin + sideSize.bottomMargin) * step;
      return windowType === WINDOW ? { width: 0, height: 0 } : { width, height };
    }
    case 8: {
      const width = 120 - sideSize.rightMargin * step;
      const height = 360 + (sideSize.topMargin + sideSize.bottomMargin) * step;
      return { width, height };
    }
    case 9: {
      const width = 120 - sideSize.leftMargin * step;
      const height = 120 - sideSize.bottomMargin * step;
      return { width, height };
    }
    case 10: {
      const height = 120 - sideSize.bottomMargin * step;
      const width = windowType === WINDOW ?
        480 + (sideSize.leftMargin + sideSize.rightMargin) * step
        : 300 + sideSize.leftMargin * step;
      return { width, height };
    }
    case 11: {
      const width = 60;
      const height = 120 - sideSize.bottomMargin * step;
      return windowType === WINDOW ? { width: 0, height: 0 } : { width, height };
    }
    case 12: {
      const width = 120 + sideSize.rightMargin * step;
      const height = 120 - sideSize.bottomMargin * step;
      return windowType === WINDOW ? { width: 0, height: 0 } : { width, height };
    }
    case 13: {
      const width = 120 - sideSize.rightMargin * step;
      const height = 120 - sideSize.bottomMargin * step;
      return { width, height };
    }
    default: return { width: 0, height: 0 };
  }
};

export const getRealSectorSize = (sector: number, sideSize: ISideSize, windowType: string, step: number) => {
  document.getElementsByClassName('sector1');
};

export const isEmptyTexture = (texture: ITexture): boolean => {
  const { url, fileName } = texture;
  return url === '' && fileName === '';
};

export const getSectorSizeInMM = (sizeInPx: number, textureType: TextureType): number => {
  const itemCount = sizeInPx / (textureType === BRICK ? BRICK_SIZE : TILE_SIZE);
  return itemCount * (textureType === BRICK ? 75 : 100);
};

export const checkOverSize = (side: ISideSize, textureType: TextureType): boolean => {
  const maxSize = textureType === BRICK ? 8 : 6;
  return [
    side.leftMargin + side.leftWidth > maxSize,
    side.topMargin + side.topWidth > maxSize,
    side.rightMargin + side.rightWidth > maxSize,
    side.bottomMargin + side.bottomWidth > maxSize,
  ].some(item => item);
};

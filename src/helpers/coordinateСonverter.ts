import { ISectorTexture, ISideSize, IWindowParams, TextureType, WindowType } from '../interface';
import { BRICK, WINDOW } from '../static';

export const getWindowSize = (windowType: WindowType, textureType: TextureType): IWindowParams => {
  let width1;
  let width2;

  const height = textureType === BRICK ? 24 : 18;
  const spaceBetween = textureType === BRICK ? 4 : 3;

  if (windowType === WINDOW) {
    width1 = textureType === BRICK ? 32 : 24,
    width2 = 0;
    return { width1, width2, height, spaceBetween: 0 };
  }
  width1 = textureType === BRICK ? 20 : 15;
  width2 = textureType === BRICK ? 8 : 6;

  return { width1, width2, height, spaceBetween };
};

export const getOffsetInWindowAxes = (texture: ISectorTexture, side: ISideSize, window: IWindowParams, textureType: TextureType): Partial<ISectorTexture> => {
  const { VOffset, HOffset } = texture;
  const textureHSize = texture.width / 15;
  const textureVSize = texture.height / 15;
  switch (texture.sectorId) {
    case 1: {
      const x = - (textureHSize - (side.leftWidth + side.leftMargin)) + HOffset;
      const y = - (textureVSize + window.height + side.topMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 2: {
      const x = - (textureHSize - side.leftMargin) + HOffset;
      const y = - (textureVSize + window.height + side.topMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 3: {
      const x = - (textureHSize + window.width1) + HOffset;
      const y = - (textureVSize + window.height + side.topMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 4: {
      const x = - (textureHSize + window.width1 + window.spaceBetween) + HOffset;
      const y = - (textureVSize + window.height + side.topMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 5: {
      const x = - (textureHSize + window.width1 + window.spaceBetween + window.width2 + side.rightMargin) + HOffset;
      const y = - (textureVSize + textureVSize + window.height + side.topMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 6: {
      const x = - (textureHSize - (side.leftWidth + side.leftMargin)) + HOffset;
      const y = - (textureVSize - side.bottomMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 7: {
      const x = - (textureHSize + window.width1) + HOffset;
      const y = - (textureVSize - side.bottomMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 8: {
      const x = - (textureHSize + window.width1 + window.spaceBetween + window.width2 + side.rightMargin) + HOffset;
      const y = - (textureVSize - side.bottomMargin) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 9: {
      const x = - (textureHSize - (side.leftWidth + side.leftMargin)) + HOffset;
      const y = - (textureVSize - (side.bottomMargin + side.bottomWidth)) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 10: {
      const x = - (textureHSize - side.leftMargin) + HOffset;
      const y = - (textureVSize - (side.bottomMargin + side.bottomWidth)) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 11: {
      const x = - (textureHSize + window.width1) + HOffset;
      const y = - (textureVSize - (side.bottomMargin + side.bottomWidth)) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 12: {
      const x = - (textureHSize + window.width1 + window.spaceBetween) + HOffset;
      const y = - (textureVSize - (side.bottomMargin + side.bottomWidth)) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    case 13: {
      const x = - (textureHSize + window.width1 + window.spaceBetween + window.width2 + side.rightMargin) + HOffset;
      const y = - (textureVSize - (side.bottomMargin + side.bottomWidth)) + VOffset;
      return { HOffset: x, VOffset: y };
    }
    default: return {};
  }
};

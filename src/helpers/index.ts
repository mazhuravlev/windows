import { INumObjType } from '../interface';

export const buildSizeStyleObj = (sizeObj: INumObjType, step: number) => {
  return Object.keys(sizeObj).reduce((acc, key) =>
    ({ ...acc, [key]: `${sizeObj[key] * step}px` }
  ),                                 {});
};

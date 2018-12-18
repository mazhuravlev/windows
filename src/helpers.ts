interface ISize {
  width: number;
  height: number;
}

export const buildSizeStyleObj = (sizeObj: ISize, step: number) => (
  Object.keys(sizeObj).reduce((acc, key) => ({ ...acc, [key]: `${sizeObj[key] * step}px` }), {}));

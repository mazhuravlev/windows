import { ISectorList } from '../interface';

const initSectorList = () : ISectorList => {
  let initList: ISectorList = {};

  for (let i = 1; i <= 13; i += 1) {
    initList = { ...initList, [i]: { id: i } };
  }
  return initList;
};

export const SECTOR_LIST = initSectorList();

export const BRICK = 'brick';

export const TILE = 'tile';

export const WINDOW = 'window';

export const DOUBLE_WINDOW = 'double_window';

// export const WINDOW_SIZE = { width: 32, height: 24, padding: 0 };

// export const DOUBLE_WINDOW_SIZE = { width: 20, height: 24, padding: 8 };

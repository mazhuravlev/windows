import { ISectorList } from '../interface';

const initSectorList = (): ISectorList => {
  let initList: ISectorList = {};

  for (let i = 1; i <= 13; i += 1) {
    initList = { ...initList, [i]: { id: i, root: 'window' } };
  }
  return initList;
};

export const SECTOR_LIST = initSectorList();

export const BRICK = 'brick';

export const TILE = 'tile';

export const WINDOW = 'window';

export const DOUBLE_WINDOW = 'double_window';

// item size in pixels
export const BRICK_SIZE = 15;

export const TILE_SIZE = 20;

// (600mm/75)*15px
export const PREVIEW_MAX_SECTOR_SIZE = 120;

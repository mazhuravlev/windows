import { Base64 } from 'js-base64';
import * as uuid from 'uuid/v4';

import { getSectorSizeInMM } from '.';
import { ISectorList, ISideSize, ITexture, ITextureList, RootType, TextureType, WindowType } from '../interface';
import { getOffsetInWindowAxes, getWindowSize } from './coordinateСonverter';

interface ISectorParams extends ITexture {
  sectorName: string;
  width: number;
  height: number;
  root: RootType;
}

export default (side: ISideSize, textureList: ITextureList, name: string, sectorList: ISectorList, textureType: TextureType, windowType: WindowType) => {
  const id = uuid();
  const sectorsId = Object.keys(sectorList);

  const metaData = Base64.encode(JSON.stringify({ side, textureList, name, sectorList, textureType, windowType }));

  if (name.length === 0) {
    alert('Введите имя!');
    return null;
  }

  const sectors = document.getElementsByClassName('preview-container-item');
  const sectorsParams = sectorsId.reduce((acc, sectorId) => {
    const newItem = { [sectorId]: {
      width: getSectorSizeInMM(sectors[Number(sectorId) - 1].clientWidth, textureType),
      height: getSectorSizeInMM(sectors[Number(sectorId) - 1].clientHeight, textureType),
      root: textureList[sectorId] ? textureList[sectorId].root : 'sector',
    },
    };
    return { ...acc, ...newItem };
  },                                     {});

  const windowParams = getWindowSize(windowType, textureType);

  const sectorParams = sectorsId.map<ISectorParams>((sectorId) => {
    const texture = textureList[sectorId];
    if (texture) {
      if (textureList[sectorId].root === 'window') {
        const offset = getOffsetInWindowAxes(texture, side, windowParams, textureType);
        return { sectorName: sectorId, ...texture, ...offset, ...sectorsParams[sectorId] };
      }
      return { sectorName: sectorId, ...texture, ...sectorsParams[sectorId] };
    }
    const emptyTexture = {
      url: '',
      fileName: '',
      HOffset: 0,
      VOffset: 0,
      width: 0,
      height: 0,
    };
    return { sectorName: sectorId, ...emptyTexture, ...sectorsParams[sectorId] };
  });

  const jsonSide = prepareSideView(side);
  const jsonSectors = sectorParams.map(sector => prepareSectorApiView(sector))
    .sort((a, b) => Number(a.Sector) > Number(b.Sector) ? 1 : -1);

  const result = { ID: id, Name: name, ...jsonSide, metaData, Sectors: jsonSectors };
  return result;
};

const prepareSideView = (side: ISideSize) => ({
  TopIndent: String(side.topMargin),			// отступ сверху
  TopWidht: String(side.topWidth),			// ширина сверху
  LeftIndent: String(side.leftMargin),			// отступ слева
  LeftWidht: String(side.leftWidth),			// ширина слева
  RightIndent: String(side.rightMargin),			// отступ справа
  RightWidht: String(side.rightWidth),			// ширина справа
  BottomIndent: String(side.bottomMargin),			// отступ снизу
  BottomWidht: String(side.bottomWidth),			// ширина снизу
});

const shiftSectorName = (name: string) => String({ 1: 9, 2: 10, 3: 11, 4: 12, 5: 13, 6: 6, 7: 7, 8: 8, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5 }[name]);

const prepareSectorApiView = (sector: ISectorParams) => {
  const sectorName = shiftSectorName(sector.sectorName);
  return {
    Sector: sectorName,			// номер сектора
    Texture: sector.fileName,	// имя текстуры
    SizeX: String(sector.width),		// ширина текстуры на модели
    SizeY: String(sector.height),		// высота текстуры на модели
    ShiftX: String(sector.HOffset),			// сдвиг по горизонтали
    ShiftY: String(sector.VOffset),			// сдвиг по вертикали
    Snap: sector.root === 'window' ? '4' : '5',			// привязка (сектор - 5 / окно - 4)
  };
};

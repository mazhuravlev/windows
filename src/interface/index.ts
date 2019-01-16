import { BRICK, DOUBLE_WINDOW, TILE, WINDOW } from '../static';

export interface IParams {
  width: number;
  padding: number;
}

type rootType = 'sector' | 'window';
export interface ISector extends IParams {
  id: number;
}

export interface ISectorList {
  [id: string]: ISector;
}

export interface ITexture {
  url: string;
  fileName: string;
  HOffset: number;
  VOffset: number;
  width: number;
  height: number;
}

export type IPartOfTexture = Partial<ITexture>;

export interface ISectorTexture extends ITexture {
  sectorId: number;
  root: rootType;
}

export interface ITextureList {
  [secotId: number]: ISectorTexture;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IWindowSize extends ISize {
  padding: number;
}

export interface ISideSize {
  bottomWidth: number;
  bottomMargin: number;
  leftWidth: number;
  leftMargin: number;
  middleWidth: number;
  middleMargin: number;
  rightWidth: number;
  rightMargin: number;
  topWidth: number;
  topMargin: number;
}

export interface INumObjType {
  [name: string]: number;
}

export interface IStyleObj {
  [key: string]: string | number;
}

export type WindowType = typeof WINDOW | typeof DOUBLE_WINDOW;

export type TextureType = typeof BRICK | typeof TILE;

export interface IParams {
  width: number;
  padding: number;
}

export interface ISector extends IParams {
  id: string;
}

export interface ISectorList {
  [id: string]: ISector;
}

export interface ITexture {
  url: string;
  fileName: string;
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

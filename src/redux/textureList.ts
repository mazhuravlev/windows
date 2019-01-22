import * as _ from 'lodash';
import { ISectorTexture, ITextureList } from '../interface';

/*
    STATE
*/

export type ITextureListState = ITextureList;

/*
    TYPE CONST
*/

const ADD = 'ADD_TEXTURE_ITEM';
type ADD = typeof ADD;

const UPDATE = 'UPDATE_TEXTURE_ITEM';
type UPDATE = typeof UPDATE;

const REMOVE = 'REMOVE_TEXTURE_ITEM';
type REMOVE = typeof REMOVE;

/*
    ACTIONS CONST
*/
export interface IAddTextureItem {
  type: ADD;
  payload: ISectorTexture;
}

export interface IUpdateTextureState {
  type: UPDATE;
  payload: ITextureList;
}

export interface IRemoveTextureItem {
  type: REMOVE;
  payload: { sectorId: string };
}

export type TextureListAction = IAddTextureItem | IUpdateTextureState | IRemoveTextureItem;

/*
    REDUCER
*/
export default function reducer(state: ITextureListState = {},
                                action: TextureListAction): ITextureListState {
  switch (action.type) {
    case ADD: {
      const sectorTexture = action.payload;
      return { ...state, [sectorTexture.sectorId]: sectorTexture };
    }
    case UPDATE: {
      const textureList = action.payload;
      return { ...textureList };
    }
    case REMOVE: {
      return _.omit(state, action.payload.sectorId);
    }
    default:
      return state;
  }
}

/*
    ACTION CREATORS
*/
export const addTextureItem = (payload: ISectorTexture): IAddTextureItem => ({
  payload,
  type: ADD,
});

export const updateTextureList = (payload: ITextureList): IUpdateTextureState => ({
  payload,
  type: UPDATE,
});

export const removeTextureItem = (payload: { sectorId: string }): IRemoveTextureItem => ({
  payload,
  type: REMOVE,
});

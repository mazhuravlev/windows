import { IPartOfTexture, ITexture } from '../interface';
/*
    STATE
*/
export type ITextureState = ITexture;

const initState = {
  url: '',
  fileName: '',
  VOffset: 0,
  HOffset: 0,
  width: 0,
  height: 0,
};

/*
    TYPE CONST
*/

const SET = 'SET_TUXTURE_URL';
type SET = typeof SET;

/*
    ACTIONS CONST
*/

export interface ISetTexture {
  type: SET;
  payload: IPartOfTexture;
}

export type TextureAction = ISetTexture;

/*
    REDUCER
*/

export default function reducer(state: ITextureState = initState, action: TextureAction)
  : ITextureState {
  switch (action.type) {
    case SET: {
      return { ...state, ...action.payload } as ITexture;
    }
    default:
      return state;
  }
}

/*
    ACTION CREATORS
*/

export const setTexture = (payload: IPartOfTexture): ISetTexture => ({
  payload,
  type: SET,
});

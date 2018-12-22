import { ITexture } from '../interface';
/*
    STATE
*/
export type ITextureState = ITexture;

const initState = {
  url: '',
  fileName: '',
  VOffset: 0,
  HOffset: 0,
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
  payload: ITextureState;
}

export type TextureAction = ISetTexture;

/*
    REDUCER
*/

export default function reducer(state: ITextureState = initState, action: TextureAction)
  : ITextureState {
  switch (action.type) {
    case SET: {
      return { ...action.payload };
    }
    default:
      return state;
  }
}

/*
    ACTION CREATORS
*/

export const setTexture = (payload: ITextureState): ISetTexture => ({
  payload,
  type: SET,
});

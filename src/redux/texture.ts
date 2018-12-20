/*
    STATE
*/
export interface ITextureState {
  url: string;
  fileName: string;
}

const initState = {
  url: '',
  fileName: '',
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
      const { url, fileName } = action.payload;
      return { url, fileName };
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

import { ISideSize } from '../interface';

/*
    STATE
*/

export type ISideState = ISideSize;
const initState: ISideState = {
  bottomWidth: 1,
  bottomMargin: 0,
  leftWidth: 1,
  leftMargin: 0,
  middleWidth: 1,
  middleMargin: 0,
  rightWidth: 1,
  rightMargin: 0,
  topWidth: 1,
  topMargin: 0,
};

/*
    TYPE CONST
*/

const SET = 'SET_SIDE_SIZE';
type SET = typeof SET;

export type SideItemType = keyof ISideState;
export interface ISideSetType {
  name: SideItemType;
  value: number;
}
/*
    ACTIONS CONST
*/
export interface ISetSideSize {
  type: SET;
  payload: ISideSetType;
}

export type SideAction = ISetSideSize;

/*
    REDUCER
*/
export default function reducer(state: ISideState = initState, action: SideAction,
  ): ISideState {
  switch (action.type) {
    case SET: {
      const newSize = action.payload;
      return { ...state, [newSize.name]: newSize.value };
    }
    default:
      return state;
  }
}

/*
    ACTION CREATORS
*/

export const setSideSize = (payload: ISideSetType): ISetSideSize => ({
  payload,
  type: SET,
});

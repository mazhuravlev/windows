import { ISideSize } from '../interface';

/*
    STATE
*/

export type ISideState = ISideSize;
const initState: ISideState = {
  bottomWidth: 1,
  bottomMargin: 1,
  leftWidth: 1,
  leftMargin: 1,
  middleWidth: 1,
  middleMargin: 1,
  rightWidth: 1,
  rightMargin: 1,
  topWidth: 1,
  topMargin: 1,
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

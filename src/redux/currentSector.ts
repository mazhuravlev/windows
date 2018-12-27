/*
    STATE
*/

/*
    TYPE CONST
*/

const SET = 'SET_SECTOR_ID';
type SET = typeof SET;

/*
    ACTIONS CONST
*/
export interface ISetCurrentSector {
  type: SET;
  payload: number;
}

export type SectorAction = ISetCurrentSector;

/*
    REDUCER
*/
export default function reducer(state: number = 0, action: SectorAction,
  ): number {
  switch (action.type) {
    case SET: {
      const currentSector = action.payload;
      return currentSector;
    }
    default:
      return state;
  }
}

/*
    ACTION CREATORS
*/

export const setCurrentSector = (payload: number): ISetCurrentSector => ({
  payload,
  type: SET,
});

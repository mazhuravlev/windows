// import { IWindowSize } from '../interface';

// /*
//     STATE
// */

// export interface IWindowState {
//   width: number;
//   height: number;
//   padding: number;
// }

// const initSectorList = () : ISectorList => {
//   let sectorList: ISectorList = {};

//   for (let i = 1; i <= 13; i += 1) {
//     sectorList = { ...sectorList, [i]: { id: i } };
//   }
//   return sectorList;
// };

// const initState: IWindowState = {
//   width: 7,
//   height: 5,
//   padding: 2,
// };

// /*
//     TYPE CONST
// */

// const SET = 'SET_WINDOW_SIZE';
// type SET = typeof SET;

// const RESET = 'RESET_WINDOW_SIZE';
// type RESET = typeof RESET;

// /*
//     ACTIONS CONST
// */
// export interface ISetWindowSize {
//   type: SET;
//   payload: IWindowSize;
// }

// export interface IResetWindowSize {
//   type: RESET;
// }

// export type WindowAction = ISetWindowSize | IResetWindowSize;

// /*
//     REDUCER
// */
// export default function reducer(state: IWindowState = initState, action: WindowAction,
//   ): IWindowState {
//   switch (action.type) {
//     case SET: {
//       const { width, height, padding } = action.payload;
//       return { width, height, padding };
//     }
//     case RESET: {
//       return {
//         width: 3,
//         height: 5,
//         padding: 2,
//       };
//     }
//     default:
//       return state;
//   }
// }

// /*
//     ACTION CREATORS
// */
// export const setWindowSize = (payload: IWindowSize): ISetWindowSize => ({
//   payload,
//   type: SET,
// });

// export const resetWindowSize = (): IResetWindowSize => ({
//   type: RESET,
// });

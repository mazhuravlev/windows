import { createStore } from 'redux';
// tslint:disable-next-line:import-name
import rootReducers from '../redux';
import { ISideState } from '../redux/side';
import { ITextureState } from '../redux/texture';
import { ITextureListState } from '../redux/textureList';

export interface IStore {
  side: ISideState;
  textureList: ITextureListState;
  currentSector: number;
  texture: ITextureState;
}

const configureStore = (initialState?: IStore) => {
  return createStore(
    rootReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

export default configureStore;

import { createStore } from 'redux';
// tslint:disable-next-line:import-name
import rootReducers from '../redux';
import { ISideState } from '../redux/side';
import { ITextureState } from '../redux/texture';
import { ITextureListState } from '../redux/textureList';
import { IWindowState } from '../redux/window';

export interface IStore {
  window: IWindowState;
  side: ISideState;
  texture: ITextureState;
  textureList: ITextureListState;
}

const configureStore = (initialState?: IStore) => {
  return createStore(
    rootReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

export default configureStore;

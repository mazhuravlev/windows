import { combineReducers } from 'redux';
// tslint:disable-next-line:import-name
import sideReducers from './side';
// tslint:disable-next-line:import-name
import textureReducers from './texture';
// tslint:disable-next-line:import-name
import windowReducers from './window';

export default combineReducers({
  window: windowReducers,
  side: sideReducers,
  texture: textureReducers,
});

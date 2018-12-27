import { combineReducers } from 'redux';
// tslint:disable-next-line:import-name
import sectorReducers from './currentSector';
// tslint:disable-next-line:import-name
import sideReducers from './side';
// tslint:disable-next-line:import-name
import textureReducers from './texture';
// tslint:disable-next-line:import-name
import textureListReducers from './textureList';

export default combineReducers({
  side: sideReducers,
  textureList: textureListReducers,
  currentSector: sectorReducers,
  texture: textureReducers,
});

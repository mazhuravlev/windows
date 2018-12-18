import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';

import Options from './Options';
import Preview from './Preview';

export interface ISector {
  id: string;
  width: number;
  padding: number;
}

export interface ISectorList {
  [id: string]: ISector;
}

interface IState {
  sectorList: ISectorList;
  step: number;
}

const initSectorList = () : ISectorList => {
  let sectorList: ISectorList = {};

  for (let i = 1; i <= 13; i += 1) {
    sectorList = { ...sectorList, [i]: { id: i, width: 1, padding: 1 } };
  }
  return sectorList;
};

class ColorInsertEditor extends React.Component<{}, IState> {
  public state: IState = {
    sectorList: initSectorList(),
    step: 20,
  };

  public render() {
    return (
      <div className="container">
        <div className="container-item options">
          <Options />
        </div>
        <div className="container-item preview">
          <Preview title="Priview" {...this.state}/>
        </div>
      </div>
    );
  }
}

export default ColorInsertEditor;

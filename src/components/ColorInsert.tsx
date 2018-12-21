import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/StaticPreview.css';

import { ISectorList, ISideSize } from '../interface';
import { IStore } from '../store';

import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  step: number;
}

interface IProps {
  // window: IWindowSize;
  side: ISideSize;
}

const initSectorList = () : ISectorList => {
  let sectorList: ISectorList = {};

  for (let i = 1; i <= 13; i += 1) {
    sectorList = { ...sectorList, [i]: { id: i } };
  }
  return sectorList;
};

class ColorInsert extends React.Component< IProps, IState > {
  public state: IState = {
    sectorList: initSectorList(),
    step: 20,
  };

  public handleClick = (sectorId: string) => () => {
    console.log(sectorId);
  }

  public render() {
    return (
      <div className="app-container">
        <div className="container-item options">
          <TexturePanel />
          <SizeOptionsPanel
            sectorList={this.state.sectorList}
            step={this.state.step}
          />
          <Button block={true} color="primary">Save</Button>
          <Button block={true}>Cancel</Button>
        </div>
        <div className="container-item preview">
          <Preview
            {...this.state}
            {...this.props}
            window={{ width: 8, height: 4, padding: 2 }}
            className="preview-container"
          />
          <Preview
            {...this.state}
            {...this.props}
            window={{ width: 9, height: 4, padding: 0 }}
            className="preview-container"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  // window: state.window,
  side: state.side,
});

const ColorInsertEditor = connect(mapStateToProps)(ColorInsert);

export default ColorInsertEditor;

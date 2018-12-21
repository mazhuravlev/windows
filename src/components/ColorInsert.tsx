import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/StaticPreview.css';

import { ISectorList, ISideSize, ITextureList } from '../interface';
import { IStore } from '../store';

import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  step: number;
}

interface IProps {
  side: ISideSize;
  textureList: ITextureList;
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
    step: 15,
  };

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
            window={{ width: 12, height: 6, padding: 4 }}
            className="preview-container"
          />
          <Preview
            {...this.state}
            {...this.props}
            window={{ width: 13, height: 6, padding: 0 }}
            className="preview-container"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  side: state.side,
  textureList: state.textureList,
});

const ColorInsertEditor = connect(mapStateToProps)(ColorInsert);

export default ColorInsertEditor;

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ISectorList, ISideSize, ITextureList } from '../interface';
import * as sideEnteties from '../redux/side';
import { IStore } from '../store';

import '../styles/SizeOptionsPanel.css';

import SideOption from './SideOption';
import StaticPreview from './StaticPreview';
// import WindowSize from './WindowSize';

const staticSide = {
  bottomWidth: 1,
  bottomMargin: 0,
  leftWidth: 1,
  leftMargin: 0,
  middleWidth: 1,
  middleMargin: 0,
  rightWidth: 1,
  rightMargin: 0,
  topWidth: 1,
  topMargin: 0,
};

interface IState {
  test: string;
}

interface IProps {
  sectorList: ISectorList;
  step: number;
  side: ISideSize;
  textureList: ITextureList;
  setSideSize: (size: sideEnteties.ISideSetType) => void;
}

export class SizeOptionsPanel extends React.Component<IProps, IState> {
  public state: IState = {
    test: '',
  };

  public handleInput = (sideName: string) => (event: React.FormEvent<HTMLInputElement>) => {
    const { setSideSize } = this.props;
    const name = sideName as sideEnteties.SideItemType;
    setSideSize({ name, value: Number(event.currentTarget.value) });
  }

  public handleClick = (sectorId: string) => () => {
    console.log(sectorId);
  }

  public render() {
    return (
      <div>
        {/* <WindowSize /> */}
        <div className="container-window-options">
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'leftSide', flexDirection: 'column' }}
            sideName="left"
          />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'topSide', flexDirection: 'row' }}
            sideName="top" />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'rightSide', flexDirection: 'column' }}
            sideName="right" />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'bottomSide', flexDirection: 'row' }}
            sideName="bottom" />
          {/* <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: '-55px',
              marginTop: '-22px',
              width: '110px',
            }}
            sideName="middle"
          /> */}
          <StaticPreview
            side={staticSide}
            style={{ gridArea: 'preview' }}
            sectorList={this.props.sectorList}
            step={this.props.step}
            window={{ width: 8, height: 4, padding: 4 }}
            className="static-preview-container"
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  side: state.side,
  texture: state.texture,
  textureList: state.textureList,
});

const mapDispatchToProps = (dispatch: Dispatch<sideEnteties.SideAction>) => ({
  setSideSize: (size: sideEnteties.ISideSetType) => dispatch(sideEnteties.setSideSize(size)),
});

const SideSize = connect(mapStateToProps, mapDispatchToProps)(SizeOptionsPanel);
export default SideSize;

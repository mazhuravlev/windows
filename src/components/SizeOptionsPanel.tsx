import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ISectorList, ISectorTexture, ISideSize, ITexture, ITextureList } from '../interface';

import * as sideEnteties from '../redux/side';
import * as textureListEnteties from '../redux/textureList';
import { IStore } from '../store';

import '../styles/SizeOptionsPanel.css';

import SideOption from './SideOption';
import StaticPreview from './StaticPreview';

interface IState {
  test: string;
}

interface IProps {
  sectorList: ISectorList;
  step: number;
  side: ISideSize;
  texture: ITexture;
  textureList: ITextureList;
  setSideSize: (size: sideEnteties.ISideSetType) => void;
  addTextureItem: (sectorTexture: ISectorTexture) => void;
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
    const { texture } = this.props;
    this.props.addTextureItem({ sectorId, ...texture });
  }

  public render() {
    return (
      <div>
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
          <StaticPreview
            style={{ gridArea: 'preview' }}
            sectorList={this.props.sectorList}
            step={this.props.step}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSideSize: (size: sideEnteties.ISideSetType) => dispatch(sideEnteties.setSideSize(size)),
  addTextureItem: (sectorTexture: ISectorTexture) =>
    dispatch(textureListEnteties.addTextureItem(sectorTexture)),
});

const SideSize = connect(mapStateToProps, mapDispatchToProps)(SizeOptionsPanel);
export default SideSize;

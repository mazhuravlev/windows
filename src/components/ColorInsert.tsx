import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/StaticPreview.css';

import { ISectorList, ISideSize, ITexture, ITextureList } from '../interface';
import { BRICK, DOUBLE_WINDOW, SECTOR_LIST, TILE, WINDOW } from '../static';
import { IStore } from '../store';

import gridIconSvg from '../static/gridIcon.svg';

import * as sectorEnteties from '../redux/currentSector';
import * as textureEnteties from '../redux/texture';

import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  textureType: string;
  windowType: string;
  gridHide: boolean;
}

interface IProps {
  side: ISideSize;
  texture: ITexture;
  textureList: ITextureList;
  currentSector: number;
  setCurrentSector: (sectorId: number) => void;
  setTexture: (texture: textureEnteties.ITextureState) => void;
}

class ColorInsert extends React.Component<IProps, IState> {
  public state: IState = {
    sectorList: SECTOR_LIST,
    textureType: BRICK,
    windowType: WINDOW,
    gridHide: false,
  };

  public handleGridHide = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.setState({ gridHide: !this.state.gridHide });
  }

  public textureTypeToggle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({
      textureType: value,
    });
  }

  public windowTypeToggle = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const value = this.state.windowType === WINDOW ? DOUBLE_WINDOW : WINDOW;
    this.setState({
      windowType: value,
    });
  }

  public handleClick = (sectorId: string) => (event: React.FormEvent<HTMLDivElement>) => {
    const { setCurrentSector, textureList, texture } = this.props;
    setCurrentSector(Number(sectorId));
    if (textureList[sectorId]) {
      this.props.setTexture(textureList[sectorId]);
    } else {
      this.props.setTexture({
        ...texture,
        VOffset: 0,
        HOffset: 0,
      });
    }
  }

  public render() {
    const { textureType, windowType } = this.state;
    return (
      <div className="app-container">
        <div className="container-item options">
          <div className="type-toggle">
              <p>Тип текстуры: </p>
              <p><input onChange={this.textureTypeToggle} type="radio" name="textureType" value={BRICK} checked={textureType === BRICK}/> Кирпич</p>
              <p><input onChange={this.textureTypeToggle} type="radio" name="textureType" value={TILE} checked={textureType === TILE}/> Плитка</p>
          </div>
          <TexturePanel />
          <SizeOptionsPanel {...this.state}>
            <Preview
              handleClick={this.handleClick}
              textureList={this.props.textureList}
              side={this.props.side}
              className="preview-container"
              currentSector={this.props.currentSector}
              {...this.state}
            />
            <div className="container-control-buttons" style={{ gridArea: 'tools' }}>
              <a
                href="#"
                onClick={this.handleGridHide}
                className={`grid-icon ${this.state.gridHide ? 'grid-icon-hide' : ''}`}
              >
                <img src={gridIconSvg} alt=""/>
              </a>
              <a
                href="#"
                onClick={this.windowTypeToggle}
                className={`window-icon ${windowType === WINDOW ? '' : 'double-window'}`}
              />
            </div>
          </SizeOptionsPanel>
          <Button block={true} color="primary">Save</Button>
          <Button className="mb-1" block={true}>Cancel</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  side: state.side,
  texture: state.texture,
  textureList: state.textureList,
  currentSector: state.currentSector,
});

const mapDispatchToProps = {
  setCurrentSector: sectorEnteties.setCurrentSector,
  setTexture: textureEnteties.setTexture,
};

const ColorInsertEditor = connect(mapStateToProps, mapDispatchToProps)(ColorInsert);

export default ColorInsertEditor;

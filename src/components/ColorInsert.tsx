import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import * as uuid from 'uuid/v4';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';

import { IPartOfTexture, ISectorList, ISectorTexture, ISideSize, ITexture, ITextureList, TextureType, WindowType } from '../interface';
import { BRICK, DOUBLE_WINDOW, SECTOR_LIST, TILE, WINDOW } from '../static';
import { IStore } from '../store';

import basketIconSvg from '../static/icons/basketIcon.svg';
import gridIconSvg from '../static/icons/gridIcon.svg';
import saveIconSvg from '../static/icons/saveIcon.svg';

import * as sectorEnteties from '../redux/currentSector';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';

import { getSectorSizeInMM, isEmptyTexture } from '../helpers';
import { getOffsetInWindowAxes, getWindowSize } from '../helpers/coordinateСonverter';
import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  textureType: TextureType;
  rootType: string;
  windowType: WindowType;
  gridHide: boolean;
  colorInsertName: string;
}

interface IProps {
  side: ISideSize;
  texture: ITexture;
  textureList: ITextureList;
  currentSector: number;
  setCurrentSector: (sectorId: number) => void;
  setTexture: (texture: IPartOfTexture) => void;
  addTextureItem: (sectorTexture: ISectorTexture) => void;
  removeTextureItem: (sectorId: { sectorId: string }) => void;
}

class ColorInsert extends React.Component<IProps, IState> {
  public state: IState = {
    sectorList: SECTOR_LIST,
    textureType: BRICK,
    windowType: WINDOW,
    gridHide: false,
    colorInsertName: '',
    rootType: 'sector',
  };

  public handleGridHide = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.setState({ gridHide: !this.state.gridHide });
  }

  public textureTypeToggle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({
      textureType: value as TextureType,
    });
  }

  public rootTypeToggle = (event: React.FormEvent<HTMLInputElement>) => {
    if (this.props.currentSector === 0) return;
    const { value } = event.currentTarget;
    const { textureList } = this.props;

    if (!textureList[this.props.currentSector]) return;

    const oldItem = textureList[this.props.currentSector];

    const newItem = { ...oldItem, root: value };
    this.props.addTextureItem(newItem as ISectorTexture);
  }

  public windowTypeToggle = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const value = this.state.windowType === WINDOW ? DOUBLE_WINDOW : WINDOW;
    this.setState({
      windowType: value,
    });
  }

  public handlePreviewClick = (sectorNumber: number) => (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { setCurrentSector, textureList } = this.props;
    setCurrentSector(Number(sectorNumber));
    if (textureList[sectorNumber]) {
      const { sectorId, ...texture } = textureList[sectorNumber];
      this.props.setTexture(texture as ITexture);
      return;
    }
    if (!isEmptyTexture(this.props.texture)) {
      this.props.addTextureItem({
        sectorId: sectorNumber,
        ...this.props.texture,
        VOffset: 0,
        HOffset: 0,
        root: 'sector',
      });
    }
  }

  public handleColorInsertName = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ colorInsertName: value });
  }

  public handleBasketClick = (event: React.FormEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (this.props.currentSector === 0) return;
    this.props.removeTextureItem({ sectorId: String(this.props.currentSector) });
    this.props.setTexture({
      VOffset: 0,
      HOffset: 0,
    });
  }

  public handlePropagation = (event: React.FormEvent<HTMLDivElement>) => event.stopPropagation();

  public saveColorInsertToJSON = () => {
    const id = uuid();
    const { side, textureList } = this.props;
    const { colorInsertName, sectorList, textureType } = this.state;

    const sectorsId = Object.keys(sectorList);

    if (colorInsertName.length === 0) return;

    const sectors = document.getElementsByClassName('preview-container-item');
    const sectorsParams = sectorsId.reduce((acc, sectorId) => {
      const newItem = { [sectorId]: {
        width: getSectorSizeInMM(sectors[Number(sectorId) - 1].clientWidth, textureType),
        height: getSectorSizeInMM(sectors[Number(sectorId) - 1].clientHeight, textureType),
        root: textureList[sectorId] ? textureList[sectorId].root : 'sector',
      },
      };
      return { ...acc, ...newItem };
    },                                     {});

    const sectorParams = sectorsId.map((sectorId) => {
      const texture = textureList[sectorId];
      if (texture) {
        if (textureList[sectorId].root === 'window') {
          const windowParams = getWindowSize(this.state.windowType, this.state.textureType);
          const offset = getOffsetInWindowAxes(texture, side, windowParams);
          return { sector: sectorId, ...texture, ...offset, ...sectorsParams[sectorId] };
        }
        return { sector: sectorId, ...texture, ...sectorsParams[sectorId] };
      }
      const emptyTexture = {
        url: '',
        fileName: '',
        HOffset: 0,
        VOffset: 0,
        width: 0,
        height: 0,
      };
      return { sector: sectorId, ...emptyTexture, ...sectorsParams[sectorId] };
    });

    const result = { id, name: colorInsertName, ...side, sectors: sectorParams };
    console.log(JSON.stringify(result));
  }

  public ResetFocus = (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.setCurrentSector(0);
    this.props.setTexture({
      VOffset: 0,
      HOffset: 0,
    });
  }

  public renderSavePanel() {
    return (
      <div className="save-panel">
        <a href="#">
          <img className="icon" src={saveIconSvg} alt="save"/>
        </a>
        <p> Имя цветной вставки </p>
        <Input onChange={this.handleColorInsertName} type="text" value={this.state.colorInsertName}/>
      </div>
    );
  }

  public renderTools() {
    return (
      <div onClick={this.handlePropagation} className="container-control-buttons" style={{ gridArea: 'tools' }}>
        <a
          href="#"
          onClick={this.handleGridHide}
          className={`icon ${this.state.gridHide ? '' : 'grid-icon-hide'}`}
        >
          <img src={gridIconSvg} alt=""/>
        </a>
        <a
          href="#"
          onClick={this.windowTypeToggle}
          className={`window-icon ${this.state.windowType === DOUBLE_WINDOW ? '' : 'double-window'}`}
        />
        <a
          href="#"
          onClick={this.handleBasketClick}
          className="basket-icon"
        >
          <img className="icon" src={basketIconSvg} alt=""/>
        </a>
      </div>
    );
  }

  public render() {
    const { textureType } = this.state;
    const { currentSector, textureList } = this.props;
    const rootType = textureList[currentSector] ? textureList[currentSector].root : 'sector';
    return (
      <div className="app-container" onClick={this.ResetFocus}>
        <div className="container-item options">
          {this.renderSavePanel()}
          <div className="type-toggle">
              <p>Тип текстуры:</p>
              <p><input onChange={this.textureTypeToggle} type="radio" name="textureType" value={BRICK} checked={textureType === BRICK}/> Кирпич</p>
              <p><input onChange={this.textureTypeToggle} type="radio" name="textureType" value={TILE} checked={textureType === TILE}/> Плитка</p>
          </div>
          <div onClick={this.handlePropagation} className="type-toggle">
              <p>Параметры привязки:</p>
              <p><input onChange={this.rootTypeToggle} type="radio" name="rootType" value={'sector'} checked={rootType === 'sector'}/> Сектор</p>
              <p><input onChange={this.rootTypeToggle} type="radio" name="rootType" value={'window'} checked={rootType === 'window'}/> Окно</p>
          </div>
          <TexturePanel />
        </div>
        <SizeOptionsPanel {...this.state}>
          <Preview
            handleClick={this.handlePreviewClick}
            textureList={this.props.textureList}
            side={this.props.side}
            className="preview-container"
            currentSector={this.props.currentSector}
            {...this.state}
          />
          {this.renderTools()}
        </SizeOptionsPanel>
        <Button onClick={this.saveColorInsertToJSON} block={true} color="primary">Save</Button>
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
  addTextureItem: textureListEnteties.addTextureItem,
  removeTextureItem: textureListEnteties.removeTextureItem,
};

const ColorInsertEditor = connect(mapStateToProps, mapDispatchToProps)(ColorInsert);

export default ColorInsertEditor;

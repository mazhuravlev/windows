import { Base64 } from 'js-base64';
import * as _ from 'lodash';
import * as React from 'react';

import { connect } from 'react-redux';
import { Button, ButtonGroup, Input } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/Window.css';

import { IMetaData, IPartOfTexture, ISectorList, ISectorTexture, ISideSize, ITexture, ITextureList, RootType, TextureType, WindowType } from '../interface';
import { BRICK, DOUBLE_WINDOW, SECTOR_LIST, TILE, WINDOW } from '../static';
import { IStore } from '../store';

import basketIconSvg from '../static/icons/basketIcon.svg';
import gridIconSvg from '../static/icons/gridIcon.svg';
import saveIconSvg from '../static/icons/saveIcon.svg';

import * as sectorEnteties from '../redux/currentSector';
import * as sideEnteties from '../redux/side';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';

import { checkOverSize, isEmptyTexture } from '../helpers';
import colorInsertToJson from '../helpers/colorInsertToJson';
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
  updateTextureList: (textureList: ITextureList) => void;
  removeTextureItem: (sectorId: { sectorId: string }) => void;
  setSideSize: (size: sideEnteties.ISideSetType) => void;
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

  public textureTypeToggle = (value: TextureType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // this.props.setSideSize(sideEnteties.initState);
    if (checkOverSize(this.props.side, value)) {
      alert(`Недопустимый размер сектора! Максимально допустимый размер "${value === BRICK ? 8 : 6}"`);
      return;
    }
    this.setState({
      textureType: value,
    });
  }

  public rootTypeToggle = (value: RootType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (this.props.currentSector === 0) return;
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
    const { side, textureList } = this.props;
    const { colorInsertName, sectorList, textureType, windowType } = this.state;
    colorInsertToJson(side, textureList, colorInsertName, sectorList, textureType, windowType);
  }

  public loadColorInsertFromJSON = () => {
    const json = prompt('Введите json') as string;
    const obj = JSON.parse(json);
    const { metaData } = obj;
    const downloadState = JSON.parse(Base64.decode(metaData)) as IMetaData;
    this.props.setSideSize(downloadState.side);
    this.props.updateTextureList(downloadState.textureList);
    this.setState({
      sectorList: downloadState.sectorList,
      textureType: downloadState.textureType,
      windowType: downloadState.windowType,
      colorInsertName: downloadState.name,
    });
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
          <div className="control-button-panel">
            <div className="type-toggle">
              <p>Тип текстуры:</p>
              <ButtonGroup className="texture-type-toggle">
                <Button onClick={this.textureTypeToggle(BRICK)} active={textureType === BRICK}>Кирпич</Button>
                <Button onClick={this.textureTypeToggle(TILE)} active={textureType === TILE}>Плитка</Button>
              </ButtonGroup>
            </div>
          </div>
          <TexturePanel />
          <div onClick={this.handlePropagation} className="type-toggle">
            <p>Параметры привязки:</p>
            <ButtonGroup className="root-type-toggle">
              <Button onClick={this.rootTypeToggle('sector')} active={rootType === 'sector'}>Сектор</Button>
              <Button onClick={this.rootTypeToggle('window')} active={rootType === 'window'}>&#160;Окно&#160;</Button>
            </ButtonGroup>
          </div>
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
        <ButtonGroup className="footer-button">
          <Button onClick={this.saveColorInsertToJSON} color="primary">Сохранить</Button>
          <Button onClick={this.loadColorInsertFromJSON} color="primary">Загрузить</Button>
        </ButtonGroup>
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
  updateTextureList: textureListEnteties.updateTextureList,
  removeTextureItem: textureListEnteties.removeTextureItem,
  setSideSize: sideEnteties.setSideSize,
};

const ColorInsertEditor = connect(mapStateToProps, mapDispatchToProps)(ColorInsert);

export default ColorInsertEditor;

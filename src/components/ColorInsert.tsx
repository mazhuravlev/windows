import 'bootstrap/dist/css/bootstrap.css';
import classnames from 'classnames';
import { Base64 } from 'js-base64';
import * as _ from 'lodash';
import * as React from 'react';
import * as KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Input, UncontrolledTooltip } from 'reactstrap';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/Window.css';

import {
  IMetaData,
  IPartOfTexture,
  ISectorList,
  ISectorTexture,
  ISideSize,
  ITexture,
  ITextureList,
  RootType,
  TextureType,
  WindowType,
} from '../interface';
import { BRICK, DOUBLE_WINDOW, SECTOR_LIST, TILE, WINDOW } from '../static';
import { IStore } from '../store';

import basketIconSvg from '../static/icons/basketIcon.svg';
import disable_gridPng from '../static/icons/disable_grid.png';
import double_windowPng from '../static/icons/double_window.png';
import enable_gridPng from '../static/icons/enable_grid.png';
import single_windowPng from '../static/icons/single_window.png';

import * as sectorEnteties from '../redux/currentSector';
import * as sideEnteties from '../redux/side';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';

import { checkOverSize, isEmptyTexture } from '../helpers';
import colorInsertToJson from '../helpers/colorInsertToJson';
import NumberInput from './NumberInput';
import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  textureType: TextureType;
  rootType: RootType;
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
  isWindow: boolean;
}

class ColorInsert extends React.Component<IProps, IState> {
  public state: IState = {
    sectorList: SECTOR_LIST,
    textureType: BRICK,
    windowType: WINDOW,
    gridHide: false,
    colorInsertName: '',
    rootType: 'window',
  };

  public handleGridHide = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.setState({ gridHide: !this.state.gridHide });
  }

  public textureTypeToggle = (value: TextureType) => (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    // this.props.setSideSize(sideEnteties.initState);
    if (checkOverSize(this.props.side, value)) {
      alert(
        `Недопустимый размер сектора! Максимально допустимый размер "${
        value === BRICK ? 8 : 6
        }"`,
      );
      return;
    }
    this.setState({
      textureType: value,
    });
  }

  public rootTypeToggle = (value: RootType) => (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
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

  public handlePreviewClick = (sectorNumber: number) => (
    event: React.FormEvent<HTMLDivElement>,
  ) => {
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
        root: 'window',
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
    this.props.removeTextureItem({
      sectorId: String(this.props.currentSector),
    });
    this.props.setTexture({
      VOffset: 0,
      HOffset: 0,
    });
  }

  public handlePropagation = (event: React.FormEvent<HTMLDivElement>) =>
    event.stopPropagation()

  public saveColorInsertToJSON = () => {
    const { side, textureList } = this.props;
    const { colorInsertName, sectorList, textureType, windowType } = this.state;
    const result = colorInsertToJson(
      side,
      textureList,
      colorInsertName,
      sectorList,
      textureType,
      windowType,
    );
    if (!result) return;
    if (window.vasya) {
      window.vasya.save(JSON.stringify(result));
    } else {
      console.log(result);
    }
  }

  public loadColorInsertFromJSON = () => {
    const json = this.props.isWindow
      ? window.vasya.load()
      : (prompt('Введите json') as string);
    if (!json) return;
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

  public renderTools() {
    return (
      <div
        onClick={this.handlePropagation}
        className="container-control-buttons"
        style={{ gridArea: 'tools' }}
      >
        <a
          href="#"
          onClick={this.handleGridHide}
          className={`icon ${this.state.gridHide ? '' : 'grid-icon-hide'}`}
        >
          <img
            src={this.state.gridHide ? enable_gridPng : disable_gridPng}
            alt=""
          />
        </a>
        <a href="#" onClick={this.windowTypeToggle} className="icon">
          <img
            src={
              this.state.windowType === DOUBLE_WINDOW
                ? single_windowPng
                : double_windowPng
            }
          />
        </a>
        <a
          href="#"
          onClick={this.handleBasketClick}
          className="basket-icon icon"
        >
          <img src={basketIconSvg} alt="" />
        </a>
      </div>
    );
  }

  public render() {
    const { textureType } = this.state;
    const { currentSector, textureList, isWindow } = this.props;
    const rootType = textureList[currentSector]
      ? textureList[currentSector].root
      : 'window';
    return (
      <div
        className={classnames('app-container', {
          'app-container-border': !isWindow,
        })}
        onClick={this.ResetFocus}
      >
        <KeyboardEventHandler
          handleKeys={['left', 'right', 'up', 'down']}
          handleFocusableElements={true}
          onKeyEvent={this.handleKey}
        />
        {/* <div className="container-item options">
          {this.renderSavePanel()}
          <div className="control-button-panel">
          </div>
        </div> */}
        <div className="tools-panel">
          <p>Имя цветной вставки </p>
          <Input
            style={{ gridArea: 'a2', width: 250 }}
            onChange={this.handleColorInsertName}
            type="text"
            value={this.state.colorInsertName}
          />
          <p className="otdelka-type">Тип отделки</p>
          <ButtonGroup className="texture-type-toggle" style={{ gridArea: 'a4' }}>
            <Button
              onClick={this.textureTypeToggle(BRICK)}
              active={textureType === BRICK}
            >
              Кирпич
              </Button>
            <Button
              onClick={this.textureTypeToggle(TILE)}
              active={textureType === TILE}
            >
              Плитка
              </Button>
          </ButtonGroup>
          <p style={{ gridArea: 'b1' }}>Сдвиг</p>
          <p style={{ gridArea: 'b3', position: 'relative', top: 7 }}>Привязка</p>
          <div onClick={this.handlePropagation} className="root-type-toggle">
            <ButtonGroup>
              <Button
                onClick={this.rootTypeToggle('sector')}
                active={rootType === 'sector'}
              >
                Сектор
              </Button>
              <Button
                onClick={this.rootTypeToggle('window')}
                active={rootType === 'window'}
              >
                &#160;Окно&#160;
              </Button>
            </ButtonGroup>
          </div>
          <p className="texture-name">{this.props.texture ? this.props.texture.fileName : null}</p>
          <div style={{ gridArea: 'c2 / c2 / c4 / c2' }}>
            <TexturePanel />
          </div>
          <div className="shift-settings" onClick={this.handlePropagation}>
            <UncontrolledTooltip target="horizontal-shift">
              Сдвиг по горизонтали
            </UncontrolledTooltip>
            <NumberInput
              id="horizontal-shift"
              style={{}}
              value={this.props.texture.HOffset}
              min={-10}
              max={10}
              // tslint:disable-next-line:jsx-no-bind
              onChange={this.handleOffsetInput('HOffset').bind(this)}
            />
            <UncontrolledTooltip target="vertical-shift">
              Сдвиг по вертикали
            </UncontrolledTooltip>
            <NumberInput
              id="vertical-shift"
              style={{ position: 'relative' }}
              value={this.props.texture.VOffset}
              min={-10}
              max={10}
              // tslint:disable-next-line:jsx-no-bind
              onChange={this.handleOffsetInput('VOffset').bind(this)}
            />
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
        <Button
          onClick={this.loadColorInsertFromJSON}
          style={{ borderRadius: 0, marginBottom: 6, width: 200, marginLeft: 63 }}>
          Загрузить
        </Button>
        <Button
          onClick={this.saveColorInsertToJSON}
          color="primary"
          style={{ borderRadius: 0, marginBottom: 6, width: 513, marginLeft: 10 }}
        >
          Сохранить
        </Button>
      </div>
    );
  }

  private handleOffsetInput = (offsetType: string) => (value: number) => {
    const { textureList, currentSector } = this.props;
    if (currentSector === 0 || !textureList[currentSector]) return;

    const texture = {
      ...this.props.texture,
      [offsetType]: Math.abs(value) > 20 ? 0 : value,
    };

    const textureItem: ISectorTexture = {
      ...texture,
      sectorId: this.props.currentSector,
      root: textureList[currentSector].root,
    };
    this.props.addTextureItem(textureItem);
    this.props.setTexture(texture);
  }

  private handleKey = (key: string): void => {
    const { texture } = this.props;
    switch (key) {
      case 'down':
        this.handleOffsetInput('VOffset')(texture.VOffset - 1);
        break;
      case 'up':
        this.handleOffsetInput('VOffset')(texture.VOffset + 1);
        break;
      case 'right':
        this.handleOffsetInput('HOffset')(texture.HOffset + 1);
        break;
      case 'left':
        this.handleOffsetInput('HOffset')(texture.HOffset - 1);
        break;
      default:
        return;
    }
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

const ColorInsertEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorInsert);

export default ColorInsertEditor;

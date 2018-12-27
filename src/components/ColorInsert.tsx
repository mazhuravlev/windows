import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/ColorInsertEditor.css';
import '../styles/Preview.css';
import '../styles/StaticPreview.css';

import { ISectorList, ISideSize, ITextureList } from '../interface';
import { BRICK, DOUBLE_WINDOW, SECTOR_LIST, TILE, WINDOW } from '../static';
import { IStore } from '../store';

import * as sectorEnteties from '../redux/currentSector';
import * as textureEnteties from '../redux/texture';

import Preview from './Preview';
import SizeOptionsPanel from './SizeOptionsPanel';
import TexturePanel from './TexturePanel';

interface IState {
  sectorList: ISectorList;
  textureType: string;
  windowType: string;
}

interface IProps {
  side: ISideSize;
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
  };

  public textureTypeToggle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({
      textureType: value,
    });
  }

  public windowTypeToggle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({
      windowType: value,
    });
  }

  public handleClick = (sectorId: string) => (event: React.FormEvent<HTMLDivElement>) => {
    const { setCurrentSector, textureList } = this.props;
    setCurrentSector(Number(sectorId));
    if (textureList[sectorId]) {
      this.props.setTexture(textureList[sectorId]);
    } else {
      this.props.setTexture({
        url: '',
        fileName: '',
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
          <div className="type-toggle">
              <p>Тип окна: </p>
              <p><input onChange={this.windowTypeToggle} type="radio" name="windowType" value={WINDOW} checked={windowType === WINDOW}/> Одинарное</p>
              <p><input onChange={this.windowTypeToggle} type="radio" name="windowType" value={DOUBLE_WINDOW} checked={windowType === DOUBLE_WINDOW}/> Двойное</p>
          </div>
          <TexturePanel />
          <SizeOptionsPanel {...this.state}>
            <Preview
              handleClick={this.handleClick}
              style={{ gridArea: 'preview' }}
              textureList={this.props.textureList}
              side={this.props.side}
              className="preview-container"
              currentSector={this.props.currentSector}
              {...this.state}
            />
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
  textureList: state.textureList,
  currentSector: state.currentSector,
});

const mapDispatchToProps = {
  setCurrentSector: sectorEnteties.setCurrentSector,
  setTexture: textureEnteties.setTexture,
};

const ColorInsertEditor = connect(mapStateToProps, mapDispatchToProps)(ColorInsert);

export default ColorInsertEditor;

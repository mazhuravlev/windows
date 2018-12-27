import * as React from 'react';
import { connect } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';

import '../styles/TexturePanel.css';

import { ISectorTexture, ITexture, ITextureList } from '../interface';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';
import { IStore } from '../store';
import NumberInput from './NumberInput';

interface IProps {
  currentSector: number;
  textureList: ITextureList;
  texture: ITexture;
  setTexture: (texture: textureEnteties.ITextureState) => void;
  addTextureItem: (sectorTexture: ISectorTexture) => void;
}

class Texture extends React.Component<IProps> {
  public handleOffsetInput = (offsetType: string) => (value: number) => {
    const texture = {
      ...this.props.texture,
      [offsetType]: value,
    };
    const textureItem: ISectorTexture = {
      ...texture,
      sectorId: String(this.props.currentSector),
    };
    this.props.addTextureItem(textureItem);
    this.props.setTexture(texture);
  }

  public handleImageChange = (event: any) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      const { currentSector } = this.props;
      const texture = {
        ...this.props.texture,
        url: reader.result as string,
        fileName: file.name,
      };
      const textureItem: ISectorTexture = {
        ...texture,
        sectorId: String(currentSector),
      };
      this.props.addTextureItem(textureItem);
      this.props.setTexture(texture);
    };

    if (file) reader.readAsDataURL(file);
  }

  public handlePreviewClick = () => {
    const textureItem: ISectorTexture = {
      ...this.props.texture,
      VOffset: 0,
      HOffset: 0,
      sectorId: String(this.props.currentSector),
    };
    this.props.addTextureItem(textureItem);
    this.props.setTexture({
      ...this.props.texture,
      VOffset: 0,
      HOffset: 0,
    });
  }

  public render() {
    const imagePreviewUrl = this.props.texture.url;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="texture-panel-container">
        <div className="texture-panel-container-item">
          <input className="fileInput"
            type="file"
            onChange={this.handleImageChange}
          />
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <UncontrolledTooltip
              target="horizontal-shift">Сдвиг по горизонтали</UncontrolledTooltip>
            <NumberInput
              id="horizontal-shift"
              style={{ position: 'relative', marginLeft: '15px' }}
              value={this.props.texture.HOffset}
              min={-10}
              max={10}
              onChange={this.handleOffsetInput('HOffset')}
            />
            <UncontrolledTooltip target="vertical-shift">Сдвиг по вертикали</UncontrolledTooltip>
            <NumberInput
              id="vertical-shift"
              style={{ position: 'relative' }}
              value={this.props.texture.VOffset}
              min={-10}
              max={10}
              onChange={this.handleOffsetInput('VOffset')}
            />
          </div>
        </div>
        <div className="texture-panel-container-item">
          <div onClick={this.handlePreviewClick} className="imgPreview">
            {imagePreview}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  currentSector: state.currentSector,
  textureList: state.textureList,
  texture: state.texture,
});

const mapDispatchToProps = {
  addTextureItem: textureListEnteties.addTextureItem,
  setTexture: textureEnteties.setTexture,
};

const TexturePanel = connect(mapStateToProps, mapDispatchToProps)(Texture);

export default TexturePanel;

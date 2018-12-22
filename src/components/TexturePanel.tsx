import * as React from 'react';
import { connect } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';
import { Dispatch } from 'redux';

import '../styles/TexturePanel.css';

import { ITexture } from '../interface';
import * as textureEnteties from '../redux/texture';
import { IStore } from '../store';
import NumberInput from './NumberInput';

interface IProps {
  texture: ITexture;
  setTexture: (texture: textureEnteties.ITextureState) => void;
}

class Texture extends React.Component<IProps> {
  public handleOffsetInput = (offsetType: string) => (value: number) => {
    this.props.setTexture({
      ...this.props.texture,
      [offsetType]: value,
    });
  }

  public handleImageChange = (event: any) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.props.setTexture({
        url: reader.result as string,
        fileName: file.name,
        VOffset: 0,
        HOffset: 0,
      });
    };

    if (file) reader.readAsDataURL(file);
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
          <div className="imgPreview">
            {imagePreview}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  texture: state.texture,
});

const mapDispatchToProps = (dispatch: Dispatch<textureEnteties.TextureAction>) => ({
  setTexture: (texture: textureEnteties.ITextureState) =>
    dispatch(textureEnteties.setTexture(texture)),
});

const TexturePanel = connect(mapStateToProps, mapDispatchToProps)(Texture);

export default TexturePanel;

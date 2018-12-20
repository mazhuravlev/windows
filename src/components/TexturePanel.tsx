import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as textureEnteties from '../redux/texture';
import { IStore } from '../store';

interface IProps {
  texture: string;
  setTextureUrl: (texture: textureEnteties.ITextureState) => void;
}

class Texture extends React.Component<IProps> {
  public handleImageChange = (event: any) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      // this.setState({
      //   file,
      //   imagePreviewUrl: reader.result,
      // });
      this.props.setTextureUrl({
        url: reader.result as string,
        fileName: file.name,
      });
    };

    if (file) reader.readAsDataURL(file);
  }

  public render() {
    const imagePreviewUrl = this.props.texture;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <input className="fileInput"
          type="file"
          onChange={this.handleImageChange}
        />
        <div className="imgPreview">
          {imagePreview}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  texture: state.texture.url,
});

const mapDispatchToProps = (dispatch: Dispatch<textureEnteties.TextureAction>) => ({
  setTextureUrl: (texture: textureEnteties.ITextureState) =>
    dispatch(textureEnteties.setTexture(texture)),
});

const TexturePanel = connect(mapStateToProps, mapDispatchToProps)(Texture);

export default TexturePanel;

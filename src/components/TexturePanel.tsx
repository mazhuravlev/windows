import * as React from 'react';
import { connect } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';
import { ISectorTexture, ITexture, ITextureList } from '../interface';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';
import { IStore } from '../store';
import '../styles/TexturePanel.css';

import NumberInput from './NumberInput';

const getMeta = async (url: string | ArrayBuffer | null) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = url as string;
  });

interface IProps {
  currentSector: number;
  textureList: ITextureList;
  texture: ITexture;
  setTexture: (texture: textureEnteties.ITextureState) => void;
  addTextureItem: (sectorTexture: ISectorTexture) => void;
}

interface IState {
  previewList: ITexture[];
  previewListHisory: ITexture[];
  previewListShow: boolean;
}

class Texture extends React.Component<IProps, IState> {
  public fileInputRef = React.createRef<HTMLInputElement>();

  public state: IState = {
    previewList: [],
    previewListHisory: [],
    previewListShow: false,
  };

  public texturesRef = React.createRef<HTMLDivElement>();

  public clickListener = (e: MouseEvent) => {
    if (this.state.previewListShow) {
      const contains = this.texturesRef.current!.contains(e.target as Node);
      if (!contains) this.setState({ previewListShow: false });
    }
  }

  public componentDidMount() {
    document.addEventListener('mouseup', this.clickListener);
  }

  public componentWillUnmount() {
    document.removeEventListener('mouseup', this.clickListener);
  }

  public resetFileInput = (event: any) => {
    event.target.value = null;
  }

  public handleImageChange = (event: any) => {
    event.preventDefault();
    const { files } = event.target;
    if (files.length === 0) return;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i += 1) {
      const file: File = files[i];
      if (this.state.previewList.some(x => x.fileName === file.name)) continue;
      const reader = new FileReader();
      reader.onloadend = async () => {
        const { currentSector } = this.props;
        const imgSize = await getMeta(reader.result);
        const texture = {
          ...this.props.texture,
          ...imgSize,
          url: reader.result as string,
          fileName: file.name,
        };
        const textureItem: ISectorTexture = {
          ...texture,
          sectorId: currentSector,
          root: 'sector',
        };
        if (currentSector > 0) {
          this.props.addTextureItem(textureItem);
        }
        this.props.setTexture(texture);
        this.setState({ previewList: [...this.state.previewList, texture] });
      };

      reader.readAsDataURL(files[i]);
    }
  }

  public handlePreviewClick = (event: React.FormEvent<HTMLDivElement>) => {
    this.setState({ previewListShow: !this.state.previewListShow });
  }

  public handleHisoryListClick = (texture: ITexture) => (
    event: React.FormEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    const { textureList, currentSector } = this.props;
    const rootType = textureList[currentSector]
      ? textureList[currentSector].root
      : 'sector';
    this.props.setTexture(texture);
    this.props.addTextureItem({
      ...texture,
      sectorId: this.props.currentSector,
      root: rootType,
    });
  }

  public handlePreviewListClick = (texture: ITexture) => (
    event: React.FormEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    const { previewListHisory } = this.state;
    if (previewListHisory.some(x => x.fileName === texture.fileName)) return;
    if (previewListHisory.length < 5) {
      this.setState({
        previewListHisory: [...this.state.previewListHisory, texture],
      });
      return;
    }

    const [, ...rest] = previewListHisory;
    this.setState({ previewListHisory: [...rest, texture] });
  }

  public handlePropagation = (event: React.FormEvent<HTMLDivElement>) =>
    event.stopPropagation()

  public loadTexture = async () => {
    if (window.vasya) {
      const texturesString = window.vasya.loadTextures();
      if (texturesString != null) {
        // tslint:disable-next-line:array-type
        const textures = JSON.parse(texturesString) as { Filename: string, Data: string, Width: number, Height: number }[];
        if (textures.length === 0) return;
        // const { currentSector } = this.props;
        const itextures: ITexture[] = [];
        // tslint:disable-next-line:forin
        for (const t in textures) {
          const textureData = textures[t];
          const imgSize = { width: textureData.Width, height: textureData.Height };
          const texture = {
            ...this.props.texture,
            ...imgSize,
            url: `data:image/png;base64,${textureData.Data}`,
            fileName: textureData.Filename,
          };
          itextures.push(texture);
        }
        this.props.setTexture(itextures[0]);
        this.setState({ previewList: [...this.state.previewList, ...itextures] });
      }
    } else {
      this.fileInputRef.current!.click();
    }
  }

  public renderTextureList() {
    return (
      <div
        className="texture-panel-container-item preview-list"
        ref={this.texturesRef}
      >
        <div className="preview-history-wrapper">
          <div className="preview-history">
            {this.state.previewListHisory.map((texture, i) => (
              <div
                onClick={this.handleHisoryListClick(texture)}
                key={i}
                className="preview-history-item"
              >
                <img src={texture.url as string} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="add-texture-button" onClick={this.loadTexture}>
          добавить текстуру
        </div>
        {this.state.previewList.map((item, i) => (
          <div
            onClick={this.handlePreviewListClick(item)}
            className="preview-list-item"
            key={i}
          >
            <div className="img" style={{ backgroundImage: `url(${item.url as string})` }} />
            <p>{item.fileName}</p>
          </div>
        ))}
      </div>
    );
  }

  public render() {
    const { texture } = this.props;
    const imagePreviewUrl = texture.url as string;
    return (
      <div onClick={this.handlePropagation} className="texture-panel-container">
        <input
          ref={this.fileInputRef}
          className="custom-file-input"
          type="file"
          onChange={this.handleImageChange}
          multiple={true}
          required={true}
          onClick={this.resetFileInput}
        />
        <div className="texture-panel-container-item">
          <div
            onClick={this.handlePreviewClick}
            className="imgPreview"
            style={{ backgroundImage: `url(${imagePreviewUrl})` }}
          >
            {!imagePreviewUrl ? 'Выберите текстуру' : null}
            {this.state.previewListShow ? this.renderTextureList() : null}
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

const TexturePanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Texture);

export default TexturePanel;

import * as React from 'react';
import * as KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';

import '../styles/TexturePanel.css';

import texturesIconSvg from '../static/icons/texturesIcon.svg';

import { ISectorTexture, ITexture, ITextureList } from '../interface';
import * as textureEnteties from '../redux/texture';
import * as textureListEnteties from '../redux/textureList';
import { IStore } from '../store';

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
  public state: IState = {
    previewList: [],
    previewListHisory: [],
    previewListShow: false,
  };

  public texturesRef = React.createRef<HTMLDivElement>();

  public handleKey = (key: string): void => {
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

  public clickListener = (e: MouseEvent) => {
    if (this.state.previewListShow) {
      const contains = this.texturesRef.current!.contains(e.target as Node);
      console.log(contains);
      if (!contains) this.setState({ previewListShow: false });
    }
  }

  public componentDidMount() {
    document.addEventListener('mouseup', this.clickListener);
  }

  public componentWillUnmount() {
    document.removeEventListener('mouseup', this.clickListener);
  }

  public handleOffsetInput = (offsetType: string) => (value: number) => {
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

  public resetFileInput = (event: any) => {
    event.target.value = null;
  }

  public handleImageChange = (event: any) => {
    event.preventDefault();
    const { files } = event.target;
    if (files.length === 0) return;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
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
        {this.state.previewList.map((item, i) => (
          <div
            onClick={this.handlePreviewListClick(item)}
            className="preview-list-item"
            key={i}
          >
            <img src={item.url as string} alt="" />
            <p>{item.fileName}</p>
          </div>
        ))}
      </div>
    );
  }

  public renderKeyControlComponent() {
    return (
      <KeyboardEventHandler
        handleKeys={['left', 'right', 'up', 'down']}
        handleFocusableElements={true}
        onKeyEvent={this.handleKey}
      />
    );
  }

  public render() {
    const { texture } = this.props;
    const imagePreviewUrl = texture.url as string;
    // // let imagePreview = null;
    // if (imagePreviewUrl) {
    //   imagePreview = <img src={imagePreviewUrl} />;
    // } else {
    //   imagePreview = (
    //     <div className="previewText">Please select an Image for Preview</div>
    //   );
    // }

    return (
      <div onClick={this.handlePropagation} className="texture-panel-container">
        {this.renderKeyControlComponent()}
        <a className="texture-panel-container-item" href="#">
          <img className="icon" src={texturesIconSvg} alt="" />
        </a>
        <div className="custom-file">
          <input
            className="custom-file-input"
            type="file"
            onChange={this.handleImageChange}
            multiple={true}
            required={true}
            onClick={this.resetFileInput}
          />
        </div>
        <p className="texture-panel-container-item texture-name">
          Текстура:{' '}
          {texture.fileName ? texture.fileName : 'Текстура не выбрана!'}
        </p>
        <div className="texture-panel-container-item">
          <div
            style={{ flexDirection: 'row', display: 'flex', paddingLeft: 6 }}
          >
            <UncontrolledTooltip target="horizontal-shift">
              Сдвиг по горизонтали
            </UncontrolledTooltip>
            <NumberInput
              id="horizontal-shift"
              style={{ position: 'relative', marginLeft: '15px' }}
              value={this.props.texture.HOffset}
              min={-10}
              max={10}
              onChange={this.handleOffsetInput('HOffset')}
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
              onChange={this.handleOffsetInput('VOffset')}
            />
          </div>
        </div>
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

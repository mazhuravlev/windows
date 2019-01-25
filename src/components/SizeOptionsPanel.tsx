import * as React from 'react';
import { connect } from 'react-redux';
import { ISideSize, TextureType } from '../interface';

import * as sideEnteties from '../redux/side';
import { IStore } from '../store';

import '../styles/SizeOptionsPanel.css';

import { BRICK } from '../static';
import SideOption from './SideOption';

interface IProps {
  side: ISideSize;
  textureType: TextureType;
  setSideSize: (size: sideEnteties.ISideSetType) => void;
}

export class SizeOptionsPanel extends React.Component<IProps> {
  public handleInput = (resizeType: string) => (value: number) => {
    const { setSideSize, side } = this.props;
    const [, sideName, sizeType] = Array.prototype.slice.call(/(.+)(Width|Margin)/.exec(resizeType)) as string[];
    const maxSideSize = this.props.textureType === 'brick' ? 8 : 6;
    const sideWidth = side[`${sideName}Width`];
    const sideMargin = side[`${sideName}Margin`];
    let newItem: any;
    if (sizeType === 'Width') {
      if (value + sideMargin > maxSideSize) {
        if (sideMargin > 0) {
          newItem = { [`${sideName}Width`]: value,  [`${sideName}Margin`]: sideMargin - 1 };
        } else {
          newItem = { [`${sideName}Width`]: sideWidth,  [`${sideName}Margin`]: sideMargin };
        }
      } else {
        newItem = { [`${sideName}Width`]: value };
      }
    } else {
      if (value + sideWidth > maxSideSize) {
        if (sideWidth > 0) {
          newItem = { [`${sideName}Width`]: sideWidth - 1,  [`${sideName}Margin`]: value };
        } else {
          newItem = { [`${sideName}Width`]: sideWidth,  [`${sideName}Margin`]: sideMargin };
        }
      } else {
        newItem = { [`${sideName}Margin`]: value };
      }
    }
    setSideSize(newItem);
  }

  public render() {
    const { textureType } = this.props;
    const [preview, tools] = React.Children.toArray(this.props.children);
    return (
      <div>
        <div className="container-window-options">
          <SideOption
            max={textureType === BRICK ? 8 : 6}
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'leftSide', flexDirection: 'column' }}
            sideName="left"
          />
          <SideOption
            max={textureType === BRICK ? 8 : 6}
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'topSide', flexDirection: 'row' }}
            sideName="top"
          />
          <SideOption
            max={textureType === BRICK ? 8 : 6}
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'rightSide', flexDirection: 'column' }}
            sideName="right"
          />
          <SideOption
            max={textureType === BRICK ? 8 : 6}
            side={this.props.side}
            handleInput={this.handleInput}
            style={{
              gridArea: 'bottomSide',
              flexDirection: 'row',
              marginTop: 6,
            }}
            sideName="bottom"
          />
          {tools}
          <div
            style={{
              width: '720px',
              height: '600px',
              gridArea: 'preview',
              position: 'relative',
            }}
          >
            {preview}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  side: state.side,
});

const mapDispatchToProps = {
  setSideSize: sideEnteties.setSideSize,
};

const SideSize = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SizeOptionsPanel);
export default SideSize;

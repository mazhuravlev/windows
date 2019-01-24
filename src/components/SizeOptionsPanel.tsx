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
  public handleInput = (sideName: string) => (value: number) => {
    const { setSideSize } = this.props;
    const newItem = { [sideName]: value };
    console.log(sideName, newItem);
    if (this.checkPreviewOverflow(newItem)) return;

    setSideSize(newItem);
  }

  public checkPreviewOverflow(newVal: Partial<ISideSize>) {
    const { side, textureType } = this.props;
    const newSide = { ...side, ...newVal };
    const maxSideSize = textureType === 'brick' ? 8 : 6;
    return [
      newSide.leftMargin + newSide.leftWidth > maxSideSize,
      newSide.topMargin + newSide.topWidth > maxSideSize,
      newSide.rightMargin + newSide.rightWidth > maxSideSize,
      newSide.bottomMargin + newSide.bottomWidth > maxSideSize,
    ].some(item => item);
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

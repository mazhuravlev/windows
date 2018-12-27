import * as React from 'react';
import { connect } from 'react-redux';
import { ISideSize } from '../interface';

import * as sideEnteties from '../redux/side';
import { IStore } from '../store';

import '../styles/SizeOptionsPanel.css';

import SideOption from './SideOption';

interface IProps {
  side: ISideSize;
  setSideSize: (size: sideEnteties.ISideSetType) => void;
}

export class SizeOptionsPanel extends React.Component<IProps> {

  public handleInput = (sideName: string) => (value: number) => {
    const { setSideSize } = this.props;
    const name = sideName as sideEnteties.SideItemType;
    setSideSize({ name, value });
  }

  public render() {
    return (
      <div>
        <div className="container-window-options">
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'leftSide', flexDirection: 'column' }}
            sideName="left"
          />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'topSide', flexDirection: 'row' }}
            sideName="top" />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'rightSide', flexDirection: 'column' }}
            sideName="right" />
          <SideOption
            side={this.props.side}
            handleInput={this.handleInput}
            style={{ gridArea: 'bottomSide', flexDirection: 'row' }}
            sideName="bottom" />
          {this.props.children}
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

const SideSize = connect(mapStateToProps, mapDispatchToProps)(SizeOptionsPanel);
export default SideSize;

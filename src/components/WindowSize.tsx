import * as React from 'react';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { Dispatch } from 'redux';
import { IWindowSize } from '../interface';
import * as actions from '../redux/window';
import { IStore } from '../store';

interface IWindowProps {
  window: IWindowSize;
  setWindowSize: (size: IWindowSize) => void;
  resetWindowSize: () => void;
}

class WindowSizeA extends React.Component<IWindowProps, {}> {
  public handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const { window } = this.props;
    this.props.setWindowSize({ ...window, [name]: Number(value) });
  }

  public handleClick = () => {
    this.props.setWindowSize({ width: 5, height: 6, padding: 2 });
  }

  public render() {
    const {
      window,
    } = this.props;
    return (
      <div className="window-size-container">
        <div className="window-size-item">
          <Label for="windowWidth">ww</Label>
          <Input
            id="windowWidth"
            name="width"
            type="number"
            min={1}
            max={10}
            value={window.width}
            onChange={this.handleInput}
          />
        </div>
        <div className="window-size-item">
          <Label for="windowHeight">wh</Label>
          <Input
            id="windowHeight"
            name="height"
            type="number"
            min={1}
            max={10}
            value={window.height}
            onChange={this.handleInput}
          />
        </div>
        <div className="window-size-item">
          <Label for="windowPadding">wp</Label>
          <Input
            id="windowPadding"
            name="padding"
            type="number"
            min={0}
            max={10}
            value={window.padding}
            onChange={this.handleInput}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  window: state.window,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.WindowAction>) => ({
  setWindowSize: (size: IWindowSize) => dispatch(actions.setWindowSize(size)),
  resetWindowSize: () => dispatch(actions.resetWindowSize()),
});

const WindowSize = connect(mapStateToProps, mapDispatchToProps)(WindowSizeA);
export default WindowSize;

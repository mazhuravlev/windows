import * as React from 'react';

import { Button, Input } from 'reactstrap';

interface IState {
  value: string;
}

class Options extends React.Component<{}, IState> {
  public state: IState = {
    value: '',
  };

  public handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    this.setState({ value });
  }

  public handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    alert(event.currentTarget.name);
  }

  public render() {
    return (
      <div>
        test Options
        <Input
          onChange={this.handleInput}
          placeholder="testInput"
          value={this.state.value}
        />
        <Button onClick={this.handleClick} color="primary" name="testButtonName">primary</Button>
      </div>
    );
  }
}

export default Options;

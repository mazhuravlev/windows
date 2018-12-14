import * as React from 'react';

// tslint:disable-next-line:interface-name
interface Props extends React.HTMLProps<HTMLInputElement> {
  readonly customProperty: string;
}

// tslint:disable-next-line:interface-name
interface State {
  value: string;
}

class Simple extends React.Component<Props, State> {
  public state: State = {
    value: '',
  };

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState(() => ({ value }));
  }

  public render() {
    const {
            customProperty,
            ...inputProps
        } = this.props;
    const { value } = this.state;

    return (
            <div>
                <h4>{customProperty}</h4>
                <input
                    {...inputProps}
                    value={value}
                    onChange={this.handleChange}
                />
             </div>
    );
  }
}

export default Simple;

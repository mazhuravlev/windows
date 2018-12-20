import * as React from 'react';
import { Input, Label } from 'reactstrap';

import { ISideSize } from '../interface';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  sideName: string;
  side: ISideSize;
  handleInput: (sideName: string) =>
    (event: React.FormEvent<HTMLInputElement>) => void;
}

const SideOption = (props: IProps) => {
  const { side, sideName, handleInput } = props;
  return (
    <div style={props.style} className="side-options-container">
      <div className="side-options-container-item">
        <Label for={`${sideName}-width`}>w</Label>
        <Input
          id={`${sideName}-width`}
          type="number"
          name="width"
          onChange={handleInput(`${sideName}Width`)}
          value={side[`${sideName}Width`]}
        />
      </div>
      <div className="side-options-container-item">
        <Label for={`${sideName}-margin`}>p</Label>
        <Input
          id={`${sideName}-margin`}
          type="number"
          name="margin"
          onChange={handleInput(`${sideName}Margin`)}
          value={side[`${sideName}Margin`]}
        />
      </div>
    </div>
  );
};

export default SideOption;

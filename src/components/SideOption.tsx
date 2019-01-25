import * as React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import { ISideSize } from '../interface';
import NumberInput from './NumberInput';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  sideName: string;
  side: ISideSize;
  max: number;
  handleInput: (sideName: string) =>
    (value: number) => void;
}

const handlePropagation = (event: React.FormEvent<HTMLDivElement>) => event.stopPropagation();

const SideOption = (props: IProps) => {
  const { side, sideName, handleInput } = props;
  return (
    <div onClick={handlePropagation} style={{ paddingLeft: 8, ...props.style }} className="side-options-container">
      <div className="side-options-container-item">
        <UncontrolledTooltip target={`${sideName}-width`}>Ширина</UncontrolledTooltip>
        <NumberInput
          id={`${sideName}-width`}
          style={{ position: 'relative' }}
          value={side[`${sideName}Width`]}
          min={0}
          max={props.max}
          onChange={handleInput(`${sideName}Width`)}
        />
      </div>
      <div className="side-options-container-item">
        <UncontrolledTooltip target={`${sideName}-margin`}>Отступ</UncontrolledTooltip>
        <NumberInput
          id={`${sideName}-margin`}
          style={{ position: 'relative' }}
          value={side[`${sideName}Margin`]}
          min={0}
          max={props.max - 1}
          onChange={handleInput(`${sideName}Margin`)}
        />
      </div>
    </div>
  );
};

export default SideOption;

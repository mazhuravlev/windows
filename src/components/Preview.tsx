import * as React from 'react';
import Sector from './Sector';
// import { InjectedProps } from './ColorInsertEditor';
import Window from './Window';

import { ISectorList } from './ColorInsertEditor';

import '../styles/Preview.css';

interface IProps {
  title: string;
  sectorList: ISectorList;
  step: number;
}

// tslint:disable-next-line:variable-name
const Preview = (props: IProps) => {
  const { sectorList, step } = props;
  return (
    <div className="preview-container">
      {
        Object.keys(sectorList).map((key) => {
          const sector = sectorList[key];
          return (
            <Sector
              key={sector.id}
              sector={sector}
              step={step}
              className="preview-container-item"
            />
          );
        })
      }
      <Window width={5} height={5} step={step} className="window1" />
      <Window width={5} height={5} step={step} className="window2" />
    </div>
  );
};

export default Preview;

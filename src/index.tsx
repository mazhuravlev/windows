import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ColorInsertEditor from './components/ColorInsertEditor';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ColorInsertEditor />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

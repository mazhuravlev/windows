import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App
    customProperty="Simple field component"
    placeholder="type some text..."
    // tslint:disable-next-line:jsx-no-lambda
    onFocus={() => {
      // tslint:disable-next-line:no-console
      return console.log('is focused!');
    }}
  />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

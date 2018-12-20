import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// tslint:disable-next-line:import-name
import configureStore from './store';

import ColorInsert from './components/ColorInsert';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ColorInsert />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

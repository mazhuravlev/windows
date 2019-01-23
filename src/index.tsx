import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// tslint:disable-next-line:import-name
import configureStore from './store';

import ColorInsert from './components/ColorInsert';

import registerServiceWorker from './registerServiceWorker';

if (window.CefSharp) {
  (async () => {
    await window.CefSharp.BindObjectAsync('vasya');
  })();
}

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ColorInsert isWindow={window.CefSharp}/>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

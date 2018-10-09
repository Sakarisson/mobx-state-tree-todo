import React from 'react';
import ReactDOM from 'react-dom';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import initializeStore from './store';
import App from './App';

const instance = initializeStore();

ReactDOM.render(<App store={instance} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import Store from './store';
import App from './App';

const instance = Store.create();

ReactDOM.render(<App store={instance} />, document.getElementById('root'));

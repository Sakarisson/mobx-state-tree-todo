import React from 'react';
import PropTypes from 'prop-types';

import ToggleAll from './ToggleAll';
import TodoList from '../TodoList';

const Main = ({ store }) => (
  <section className="main">
    <ToggleAll store={store} />
    <TodoList store={store} />
  </section>
);

Main.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Main;

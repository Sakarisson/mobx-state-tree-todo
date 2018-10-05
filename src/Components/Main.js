import React from 'react';
import PropTypes from 'prop-types';

import TodoList from './TodoList';

const Main = ({ store }) => (
  <section className="main">
    <TodoList store={store} />
  </section>
);

Main.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Main;

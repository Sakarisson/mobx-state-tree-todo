import React from 'react';
import PropTypes from 'prop-types';

import Header from './Components/Header';

const App = ({ store }) => (
  <section className="todoapp">
    <Header store={store} />
  </section>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

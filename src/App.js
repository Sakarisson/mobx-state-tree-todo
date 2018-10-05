import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { observer } from 'mobx-react';

import Header from './Components/Header';
import Main from './Components/Main';

const App = ({ store, pendingCount }) => (
  <section className="todoapp">
    <Header store={store} />
    {
      pendingCount > 0 ? (
        <Main store={store} />
      ) : null
    }
  </section>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

const wrapper = compose(
  observer,
  withProps(
    ({ store }) => ({ pendingCount: store.pendingCount }),
  ),
);

export default wrapper(App);

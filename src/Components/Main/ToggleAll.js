import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { compose, withHandlers, withProps } from 'recompose';

const wrap = compose(
  observer,
  withProps(
    ({ store }) => {
      const { pendingCount } = store;
      const toggled = pendingCount === 0;
      return { toggled };
    },
  ),
  withHandlers({
    toggle: ({ store, toggled }) => (event) => {
      const { toggleAll, activateAll } = store;
      if (toggled) {
        toggleAll();
      } else {
        activateAll();
      }
    },
  }),
)

const ToggleAll = ({ store, toggle, toggled }) => (
  <Fragment>
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={toggled}
      onChange={toggle}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </Fragment>
);

ToggleAll.propTypes = {
  store: PropTypes.object.isRequired,
};

export default wrap(ToggleAll);

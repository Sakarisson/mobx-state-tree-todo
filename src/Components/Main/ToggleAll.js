import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { compose, withHandlers, withProps } from 'recompose';

const wrap = compose(
  observer,
  withProps(
    ({ store }) => {
      const { pendingCount } = store;
      console.log(pendingCount)
      const toggled = pendingCount === 0;
      console.log(toggled);
      return { toggled };
    },
  ),
  withHandlers({
    toggle: ({ store, toggled }) => (event) => {
      event.preventDefault();
      if (toggled) {
        return;
      }
      const { toggleAll } = store;
      toggleAll();
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

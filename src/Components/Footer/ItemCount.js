import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

const getSingularOrPlural = (thing, count) => {
  let item = thing;
  if (count !== 1) {
    item += 's';
  }
  return `${item} left`;
};

const ItemCount = ({ store }) => (
  <span className="todo-count">
    <strong>{store.pendingCount}</strong> {getSingularOrPlural('item', store.pendingCount)}
  </span>
);

ItemCount.propTypes = {
  store: PropTypes.object.isRequired,
};

export default observer(ItemCount);

import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { observer } from 'mobx-react';

const ListItem = ({ item }) => {
  const { name, done, toggle } = item;
  const completedClass = done ? 'completed' : null; 
  return (
    <li className={completedClass}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={done}
          onChange={toggle}
        />
        <label>{name}</label>
        <button className="destroy"></button>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

const wrapper = compose(
  observer,
);

export default wrapper(ListItem);

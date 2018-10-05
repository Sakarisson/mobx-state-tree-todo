import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => {
  const { name, done } = item;
  const completedClass = done ? 'completed' : '';
  return (
    <li className={completedClass}>
      <div className="view">
        <input type="checkbox" className="toggle" defaultChecked={done} />
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

export default ListItem;

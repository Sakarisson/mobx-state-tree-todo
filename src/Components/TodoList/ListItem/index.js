import React from 'react';
import PropTypes from 'prop-types';

import container from './container';

const ListItem = ({
  item,
  destroy,
  startEditing,
  editing,
  setItemName,
  editValue,
  handleKey,
}) => {
  const { name, done, toggle } = item;
  const completedClass = done ? 'completed' : '';
  const editingClass = editing ? 'editing' : '';

  return (
    <li className={`${completedClass} ${editingClass}`}>
      <div className="view" onDoubleClick={startEditing}>
        <input
          type="checkbox"
          className="toggle"
          checked={done}
          onChange={toggle}
        />
        <label>{name}</label>
        <button
          className="destroy"
          onClick={destroy}
        />
      </div>
      <input
        className="edit"
        value={editValue}
        onChange={setItemName}
        onKeyDown={handleKey}
      />
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  destroy: PropTypes.func.isRequired,
  startEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  setItemName: PropTypes.func.isRequired,
  editValue: PropTypes.string.isRequired,
  handleKey: PropTypes.func.isRequired,
};

export default container(ListItem);

import React from 'react';
import PropTypes from 'prop-types';

import { compose, withStateHandlers } from 'recompose';
import { observer } from 'mobx-react';

const ListItem = ({
  item,
  destroy,
  startEditing,
  editing,
  setItemName,
}) => {
  const { name, done, toggle } = item;
  const completedClass = done ? 'completed' : null;
  const editingClass = editing ? 'editing' : null;
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
        value={name}
        onChange={setItemName}
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
  setItemName: PropTypes.func.isRequired,
};

const editHandler = withStateHandlers(
  () => ({ editing: false }),
  {
    startEditing: () => () => ({ editing: true }),
    stopEditing: () => () => ({ editing: false }),
    setItemName: (state, { item }) => (event) => {
      const { target } = event;
      const { value } = target;
      item.setName(value);
    },
  }
);

const wrapper = compose(
  editHandler,
  observer,
);

export default wrapper(ListItem);

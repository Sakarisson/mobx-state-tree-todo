import React from 'react';
import PropTypes from 'prop-types';

import { compose, withStateHandlers } from 'recompose';
import { observer } from 'mobx-react';

import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from '../../constants';

const ListItem = ({
  item,
  destroy,
  startEditing,
  saveEdit,
  cancelEdit,
  editing,
  setItemName,
  editValue,
}) => {
  const { name, done, toggle } = item;
  const completedClass = done ? 'completed' : '';
  const editingClass = editing ? 'editing' : '';

  const handleKey = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
      case ENTER_KEY_CODE:
        saveEdit();
        break;
      case ESCAPE_KEY_CODE:
        cancelEdit();
        break;
      default:
        break;
    }
  };

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
  saveEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  setItemName: PropTypes.func.isRequired,
};

const editHandler = withStateHandlers(
  ({ item }) => ({
    editing: false,
    editValue: item.name,
  }),
  {
    startEditing: () => () => ({ editing: true }),
    saveEdit: ({ editValue }, { item }) => () => {
      item.setName(editValue);
      return { editing: false };
    },
    cancelEdit: (state, { item }) => () => ({
      editing: false,
      editValue: item.name,
    }),
    setItemName: (state, { item }) => (event) => {
      const { target } = event;
      const { value } = target;
      return { editValue: value };
    },
  }
);

const wrapper = compose(
  editHandler,
  observer,
);

export default wrapper(ListItem);

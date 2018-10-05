import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

const TodoList = ({ store }) => (
  <ul className="todo-list">
    {store.todos.map(todo => <ListItem item={todo} key={todo.id} />)}
  </ul>
);

TodoList.propTypes = {
  store: PropTypes.object.isRequired,
};

export default TodoList;

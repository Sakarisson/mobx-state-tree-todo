import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ListItem from './ListItem';

const TodoList = ({ store }) => (
  <ul className="todo-list">
    {store.filteredTodos.map(todo => (
      <ListItem
        item={todo}
        key={todo.id}
        destroy={() => store.removeTodo(todo.id)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  store: PropTypes.object.isRequired,
};

const wrap = observer;

export default wrap(TodoList);

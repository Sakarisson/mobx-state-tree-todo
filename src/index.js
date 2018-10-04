import React from 'react';
import ReactDOM from 'react-dom';

import { types } from 'mobx-state-tree';

const Todo = types
  .model({
    name: '',
    done: false,
  })
  .actions((self) => ({
    setName: (newName) => { self.name = newName },
    toggle: () => { self.done = !self.done },
  }));

const User = types
  .model({
    name: ''
  });

const RootStore = types
  .model({
    users: types.array(User),
    todos: types.array(Todo),
  })
  .views((self) => ({
    get pendingCount() {
      return self.todos.filter(todo => !todo.done).length;
    },
  }))
  .actions((self) => ({
    addTodo: (name) => self.todos.push(Todo.create({ name })),
}));

const store = RootStore.create();

store.addTodo('Eat a cake');

window.store = store;

ReactDOM.render(<div />, document.getElementById('root'));

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

const Store = types
  .model({
    todos: types.array(Todo),
  })
  .views((self) => ({
    get activeTodos() {
      return self.todos.filter(todo => !todo.done);
    },
    get pendingCount() {
      return self.activeTodos.length;
    },
    get todoCount() {
      return self.todos.length;
    }
  }))
  .actions((self) => ({
    addTodo: (name) => self.todos.push(Todo.create({ name })),
}));

export default Store;

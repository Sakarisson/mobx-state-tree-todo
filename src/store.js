import { types } from 'mobx-state-tree';

const Todo = types
  .model({
    name: '',
    done: false,
    id: types.number,
  })
  .actions((self) => ({
    setName: (newName) => { self.name = newName },
    toggle: () => { self.done = !self.done },
    setDone: (done) => { self.done = done },
  }));

const Store = types
  .model('TodoStore', {
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
    },
    get nextId() {
      const ids = self.todos.map(todo => todo.id);
      const findMaxId = (current, max) => current >= max ? current + 1 : max;
      return ids.reduce(findMaxId, 0);
    },
  }))
  .actions((self) => ({
    addTodo: (name) => {
      const id = self.nextId;
      self.todos.push(Todo.create({ name, id }))
    },
    removeTodo: (id) => {
      const index = self.todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return;
      }
      self.todos.splice(index, 1);
    },
    activateAll: () => self.todos.forEach(todo => todo.setDone(true)),
    toggleAll: () => self.todos.forEach(todo => todo.toggle()),
  }));

export default Store;

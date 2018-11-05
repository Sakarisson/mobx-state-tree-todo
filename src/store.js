import { types, onSnapshot } from 'mobx-state-tree';

const Todo = types
  .model({
    name: types.string,
    done: types.optional(types.boolean, false),
    id: types.number,
  })
  .actions((self) => ({
    setName(newName) {
      self.name = newName;
    },
    toggle() {
      self.done = !self.done;
    },
    setDone(done) {
      self.done = done;
    },
  }));

const Store = types
  .model({
    todos: types.array(Todo),
    filter: types.optional(types.string, 'all'),
  })
  .views((self) => ({
    get completedTodos() {
      return self.todos.filter(todo => todo.done);
    },
    get pendingTodos() {
      return self.todos.filter(todo => !todo.done);
    },
    get pendingCount() {
      return self.pendingTodos.length;
    },
    get filteredTodos() {
      const { filter } = self;
      switch (filter) {
        case 'active':
          return self.pendingTodos;
        case 'completed':
          return self.completedTodos;
        default:
          return self.todos;
      }
    },
    get todoCount() {
      return self.todos.length;
    },
    get nextId() {
      const ids = self.todos.map(todo => todo.id);
      const findMaxId = (max, current) => current >= max ? current + 1 : max;
      const max = ids.reduce(findMaxId, 0);
      return max;
    },
  }))
  .actions((self) => ({
    addTodo(name) {
      // Name can not be empty
      if (name === '') {
        return;
      }
      const id = self.nextId;
      self.todos.push(Todo.create({ name, id }))
    },
    removeTodo(id) {
      const index = self.todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return;
      }
      self.todos.splice(index, 1);
    },
    activateAll() {
      self.todos.forEach(todo => todo.setDone(true));
    },
    toggleAll() {
      self.todos.forEach(todo => todo.toggle());
    },
    filterBy(filter) {
      self.filter = filter;
    },
    clearCompleted() {
      const completedIds = self.completedTodos.map(todo => todo.id);

      completedIds.forEach(id => self.removeTodo(id));
    },
  }));

const initializeStore = () => {
  let instance = null;
  if (localStorage.getItem('todo-store')) {
    try {
      const initialState = JSON.parse(localStorage.getItem('todo-store'));
      instance = Store.create(initialState);
    } catch (e) {
      // There was something wrong with the stored data.
      instance = Store.create();
    }
  } else {
    instance = Store.create();
  }
  onSnapshot(instance, (snapshot) => {
    localStorage.setItem('todo-store', JSON.stringify(snapshot));
  });
  return instance;
};

export default initializeStore;

import { types, onSnapshot } from 'mobx-state-tree';

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
    filter: 'all',
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
    filterBy: (filter) => { self.filter = filter },
    clearCompleted: () => {
      const completedIds = self.completedTodos.map(todo => todo.id);

      completedIds.forEach(id => self.removeTodo(id));
    },
  }));

const initializeStore = () => {
  let initialState = null;
  if (localStorage.getItem('todo-store')) {
    initialState = JSON.parse(localStorage.getItem('todo-store'));
  }
  const instance = Store.create(initialState);
  onSnapshot(instance, (snapshot) => {
    localStorage.setItem('todo-store', JSON.stringify(snapshot));
  });
  return instance;
};

export default initializeStore;

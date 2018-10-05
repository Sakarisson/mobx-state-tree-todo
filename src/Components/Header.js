import React from 'react';
import { withStateHandlers } from 'recompose';

const ENTER_KEY_CODE = 13;
const baseState = { text: '' };

const wrap = withStateHandlers(
  () => baseState,
  {
    setText: () => (event) => {
      event.preventDefault();
      const { target } = event;
      const { value } = target;
      return { text: value };
    },
    submit: (state, props) => (event) => {
      if (event.keyCode !== ENTER_KEY_CODE) {
        return;
      }
      const { text } = state;
      const { store } = props;
      store.addTodo(text);
      return baseState;
    },
  },
);

const Header = ({ text, setText, submit }) => (
  <header className="header">
    <h1>todos</h1>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={text}
      onChange={setText}
      autoFocus
      onKeyUp={submit}
    />
  </header>
);

const EnhancedHeader = wrap(Header);

export default EnhancedHeader;

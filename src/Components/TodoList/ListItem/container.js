import {
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import { observer } from 'mobx-react';

import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from '../../../constants';

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

const handleKey = withHandlers({
  handleKey: ({ saveEdit, cancelEdit }) => (event) => {
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
  },
});

export default compose(
  editHandler,
  handleKey,
  observer,
);

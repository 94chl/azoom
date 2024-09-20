import genUid from "light-uid";

export type todoListItemType = {
  id: string;
  title: string;
  content: string;
  status: boolean;
  checked: boolean;
  date?: Date;
  // order: number;
  // lastEditedDate: string;
};

const initialListItem: todoListItemType = {
  id: "",
  title: "",
  content: "",
  status: false,
  checked: false,
  date: undefined,
};

interface todoStateType {
  todoList: Record<string, todoListItemType>;
}

export const useTodoStore = defineStore("todoStore", {
  state: (): todoStateType => ({
    todoList: {
      dummy1: {
        ...initialListItem,
        id: "dummy1",
        title: "dummy",
      },
      dummy10: {
        ...initialListItem,
        id: "dummy10",
        title: "dummy10",
      },
    },
  }),
  actions: {
    addTodoListItem() {
      let newListItemId = genUid(8);
      while (!this.todoList[newListItemId]) {
        if (this.todoList[newListItemId]) {
          newListItemId = genUid(8);
        } else {
          this.todoList[newListItemId] = {
            ...initialListItem,
            title: newListItemId,
            id: newListItemId,
            date: new Date(),
          };
        }
      }
    },
    deleteTodoListItem(listItemId: string) {
      if (this.todoList[listItemId]) delete this.todoList[listItemId];
    },
    deleteTodoListItems() {
      Object.keys(this.todoList).forEach((listItemId) => {
        const target = this.todoList[listItemId];
        if (target.checked) delete this.todoList[listItemId];
      });
    },
  },
});

type todoListItemType = {
  id: string;
  title: string;
  content: string;
  status: boolean;
  date: string;
  // order: number;
  // lastEditedDate: string;
};

interface todoStateType {
  todoList: Record<string, todoListItemType>;
  foo: boolean;
}

export const useTodoStore = defineStore("todoStore", {
  state: (): todoStateType => ({
    todoList: {
      dummy1: {
        id: "dummy1",
        title: "dummy",
        content: "",
        status: false,
        date: "0",
      },
      dummy10: {
        id: "dummy10",
        title: "dummy10",
        content: "",
        status: true,
        date: "0",
      },
    },
    foo: false,
  }),
  actions: {
    addTodoList(listItem: todoListItemType) {
      const listItemId = listItem.id;
      if (!this.todoList[listItemId]) this.todoList[listItemId] = listItem;
    },
    deleteTodoList(listItemId: string) {
      if (this.todoList[listItemId]) delete this.todoList[listItemId];
    },
  },
});

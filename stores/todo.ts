import genUid from "light-uid";

export type todoListItemType = {
  id: string;
  title: string;
  content: string;
  status: boolean;
  checked: boolean;
  editDate: Date;
};

type todoList = Record<string, todoListItemType>;

const initialListItem: todoListItemType = {
  id: "",
  title: "",
  content: "",
  status: false,
  checked: false,
  editDate: new Date(),
};

const todoListOrder = ["dummy1", "dummy2", "dummy3"];
const todoListDummy = () =>
  todoListOrder.reduce((acc: todoList, cur) => {
    acc[cur] = { ...initialListItem, id: cur, title: cur };
    return acc;
  }, {});

interface todoStateType {
  todoList: todoList;
  todoListOrder: string[];
  isOpenListModal: boolean;
  openedListItemId?: string;
}

export const useTodoStore = defineStore("todoStore", {
  state: (): todoStateType => ({
    todoList: todoListDummy(),
    todoListOrder: todoListOrder,
    isOpenListModal: false,
    openedListItemId: undefined,
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
            editDate: new Date(),
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
    seTTodoListItem(todoListItem: todoListItemType) {
      if (this.todoList[todoListItem.id])
        this.todoList[todoListItem.id] = todoListItem;
    },
    setIsOpenListModal(listItemId?: string) {
      this.isOpenListModal = !!listItemId;
      this.openedListItemId = listItemId;
    },
    sortByTitle(ascend: boolean) {
      this.todoListOrder.sort((a, b) => {
        let result = 0;
        if (ascend) {
          result = this.todoList[a].title > this.todoList[b].title ? 1 : -1;
        } else {
          result = this.todoList[a].title < this.todoList[b].title ? 1 : -1;
        }
        return result;
      });
    },
  },
  getters: {
    getListItemById: (state) => (listItemId: string) =>
      state.todoList[listItemId],
    getOpenedListItem: (state) =>
      state.openedListItemId
        ? state.todoList[state.openedListItemId]
        : initialListItem,
  },
});

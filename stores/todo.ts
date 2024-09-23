import genUid from "light-uid";

export type todoListItemType = {
  id: string;
  title: string;
  content: string;
  done: boolean;
  checked: boolean;
  editDate: Date;
};

type todoList = Record<string, todoListItemType>;

const initialListItem: todoListItemType = {
  id: "",
  title: "",
  content: "",
  done: false,
  checked: false,
  editDate: new Date(),
};

const todoListOrder = ["dummy1", "dummy2", "dummy3"];
const generateTodoListDummy = () =>
  todoListOrder.reduce((acc: todoList, cur) => {
    acc[cur] = {
      ...initialListItem,
      id: cur,
      title: cur,
      editDate: new Date(),
    };
    return acc;
  }, {});

interface todoStateType {
  todoList: todoList;
  todoListOrder: string[];
  flagIds: Set<string>;
  isOpenListModal: boolean;
  openedListItemId?: string;
}

export const useTodoStore = defineStore("todoStore", {
  state: (): todoStateType => ({
    todoList: generateTodoListDummy(),
    todoListOrder: todoListOrder,
    flagIds: new Set<string>(),
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
            title: "new list",
            id: newListItemId,
            editDate: new Date(),
          };
          this.todoListOrder.push(newListItemId);
        }
      }
    },
    deleteTodoListItem(listItemId: string) {
      const todoListOrderIndex = this.todoListOrder.findIndex(
        (orderListItemId) => orderListItemId === listItemId
      );
      if (this.todoList[listItemId] && todoListOrderIndex > -1) {
        this.todoListOrder.slice(todoListOrderIndex, 1);
        delete this.todoList[listItemId];
      }
    },
    deleteTodoListItems() {
      const newListOrder = this.todoListOrder.filter((listItemId) => {
        const target = this.todoList[listItemId];
        if (target.checked) {
          delete this.todoList[listItemId];
          return false;
        }
        return true;
      });
      this.todoListOrder = newListOrder;
    },
    setTodoListItem(todoListItem: todoListItemType) {
      if (this.todoList[todoListItem.id])
        this.todoList[todoListItem.id] = todoListItem;
    },
    setIsOpenListModal(listItemId?: string) {
      this.isOpenListModal = !!listItemId;
      this.openedListItemId = listItemId;
    },
    sortList({
      orderBy,
      isAscend,
    }: {
      orderBy: keyof todoListItemType;
      isAscend: boolean;
    }) {
      this.todoListOrder.sort((a, b) => {
        const prevValue = this.todoList[a][orderBy];
        const nextValue = this.todoList[b][orderBy];
        let result = 0;
        if (isAscend) {
          result = prevValue >= nextValue ? 1 : -1;
        } else {
          result = prevValue <= nextValue ? 1 : -1;
        }
        return result;
      });
    },
    sortListByFlag() {
      const newOrder = this.todoListOrder
        .filter((id) => this.flagIds.has(id))
        .concat(this.todoListOrder.filter((id) => !this.flagIds.has(id)));
      this.todoListOrder = newOrder;
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

<template>
  <div>
    <div>
      <div>To-do List</div>
      <div>
        <UButton @click="addList">add</UButton>
        <UButton @click="deleteListItems">delete</UButton>
      </div>
    </div>
    <TableRow>
      <div>check</div>
      <ListSortButton
        :now-order-by="orderBy"
        order-by="status"
        :is-ascend="isAscend"
        :sort-list="sortList"
      ></ListSortButton>
      <ListSortButton
        :now-order-by="orderBy"
        order-by="title"
        :is-ascend="isAscend"
        :sort-list="sortList"
      ></ListSortButton>
      <ListSortButton
        :now-order-by="orderBy"
        order-by="editDate"
        :is-ascend="isAscend"
        :sort-list="sortList"
      ></ListSortButton>
    </TableRow>
    <div v-for="value in todoListOrder" :key="value">
      <TodoListItem :list-item-id="value"></TodoListItem>
    </div>
    <ListModal></ListModal>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListItem, deleteTodoListItems } = todoStore;
const { todoListOrder } = storeToRefs(todoStore);
let isAscend = ref(true);
let orderBy = ref<keyof todoListItemType>("title");

const addList = () => {
  addTodoListItem();
};

const deleteListItems = () => {
  deleteTodoListItems();
};

const sortList = ({
  newOrderBy,
  newAscend,
}: {
  newOrderBy: keyof todoListItemType;
  newAscend: boolean;
}) => {
  if (orderBy.value !== newOrderBy) {
    orderBy.value = newOrderBy;
    isAscend.value = true;
  } else {
    isAscend.value = newAscend;
  }
  todoStore.sortList({ orderBy: orderBy.value, isAscend: isAscend.value });
};

const unsubscribe = todoStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === "setTodoListItem") {
      sortList({ newOrderBy: orderBy.value, newAscend: isAscend.value });
    }
  });
});

onMounted(() => {
  sortList({ newOrderBy: orderBy.value, newAscend: isAscend.value });
});

onUnmounted(() => {
  unsubscribe();
});
</script>

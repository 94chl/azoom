<template>
  <div id="root">
    <Header></Header>
    <div>
      <TableRow>
        <UCheckbox v-model="isAllChecked" @change="toggleAllCheck"></UCheckbox>
        <ListSortButton
          :now-order-by="orderBy"
          order-by="done"
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
      <TodoListItem
        v-for="value in todoListOrder"
        :key="value"
        :list-item-id="value"
      ></TodoListItem>
    </div>
    <ListModal></ListModal>
  </div>
</template>

<style>
#root {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { todoListOrder } = storeToRefs(todoStore);
let isAscend = ref(true);
let orderBy = ref<keyof todoListItemType>("title");
const isAllChecked = computed(
  () =>
    Object.values(todoStore.todoList).filter(({ checked }) => !checked).length <
    1
);

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

const toggleAllCheck = () => {
  const nextValue = !isAllChecked.value;
  Object.values(todoStore.todoList).forEach((todoList) => {
    todoList.checked = nextValue;
  });
};

const unsubscribe = todoStore.$onAction(({ name, after }) => {
  after(() => {
    if (["setTodoListItem", "addTodoListItem"].includes(name)) {
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

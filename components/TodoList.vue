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
      <div>done</div>
      <div>title</div>
      <div>edit date</div>
    </TableRow>
    <div v-for="value in todoListOrder" :key="value">
      <TodoListItem :list-item-id="value"></TodoListItem>
    </div>
    <ListModal></ListModal>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListItem, deleteTodoListItems, sortByTitle } = todoStore;
const { todoListOrder } = storeToRefs(todoStore);
let titleOrder = ref(true);

const addList = () => {
  addTodoListItem();
};
const deleteListItems = () => {
  deleteTodoListItems();
};
const orderByTitle = (ascend: boolean) => {
  if (titleOrder.value !== ascend) titleOrder.value = ascend;
  sortByTitle(ascend);
};
</script>

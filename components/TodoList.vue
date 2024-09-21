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
    <div v-for="value in todoList" :key="value.id">
      <TodoListItem :list-item-id="value.id"></TodoListItem>
    </div>
    <ListModal></ListModal>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListItem, deleteTodoListItems } = todoStore;
const { todoList } = storeToRefs(todoStore);

const addList = () => {
  addTodoListItem();
};
const deleteListItems = () => {
  deleteTodoListItems();
};
</script>

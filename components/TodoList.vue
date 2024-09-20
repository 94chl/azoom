<template>
  <div>
    <div>
      <div>To-do List</div>
      <div>
        <button @click="addList">add</button>
        <button @click="deleteListItems">delete</button>
      </div>
    </div>
    <TableRow>
      <div>check</div>
      <div>done</div>
      <div>title</div>
      <div>edit</div>
      <div>delete</div>
    </TableRow>
    <div v-for="value in todoList" :key="value.id">
      <TodoListItem :list-item-id="value.id"></TodoListItem>
    </div>
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

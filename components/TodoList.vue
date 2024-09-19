<template>
  <div>
    <div>
      <div>To-do List</div>
      <div>
        <button @click="addList">add</button>
      </div>
    </div>
    <div v-for="value in todoList" :key="value.id">
      <TodoListItem :list-item="value"></TodoListItem>
    </div>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListItem } = todoStore;
const { todoList } = storeToRefs(todoStore);

const addList = () => {
  addTodoListItem();
};
</script>

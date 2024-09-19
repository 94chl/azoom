<template>
  <div>
    <div>
      <div>To-do List</div>
      <div>
        <button @click="addList">add</button>
      </div>
    </div>
    <div
      v-for="value in todoList"
      :key="value.id"
      style="display: flex; gap: 8px"
    >
      <input type="checkbox" :checked="value.status" />
      <div>{{ value.title }}</div>
      <button @click="deleteList(value.id)">delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListItem, deleteTodoListItem } = todoStore;
const { todoList } = storeToRefs(todoStore);

const addList = () => {
  addTodoListItem();
};

const deleteList = (listItemId: string) => {
  deleteTodoListItem(listItemId);
};
</script>

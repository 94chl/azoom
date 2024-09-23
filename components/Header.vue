<template>
  <div class="header">
    <h1 class="headerTitle">To-do List</h1>
    <div class="headerButtons">
      <UButton @click="addList" icon="i-mdi-playlist-plus">Add</UButton>
      <UButton
        @click="openDeleteModal"
        icon="i-mdi-playlist-remove"
        :disabled="checkedListItems.length < 1"
        >Delete</UButton
      >
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.headerTitle {
  font-size: 2em;
  font-weight: bold;
}

.headerButtons {
  display: flex;
  gap: 16px;
  align-self: flex-end;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { addTodoListDummy, addTodoListItem, deleteTodoListItems } = todoStore;
const checkedListItems = computed(() =>
  Object.values(todoStore.todoList).filter((listItem) => listItem.checked)
);

const addList = () => {
  addTodoListItem();
};

const openDeleteModal = () => {
  todoStore.isOpenListDeleteModal = true;
};

onMounted(() => {
  if (todoStore.todoListOrder.length < 1) addTodoListDummy();
});
</script>

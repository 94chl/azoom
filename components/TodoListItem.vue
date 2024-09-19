<template>
  <div style="display: flex; gap: 8px">
    <input type="checkbox" v-model="status" @input="updateListStatus()" />
    <input
      v-if="isEditing"
      type="text"
      v-model="title"
      @input="onChangeListTitle($event)"
    />
    <div v-else @dblclick="updateListTitle()">{{ title }}</div>
    <button @click="updateListTitle()">
      {{ isEditing ? "done" : "edit" }}
    </button>
    <button @click="deleteList()">delete</button>
  </div>
</template>

<script setup lang="ts">
import type { todoListItemType } from "~/stores/todo";

const { listItem } = defineProps<{ listItem: todoListItemType }>();
const { id, title, status } = listItem;

const todoStore = useTodoStore();
const { deleteTodoListItem, updateTodoListItem } = todoStore;
const isEditing = ref(false);
const newListTitle = ref(todoStore.todoList[id].title);

const deleteList = () => {
  deleteTodoListItem(id);
};

const updateListStatus = () => {
  const targetListItem = todoStore.todoList[id];
  if (targetListItem) {
    targetListItem.status = !targetListItem.status;
    updateTodoListItem(targetListItem);
  }
};

const onChangeListTitle = (e: Event) => {
  newListTitle.value = (e.target as HTMLInputElement).value;
};

const updateListTitle = () => {
  if (isEditing.value) {
    const targetListItem = todoStore.todoList[id];
    targetListItem.title = newListTitle.value;
    updateTodoListItem(targetListItem);
  }
  isEditing.value = !isEditing.value;
};
</script>

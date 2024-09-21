<template>
  <TableRow>
    <UCheckbox v-model="checked" @input="checkListStatus()" />
    <UCheckbox v-model="status" @input="updateListStatus()" />
    <div @dblclick="openListModal()" class="title" :class="[{ done: status }]">
      {{ title }}
    </div>
    <div>{{ editDate.toLocaleString("ja-JP") }}</div>
  </TableRow>
</template>

<style>
.input {
  justify-self: baseline;
  width: 100%;
}

.title.done {
  text-decoration: line-through;
}
</style>

<script setup lang="ts">
const props = defineProps<{ listItemId: string }>();
const id = props.listItemId;
const todoStore = useTodoStore();
const title = computed(() => todoStore.todoList[id].title);
const status = computed(() => todoStore.todoList[id].status);
const checked = computed(() => todoStore.todoList[id].checked);
const editDate = computed(() => todoStore.todoList[id].editDate);
const { deleteTodoListItem, setIsOpenListModal } = todoStore;

const deleteList = () => {
  deleteTodoListItem(id);
};

const checkListStatus = () => {
  const targetListItem = todoStore.todoList[id];
  if (targetListItem) {
    targetListItem.checked = !targetListItem.checked;
  }
};
const updateListStatus = () => {
  const targetListItem = todoStore.todoList[id];
  if (targetListItem) {
    targetListItem.status = !targetListItem.status;
  }
};

const openListModal = () => {
  setIsOpenListModal(id);
};
</script>

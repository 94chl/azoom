<template>
  <UModal v-model="todoStore.isOpenListDeleteModal">
    <UAlert
      :actions="[
        {
          variant: 'solid',
          color: 'primary',
          label: 'Delete',
          click: deleteListItems,
        },
        {
          variant: 'outline',
          color: 'primary',
          label: 'Cancel',
          click: closeModal,
        },
      ]"
      title="The checked list will be deleted. Are you sure to delete?"
    >
      <template #description>
        <ul class="checkedList">
          <li
            v-for="value in checkedListItems"
            :key="`checkedList_${value.id}`"
          >
            - {{ value.title }}
          </li>
        </ul>
      </template>
    </UAlert>
  </UModal>
</template>

<style>
.checkedList {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-indent: 14px;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { deleteTodoListItems } = todoStore;
const checkedListItems = computed(() =>
  Object.values(todoStore.todoList).filter((listItem) => listItem.checked)
);

const closeModal = () => {
  todoStore.isOpenListDeleteModal = false;
};

const deleteListItems = () => {
  deleteTodoListItems();
  closeModal();
};
</script>

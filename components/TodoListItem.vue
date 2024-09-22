<template>
  <TableRow>
    <UCheckbox v-model="targetListItem.checked" />
    <UCheckbox v-model="targetListItem.status" />
    <div
      @dblclick="openListModal()"
      class="title"
      :class="[{ done: targetListItem.status }]"
    >
      {{ targetListItem.title }}
    </div>
    <div>{{ targetListItem.editDate.toLocaleString("ja-JP") }}</div>
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
const targetListItem = computed(() => todoStore.todoList[id]);
const { setIsOpenListModal } = todoStore;

const openListModal = () => {
  setIsOpenListModal(id);
};
</script>

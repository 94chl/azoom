<template>
  <TableRow>
    <UCheckbox v-model="targetListItem.checked" />
    <UCheckbox v-model="targetListItem.done" />
    <div
      @dblclick="openListModal()"
      class="title"
      :class="[{ done: targetListItem.done }]"
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
const { setIsOpenListModal } = todoStore;
const targetListItem = ref(todoStore.getListItemById(id));

watch(
  () => todoStore.getListItemById(id),
  () => {
    targetListItem.value = todoStore.getListItemById(id);
  },
  { deep: true }
);

const openListModal = () => {
  setIsOpenListModal(id);
};
</script>

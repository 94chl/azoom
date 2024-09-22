<template>
  <TableRow>
    <UCheckbox v-model="targetListItem.checked" />
    <UCheckbox v-model="targetListItem.done" />
    <UButton
      @click="openListModal()"
      class="listTitle"
      :class="[{ done: targetListItem.done }]"
      color="white"
      variant="ghost"
    >
      {{ targetListItem.title }}
    </UButton>
    <div>{{ targetListItem.editDate.toLocaleString("ja-JP") }}</div>
  </TableRow>
</template>

<style>
.input {
  justify-self: baseline;
  width: 100%;
}

.listTitle {
  text-decoration: underline;
  cursor: pointer;

  &.done {
    text-decoration: underline line-through;
    color: #999;
  }
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

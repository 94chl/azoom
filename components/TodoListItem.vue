<template>
  <TableRow>
    <UButton
      @click="toggleFlag"
      :icon="
        flagIds.has(targetListItem.id)
          ? 'i-mdi-flag'
          : 'i-mdi-flag-variant-outline'
      "
      color="white"
      variant="ghost"
    ></UButton>
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
const { setIsOpenListModal, sortListByFlag } = todoStore;
const { flagIds } = storeToRefs(todoStore);
const targetListItem = ref(todoStore.getListItemById(id));

const toggleFlag = () => {
  const targetId = targetListItem.value.id;
  const isFlagged = flagIds.value.has(targetId);
  if (isFlagged) {
    flagIds.value.delete(targetId);
  } else {
    flagIds.value.add(targetId);
  }
  sortListByFlag();
};

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

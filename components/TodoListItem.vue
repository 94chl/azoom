<template>
  <TableRow>
    <UCheckbox
      :value="targetListItem.checked"
      @change="(value) => changeTargetListItemProp({ value, prop: 'checked' })"
    />
    <UCheckbox
      :value="targetListItem.status"
      @change="(value) => changeTargetListItemProp({ value, prop: 'status' })"
    />
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
const { seTTodoListItem, setIsOpenListModal, getListItemById } = useTodoStore();
const targetListItem = computed(() => getListItemById(id));

const changeTargetListItemProp = ({
  value,
  prop,
}: {
  value: boolean;
  prop: keyof todoListItemType;
}) => {
  const newTargetListItem = { ...targetListItem.value, [prop]: value };
  seTTodoListItem(newTargetListItem);
};

const openListModal = () => {
  setIsOpenListModal(id);
};
</script>

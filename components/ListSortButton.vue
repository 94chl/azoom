<template>
  <UButton
    @click="sortList({ newOrderBy: orderBy, newAscend: !isAscend })"
    :icon="
      nowOrderBy === orderBy
        ? `i-mdi-sort-${!isAscend ? 'descending' : 'ascending'}`
        : undefined
    "
    trailing
    color="black"
    variant="link"
    >{{ text[orderBy] }}</UButton
  >
</template>

<script setup lang="ts">
const text: Partial<Record<keyof todoListItemType, string>> = {
  title: "Title",
  editDate: "Edit date",
  done: "Done",
};
const props = defineProps<{
  nowOrderBy: keyof todoListItemType;
  orderBy: keyof todoListItemType;
  isAscend: boolean;
  sortList: (props: {
    newOrderBy: keyof todoListItemType;
    newAscend: boolean;
  }) => void;
}>();
const { orderBy, sortList } = props;
let { nowOrderBy, isAscend } = props;

watch(
  () => props.isAscend,
  (newValue) => {
    isAscend = newValue;
  },
  { deep: true }
);

watch(
  () => props.nowOrderBy,
  (newValue) => {
    nowOrderBy = newValue;
  },
  { deep: true }
);
</script>

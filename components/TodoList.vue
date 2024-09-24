<template>
  <div class="todoList">
    <Header></Header>
    <div>
      <TableHeader></TableHeader>
      <TodoListItem
        v-for="value in todoListOrder.slice(
          (page - 1) * Number(selectedNumOfList),
          page * Number(selectedNumOfList)
        )"
        :key="`todoList_${value}`"
        :list-item-id="value"
      ></TodoListItem>
    </div>
    <div class="listPages">
      <UPagination
        v-model="page"
        :page-count="Number(selectedNumOfList)"
        :total="todoListOrder.length"
        show-last
        show-first
      />

      <USelectMenu v-model="selectedNumOfList" :options="numOfList" />
    </div>
  </div>
</template>

<style>
.todoList {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.listPages {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { todoListOrder } = storeToRefs(todoStore);
const page = ref(1);
const numOfList = ["3", "5", "10", "30", "50"];
const selectedNumOfList = ref(numOfList[0]);

watch(
  () => selectedNumOfList.value,
  () => {
    page.value = 1;
  },
  { deep: true }
);

onMounted(() => {
  if (todoStore.todoListOrder.length < 1) todoStore.addTodoListDummy();
});
</script>

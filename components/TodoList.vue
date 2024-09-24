<template>
  <div id="todoList">
    <Header></Header>
    <div>
      <TableHeader></TableHeader>
      <TodoListItem
        v-for="value in todoListOrder"
        :key="`todoList_${value}`"
        :list-item-id="value"
      ></TodoListItem>
    </div>
  </div>
</template>

<style>
#todoList {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { todoListOrder } = storeToRefs(todoStore);

onMounted(() => {
  if (todoStore.todoListOrder.length < 1) todoStore.addTodoListDummy();
});
</script>

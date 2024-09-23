<template>
  <div id="root">
    <Header></Header>
    <div>
      <TableHeader></TableHeader>
      <TodoListItem
        v-for="value in todoListOrder"
        :key="value"
        :list-item-id="value"
      ></TodoListItem>
    </div>
  </div>
</template>

<style>
#root {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { todoListOrder } = storeToRefs(todoStore);
</script>

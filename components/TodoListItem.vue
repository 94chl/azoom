<template>
  <TableRow>
    <input type="checkbox" v-model="status" @input="updateListStatus()" />
    <input
      v-if="isEditing"
      type="text"
      v-model="title"
      @input="onChangeListTitle($event)"
      class="input"
      autofocus
    />
    <div
      v-else
      @dblclick="updateListTitle()"
      class="title"
      :class="[{ done: status }]"
    >
      {{ title }}
    </div>
    <button @click="updateListTitle()">
      {{ isEditing ? "done" : "edit" }}
    </button>
    <button @click="deleteList()">delete</button>
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
const title = computed(() => todoStore.todoList[id].title);
const status = computed(() => todoStore.todoList[id].status);
const { deleteTodoListItem } = todoStore;

const isEditing = ref(false);
const newListTitle = ref(todoStore.todoList[id].title);

const deleteList = () => {
  deleteTodoListItem(id);
};

const updateListStatus = () => {
  const targetListItem = todoStore.todoList[id];
  if (targetListItem) {
    targetListItem.status = !targetListItem.status;
  }
};

const onChangeListTitle = (e: Event) => {
  newListTitle.value = (e.target as HTMLInputElement).value;
};

const updateListTitle = () => {
  if (isEditing.value) {
    const targetListItem = todoStore.todoList[id];
    targetListItem.title = newListTitle.value;
  }
  isEditing.value = !isEditing.value;
};
</script>

<template>
  <UModal v-model="todoStore.isOpenListModal">
    <div class="card">
      <UInput
        v-if="isEditing"
        type="text"
        v-model="listItemInfo.title"
        @blur="changeIsEditing(false)"
        class="input"
        autofocus
      />
      <div v-else class="title">
        <div>{{ listItemInfo.title }}</div>
        <UButton
          v-if="!isEditing"
          @click="changeIsEditing(true)"
          icon="i-mdi-pencil"
          >edit</UButton
        >
      </div>
      <UDivider size="sm"></UDivider>
      <UTextarea
        class="content"
        v-model="listItemInfo.content"
        resize
        textareaClass="textarea"
        placeholder="Content..."
      ></UTextarea>
    </div>
  </UModal>
</template>

<style>
.card {
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  height: 2rem;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  gap: 16px;
}

.content {
  height: 16rem;
}

.textarea {
  height: 100%;
}
</style>

<script setup lang="ts">
const todoStore = useTodoStore();
const { setIsOpenListModal } = todoStore;
const listItemInfo = computed(() => todoStore.getOpenedListItem);
const isEditing = ref(false);

const changeIsEditing = (value: boolean) => {
  isEditing.value = value;
};

onUnmounted(() => setIsOpenListModal());
</script>

<template>
  <UModal v-model="todoStore.isOpenListModal">
    <div class="card">
      <UInput
        v-if="isEditing"
        type="text"
        v-model="listItemInfo.title"
        @blur="changeIsEditing(false)"
        @change="changeTargetListItemProp"
        class="input"
        autofocus
      />
      <div v-else class="modalTitle">
        <div>{{ listItemInfo.title }}</div>
        <UButton
          v-if="!isEditing"
          @click="changeIsEditing(true)"
          icon="i-mdi-pencil"
          color="gray"
          variant="solid"
        ></UButton>
      </div>
      <UDivider size="sm"></UDivider>
      <div class="props">
        <div>Edit date :</div>
        <div>
          {{ listItemInfo.editDate.toLocaleString("ja-JP") }}
        </div>
      </div>
      <UDivider size="sm"></UDivider>
      <UTextarea
        class="content"
        v-model="listItemInfo.content"
        @change="changeTargetListItemProp"
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

.props {
  font-size: 0.8em;
  display: flex;
  gap: 8px;
}

.modalTitle {
  height: 2rem;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  gap: 8px;
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
const { setIsOpenListModal, setTodoListItem } = todoStore;
const listItemInfo = computed(() => todoStore.getOpenedListItem);
const isEditing = ref(false);

const changeIsEditing = (value: boolean) => {
  isEditing.value = value;
};

const changeTargetListItemProp = () => {
  const newTargetListItem = {
    ...listItemInfo.value,
    editDate: new Date(),
  };
  setTodoListItem(newTargetListItem);
};

onUnmounted(() => setIsOpenListModal());
</script>

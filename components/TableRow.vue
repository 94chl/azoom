<template>
  <div class="tableRow">
    <slot></slot>
  </div>
</template>

<style>
.tableRow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 12fr 2fr;
  gap: 8px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  border-bottom: 1px solid #000;
  padding: 8px;
}
</style>

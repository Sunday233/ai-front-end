<template>
  <div class="empty-state">
    <a-empty :description="description" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
}>();
</script>

<style scoped lang="scss">
.empty-state {
  margin: 0 12px;
  padding: 96px 0;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-divider);
}
</style>

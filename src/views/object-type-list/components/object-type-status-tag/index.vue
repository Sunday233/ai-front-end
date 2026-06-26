<template>
  <span class="status-tag" :class="tone">{{ text }}</span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  tone: 'success' | 'primary';
}>();
</script>

<style scoped lang="scss">
.status-tag {
  display: inline-flex;
  min-width: 40px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: var(--matrix-radius-sm);

  &.success {
    color: var(--matrix-color-success);
    background: #ecf8f0;
  }

  &.primary {
    color: var(--matrix-color-primary);
    background: var(--matrix-color-primary-soft);
  }
}
</style>

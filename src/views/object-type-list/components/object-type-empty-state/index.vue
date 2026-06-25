<template>
  <Empty class="empty-state" :description="description" />
</template>

<script setup lang="ts">
import { Empty } from 'ant-design-vue';

defineProps<{
  description: string;
}>();
</script>

<style scoped lang="scss">
.empty-state {
  padding: 72px 0;
  border: 1px solid var(--shentu-color-divider);
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-bg-container);
}
</style>

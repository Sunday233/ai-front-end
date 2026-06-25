<template>
  <span class="status-tag" :class="tone">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  ObjectTypeStatus,
  ObjectTypeVisibility,
} from '@/types/object-type-list/model';

const props = defineProps<{
  value: ObjectTypeStatus | ObjectTypeVisibility;
}>();

const label = computed(() => {
  if (props.value === 'normal') {
    return '正常';
  }

  if (props.value === 'draft') {
    return '草稿';
  }

  return '可见';
});

const tone = computed(() => {
  return props.value === 'normal' ? 'success' : 'primary';
});
</script>

<style scoped lang="scss">
.status-tag {
  display: inline-flex;
  min-width: 40px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: var(--shentu-radius-sm);
  font-size: 12px;
  line-height: 20px;
}

.success {
  background: var(--shentu-color-success-soft);
  color: var(--shentu-color-success);
}

.primary {
  background: var(--shentu-color-primary-soft);
  color: var(--shentu-color-primary);
}
</style>

<template>
  <div class="wizard-footer">
    <Button v-if="current > 1" @click="$emit('prev')">上一步</Button>
    <Button v-if="current === 4" @click="$emit('skip')">跳过</Button>
    <Button v-if="current < 4" type="primary" :disabled="!canNext" @click="$emit('next')">下一步</Button>
    <Button v-else type="primary" @click="$emit('finish')">完成</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';

defineProps<{
  current: number;
  canNext: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
  finish: [];
  skip: [];
}>();
</script>

<style scoped lang="scss">
.wizard-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
</style>

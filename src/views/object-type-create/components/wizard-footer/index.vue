<template>
  <div class="wizard-footer">
    <a-button v-if="current > 1" @click="$emit('prev')">上一步</a-button>
    <a-button v-if="current < 4" type="primary" :disabled="!canNext" @click="$emit('next')">下一步</a-button>
    <a-button v-else type="primary" :loading="submitting" @click="$emit('finish')">完成</a-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number;
  canNext: boolean;
  submitting: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
  finish: [];
}>();
</script>

<style scoped lang="scss">
.wizard-footer {
  position: absolute;
  right: 108px;
  bottom: 34px;
  display: flex;
  gap: 12px;
}
</style>

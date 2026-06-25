<template>
  <Select
    :value="value"
    class="group-select"
    placeholder="添加对象组"
    allow-clear
    @change="onChange"
  >
    <SelectOption value="default">默认对象组</SelectOption>
    <SelectOption value="work-hour">工时</SelectOption>
    <SelectOption value="parts">零件</SelectOption>
  </Select>
</template>

<script setup lang="ts">
import { Select, SelectOption } from 'ant-design-vue';

defineProps<{
  value?: string;
}>();

const emit = defineEmits<{
  change: [value?: string];
}>();

const onChange = (value: unknown) => {
  emit('change', typeof value === 'string' ? value : undefined);
};
</script>

<style scoped lang="scss">
.group-select {
  width: 580px;
}
</style>

<template>
  <section class="step-header page-panel">
    <Steps :current="current - 1" :items="stepItems" @change="onChange" />
  </section>
</template>

<script setup lang="ts">
import { type StepProps, Steps } from 'ant-design-vue';

defineProps<{
  current: number;
}>();

const emit = defineEmits<{
  change: [step: number];
}>();

const stepItems: StepProps[] = [
  { title: '选择数据源', description: '请选择一个数据源或创建' },
  { title: '元数据配置', description: '请配置元数据信息' },
  { title: '属性配置', description: '请关联所需属性' },
  { title: '动作配置', description: '请关联动作配置' },
];

const onChange = (step: number) => {
  emit('change', step + 1);
};
</script>

<style scoped lang="scss">
.step-header {
  position: relative;
  z-index: 1;
  margin-top: 14px;
  padding: 28px 80px 30px;
}

:deep(.ant-steps-item-title) {
  color: var(--shentu-color-text);
  font-size: 14px;
  font-weight: 500;
}

:deep(.ant-steps-item-description) {
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
}
</style>

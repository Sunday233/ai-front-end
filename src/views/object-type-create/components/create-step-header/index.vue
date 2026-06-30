<template>
  <section class="create-step-header">
    <Steps :current="current" :items="stepItems" />
  </section>
</template>

<script setup lang="ts">
import { Steps, type StepsProps } from "ant-design-vue";

interface CreateStepHeaderProps {
  current: number;
}

defineProps<CreateStepHeaderProps>();

const stepItems: StepsProps["items"] = [
  { title: "选择数据源", description: "请选择一个数据源或创建" },
  { title: "元数据配置", description: "请配置元数据信息" },
  { title: "属性配置", description: "请关联所需属性" },
  { title: "动作配置", description: "请关联动作配置" },
];
</script>

<style scoped lang="scss">
.create-step-header {
  position: relative;
  z-index: 1;
  padding: 38px 82px 36px;
  background: var(--matrix-bg-container);
  border-radius: 6px;
}

:deep(.ant-steps-item-title) {
  color: var(--matrix-text);
  font-size: 14px;
  font-weight: 500;
}

:deep(.ant-steps-item-description) {
  color: var(--matrix-text-placeholder) !important;
}
</style>

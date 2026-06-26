<template>
  <div class="step-header">
    <div v-for="step in steps" :key="step.key" class="step-item" :class="{active: step.key === current}">
      <span class="step-line"></span>
      <span class="step-dot">{{ step.key }}</span>
      <strong>{{ step.title }}</strong>
      <small>{{ step.description }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number;
}>();

const steps = [
  {key: 1, title: '选择数据源', description: '请选择一个数据源或创建'},
  {key: 2, title: '元数据配置', description: '请配置元数据信息'},
  {key: 3, title: '属性配置', description: '请关联所需属性'},
  {key: 4, title: '动作配置', description: '请关联动作配置'},
];
</script>

<style scoped lang="scss">
.step-header {
  display: grid;
  height: 142px;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 24px 48px;
  background: var(--matrix-color-panel-bg);
  border-radius: var(--matrix-radius-lg);
}

.step-item {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 4px;
  color: var(--matrix-color-placeholder);

  &.active {
    color: var(--matrix-color-text);

    .step-dot {
      color: #fff;
      background: var(--matrix-color-primary);
      border-color: var(--matrix-color-primary);
    }
  }
}

.step-line {
  position: absolute;
  top: 9px;
  right: 50%;
  left: -50%;
  height: 1px;
  background: var(--matrix-color-divider);
}

.step-item:first-child .step-line {
  display: none;
}

.step-dot {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-color-primary);
  font-size: 12px;
  background: #fff;
  border: 1px solid var(--matrix-color-primary);
  border-radius: 50%;
}

strong {
  font-weight: 500;
}

small {
  color: var(--matrix-color-placeholder);
}
</style>

<script setup lang="ts">
interface WizardStep {
  title: string;
  subtitle: string;
}

interface WizardStepsProps {
  current: number;
}

defineProps<WizardStepsProps>();

const steps: WizardStep[] = [
  { title: "选择数据源", subtitle: "请选择一个数据源或创建" },
  { title: "元数据配置", subtitle: "请配置元数据信息" },
  { title: "属性配置", subtitle: "请关联所需属性" },
  { title: "动作配置", subtitle: "请关联动作配置" },
];
</script>

<template>
  <div class="wizard-steps">
    <div v-for="(step, index) in steps" :key="step.title" class="step" :class="{ active: current === index, done: current > index }">
      <div class="line" />
      <span class="dot">{{ index + 1 }}</span>
      <strong>{{ step.title }}</strong>
      <small>{{ step.subtitle }}</small>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wizard-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 144px;
  padding: 34px 64px 0;
  background: var(--matrix-white);
  border-radius: 6px;
}

.step {
  position: relative;
  text-align: center;
}

.line {
  position: absolute;
  top: 14px;
  left: calc(-50% + 16px);
  width: calc(100% - 32px);
  height: 1px;
  background: var(--matrix-divider);
}

.step:first-child .line {
  display: none;
}

.dot {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--matrix-text-muted);
  font-size: 12px;
  background: var(--matrix-white);
  border: 1px solid var(--matrix-border);
  border-radius: 50%;
}

.active .dot {
  color: var(--matrix-white);
  background: var(--matrix-primary);
  border-color: var(--matrix-primary);
}

.done .dot {
  color: var(--matrix-primary);
  border-color: var(--matrix-primary);
}

strong,
small {
  display: block;
}

strong {
  margin-top: 8px;
  font-weight: 500;
}

small {
  margin-top: 4px;
  color: var(--matrix-disabled);
}
</style>

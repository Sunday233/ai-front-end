<template>
  <div class="action-step">
    <label>选择生成的操作类型：</label>
    <div class="action-step__list">
      <Checkbox
        v-for="action in actions"
        :key="action.id"
        :checked="selectedIds.includes(action.id)"
        class="action-step__item"
        @change="onToggle(action.id, $event)"
      >
        <strong>{{ action.name }}</strong>
        <span>{{ action.description }}</span>
      </Checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActionOption } from "@/types/object-type-create/model";
import { Checkbox } from "ant-design-vue";
import type { CheckboxChangeEvent } from "ant-design-vue/es/checkbox/interface";

interface ActionStepProps {
  actions: ActionOption[];
  selectedIds: string[];
}

const props = defineProps<ActionStepProps>();

const emit = defineEmits<{
  update: [selectedIds: string[]];
}>();

const onToggle = (actionId: string, event: CheckboxChangeEvent) => {
  const checked = event.target.checked;
  const selected = checked
    ? [...props.selectedIds, actionId]
    : props.selectedIds.filter((id) => id !== actionId);
  emit("update", selected);
};
</script>

<style scoped lang="scss">
.action-step {
  width: 1080px;
  margin: 54px auto 0;
}

.action-step > label {
  display: block;
  margin-bottom: 10px;
  color: var(--matrix-text-secondary);
}

.action-step__list {
  display: grid;
  gap: 10px;
}

.action-step__item {
  display: flex;
  align-items: flex-start;
  min-height: 68px;
  margin: 0;
  padding: 14px 18px;
  border: 1px solid var(--matrix-border);
  border-radius: 4px;

  :deep(.ant-checkbox) {
    margin-top: 3px;
  }

  :deep(.ant-checkbox + span) {
    display: grid;
    gap: 8px;
  }

  strong {
    font-weight: 500;
  }

  span {
    color: var(--matrix-text-muted);
  }
}
</style>

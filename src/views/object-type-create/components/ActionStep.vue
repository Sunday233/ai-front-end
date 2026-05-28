<script setup lang="ts">
import type { ActionConfig } from "@/types/matrix/model";

interface ActionStepProps {
  actions: ActionConfig[];
}

defineProps<ActionStepProps>();

const emit = defineEmits<{
  toggle: [id: string];
}>();
</script>

<template>
  <div class="action-step">
    <label>选择生成的操作类型：</label>
    <div class="action-list">
      <button v-for="action in actions" :key="action.id" type="button" class="action-card" :class="{ selected: action.selected }" @click="emit('toggle', action.id)">
        <a-checkbox :checked="action.selected" />
        <span>
          <strong>{{ action.title }}</strong>
          <small>{{ action.description }}</small>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action-step {
  width: 1040px;
  margin: 52px auto 0;
}

label {
  display: inline-block;
  width: 150px;
  color: var(--matrix-text-secondary);
  vertical-align: top;
}

.action-list {
  display: inline-grid;
  width: 760px;
  gap: 8px;
}

.action-card {
  display: grid;
  grid-template-columns: 22px 1fr;
  min-height: 68px;
  padding: 14px 18px;
  text-align: left;
  background: var(--matrix-soft-bg);
  border: 1px solid var(--matrix-border);
  border-radius: 3px;
  cursor: pointer;
  gap: 12px;
}

.action-card.selected {
  background: #f6f9ff;
  border-color: var(--matrix-primary);
}

strong,
small {
  display: block;
}

strong {
  margin-bottom: 8px;
  font-weight: 500;
}

small {
  color: var(--matrix-text-muted);
}
</style>

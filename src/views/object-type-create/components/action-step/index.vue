<template>
  <div class="action-step">
    <label>选择生成的操作类型：</label>
    <div class="action-list">
      <button
        v-for="action in actionRows"
        :key="action.id"
        class="action-card"
        :class="{selected: selectedActionIds.includes(action.id)}"
        type="button"
        @click="toggleAction(action.id)"
      >
        <a-checkbox :checked="selectedActionIds.includes(action.id)" />
        <span>
          <strong>{{ action.title }}</strong>
          <small>{{ action.description }}</small>
        </span>
      </button>
    </div>

    <div v-if="selectedActionIds.length > 0" class="executor-row">
      <label><span>*</span> 配置可执行操作的用户/用户组：</label>
      <a-select :value="executorType" class="executor-type" :options="executorTypeOptions" />
      <a-select
        mode="multiple"
        class="executor-select"
        :value="selectedExecutorIds"
        :options="executorOptions.map((item) => ({value: item.id, label: item.name}))"
        open
        @change="onExecutorChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import type {ActionConfigRow, ActionType, ExecutorOption} from '@/types/object-type-create/model';

const props = defineProps<{
  actionRows: ActionConfigRow[];
  selectedActionIds: ActionType[];
  executorType: '用户' | '用户组';
  executorOptions: ExecutorOption[];
  selectedExecutors: ExecutorOption[];
}>();

const emit = defineEmits<{
  'update:selectedActionIds': [value: ActionType[]];
  'update:selectedExecutors': [value: ExecutorOption[]];
}>();

const executorTypeOptions = [
  {value: '用户', label: '用户'},
  {value: '用户组', label: '用户组'},
];

const selectedExecutorIds = computed(() => props.selectedExecutors.map((item) => item.id));

const toggleAction = (id: ActionType) => {
  const next = props.selectedActionIds.includes(id)
    ? props.selectedActionIds.filter((item) => item !== id)
    : [...props.selectedActionIds, id];

  emit('update:selectedActionIds', next);
};

const onExecutorChange = (value: unknown) => {
  const ids = Array.isArray(value) ? value.map(String) : [];
  emit(
    'update:selectedExecutors',
    props.executorOptions.filter((option) => ids.includes(option.id)),
  );
};
</script>

<style scoped lang="scss">
.action-step {
  width: 1200px;
  padding-top: 54px;
  margin-left: 76px;
}

.action-step > label {
  display: inline-block;
  margin-right: 12px;
  color: var(--matrix-color-text-secondary);
  white-space: nowrap;
}

.action-list {
  display: inline-grid;
  width: 1010px;
  gap: 10px;
  vertical-align: top;
}

.action-card {
  display: grid;
  height: 66px;
  grid-template-columns: 24px 1fr;
  align-items: start;
  gap: 8px;
  padding: 12px 18px;
  text-align: left;
  cursor: pointer;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-border);
  border-radius: var(--matrix-radius-sm);

  &.selected {
    background: var(--matrix-color-primary-soft);
    border-color: var(--matrix-color-primary);
  }

  strong {
    display: block;
    font-weight: 500;
  }

  small {
    color: var(--matrix-color-text-muted);
  }
}

.executor-row {
  display: grid;
  grid-template-columns: auto 106px 420px;
  align-items: start;
  gap: 8px;
  margin-top: 16px;

  label {
    padding-top: 6px;
    color: var(--matrix-color-text-secondary);

    span {
      color: var(--matrix-color-error);
    }
  }
}

.executor-select {
  width: 420px;
}
</style>

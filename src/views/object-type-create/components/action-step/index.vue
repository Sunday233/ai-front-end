<template>
  <section class="action-step page-panel">
    <div class="form-row">
      <label>选择生成的操作类型：</label>
      <div class="action-list">
        <button
          v-for="action in actions"
          :key="action.actionType"
          class="action-card"
          :class="{selected: action.selected}"
          type="button"
          @click="$emit('toggle-action', action.actionType)"
        >
          <CheckCircleOutlined />
          <span>
            <strong>{{ action.title }}</strong>
            <small>{{ action.description }}</small>
          </span>
        </button>
      </div>
    </div>
    <div v-if="selectedActions.length > 0" class="form-row executor-row">
      <label><em>*</em> 配置可执行操作的用户/用户组：</label>
      <div class="executor-control">
        <Select value="user" class="executor-type">
          <SelectOption value="user">用户</SelectOption>
          <SelectOption value="group">用户组</SelectOption>
        </Select>
        <Select
          mode="multiple"
          class="executor-select"
          :value="executorUsers"
          placeholder="请选择"
          @change="onUsersChange"
        >
          <SelectOption value="chenzhenq5">chenzhenq5</SelectOption>
          <SelectOption value="chenzhenq8">chenzhenq8</SelectOption>
        </Select>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { Select, SelectOption } from 'ant-design-vue';
import { computed } from 'vue';
import type { ActionPermissionRow } from '@/types/object-type-create/model';

const props = defineProps<{
  actions: ActionPermissionRow[];
  executorUsers: string[];
}>();

const emit = defineEmits<{
  'toggle-action': [actionType: ActionPermissionRow['actionType']];
  'update-users': [users: string[]];
}>();

const selectedActions = computed(() =>
  props.actions.filter((action) => action.selected),
);

const onUsersChange = (value: unknown) => {
  if (Array.isArray(value)) {
    emit(
      'update-users',
      value.filter((item): item is string => typeof item === 'string'),
    );
  }
};
</script>

<style scoped lang="scss">
.action-step {
  padding: 52px 0 86px;
}

.form-row {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 18px;
  margin-bottom: 22px;
}

label {
  justify-self: end;
  padding-top: 8px;
  color: var(--shentu-color-text-secondary);
  font-size: 14px;

  em {
    color: var(--shentu-color-error);
    font-style: normal;
  }
}

.action-list {
  display: grid;
  width: 580px;
  gap: 10px;
}

.action-card {
  display: flex;
  min-height: 62px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--shentu-color-border);
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-bg-container);
  color: var(--shentu-color-text-secondary);
  cursor: pointer;
  text-align: left;

  &.selected {
    border-color: var(--shentu-color-primary);
    background: var(--shentu-color-primary-soft);
    color: var(--shentu-color-primary);
  }

  strong,
  small {
    display: block;
  }

  strong {
    color: var(--shentu-color-text);
    font-size: 14px;
    line-height: 22px;
  }

  small {
    color: var(--shentu-color-text-tertiary);
    font-size: 12px;
    line-height: 20px;
  }
}

.executor-control {
  display: flex;
  width: 580px;
}

.executor-type {
  width: 92px;
}

.executor-select {
  flex: 1;
}
</style>

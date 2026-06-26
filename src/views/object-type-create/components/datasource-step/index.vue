<template>
  <div class="datasource-step">
    <div class="source-row">
      <span class="label">数据源：</span>
      <button class="source-card active" type="button">
        <DatabaseOutlined />
        <span>
          <strong>已有数据集</strong>
          <small>选择一个已经存在的数据集作为此对象类型的来源</small>
        </span>
      </button>
    </div>
    <div class="dataset-row">
      <span class="required">*</span>
      <span>选择数据集：</span>
      <span class="dataset-name">
        <DatabaseOutlined />
        {{ selectedDataset?.name ?? '暂无选择数据集' }}
      </span>
      <a-button class="choose-button" @click="$emit('openDatasetModal')">
        <PlusOutlined />
        选择数据集
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DatabaseOutlined, PlusOutlined} from '@ant-design/icons-vue';
import type {DatasetRow} from '@/types/object-type-create/model';

defineProps<{
  selectedDataset: DatasetRow | null;
}>();

defineEmits<{
  openDatasetModal: [];
}>();
</script>

<style scoped lang="scss">
.datasource-step {
  width: 1090px;
  padding: 54px 0;
  margin-left: 192px;
}

.source-row,
.dataset-row {
  display: flex;
  align-items: center;
}

.source-row {
  justify-content: flex-start;
}

.label {
  width: 72px;
  margin-right: 10px;
  color: var(--matrix-color-text-secondary);
  text-align: right;
}

.source-card {
  display: grid;
  width: 280px;
  height: 80px;
  grid-template-columns: 28px 1fr;
  align-items: start;
  gap: 10px;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  background: var(--matrix-color-primary-soft);
  border: 1px solid var(--matrix-color-primary);

  strong {
    display: block;
    color: var(--matrix-color-primary);
  }

  small {
    color: var(--matrix-color-text-muted);
  }
}

.dataset-row {
  position: relative;
  margin-top: 28px;
  justify-content: flex-start;
}

.required {
  color: var(--matrix-color-error);
}

.dataset-name {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
}

.choose-button {
  position: absolute;
  right: 0;
}
</style>

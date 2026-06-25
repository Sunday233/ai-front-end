<template>
  <section class="datasource-step page-panel">
    <div class="form-row">
      <label>数据源：</label>
      <button class="dataset-card selected" type="button">
        <DatabaseOutlined />
        <span>
          <strong>已有数据集</strong>
          <small>选择一个已经存在的数据集作为此对象类型的来源</small>
        </span>
      </button>
    </div>
    <div class="form-row">
      <label><em>*</em> 选择数据集：</label>
      <div class="dataset-value">
        <span v-if="selectedDataset">{{ selectedDataset.name }}</span>
        <span v-else class="empty">暂无选择数据集</span>
        <Button type="link" @click="$emit('open-dataset')">
          <PlusOutlined />
          选择数据集
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DatabaseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import type { DatasetListItem } from '@/types/object-type-create/model';

defineProps<{
  selectedDataset: DatasetListItem | null;
}>();

defineEmits<{
  'open-dataset': [];
}>();
</script>

<style scoped lang="scss">
.datasource-step {
  padding: 82px 0 140px;
}

.form-row {
  display: grid;
  grid-template-columns: 420px 1fr;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

label {
  justify-self: end;
  color: var(--shentu-color-text-secondary);
  font-size: 14px;
  line-height: 22px;

  em {
    color: var(--shentu-color-error);
    font-style: normal;
  }
}

.dataset-card {
  display: inline-flex;
  width: 306px;
  height: 78px;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--shentu-color-border);
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-bg-container);
  color: var(--shentu-color-text);
  text-align: left;
}

.dataset-card.selected {
  border-color: var(--shentu-color-primary);
  background: var(--shentu-color-primary-soft);
  color: var(--shentu-color-primary);
}

.dataset-card strong,
.dataset-card small {
  display: block;
}

.dataset-card strong {
  font-size: 14px;
  line-height: 22px;
}

.dataset-card small {
  margin-top: 4px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 18px;
}

.dataset-value {
  display: inline-flex;
  min-width: 460px;
  align-items: center;
  gap: 16px;
  color: var(--shentu-color-text);
  font-size: 14px;
}

.empty {
  color: var(--shentu-color-text-tertiary);
}
</style>

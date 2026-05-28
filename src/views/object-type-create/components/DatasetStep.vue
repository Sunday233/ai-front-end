<script setup lang="ts">
import type { DatasetSummary } from "@/types/matrix/model";
import { PlusOutlined } from "@ant-design/icons-vue";

interface DatasetStepProps {
  selectedDataset?: DatasetSummary;
}

defineProps<DatasetStepProps>();

const emit = defineEmits<{
  openPicker: [];
}>();
</script>

<template>
  <div class="dataset-step">
    <label>数据源：</label>
    <button class="source-card active" type="button">
      <span class="card-icon">▣</span>
      <strong>已有数据集</strong>
      <small>选择一个已经存在的数据集作为此对象类型的来源</small>
    </button>

    <a-flex  class="dataset-status" align="center">
      <div class="dataset-info">
        <span class="required">*</span>
        <span>选择数据集：</span>
        <b v-if="selectedDataset">{{ selectedDataset.name }}</b>
        <em v-else>暂无选择数据集</em>
      </div>

      <a-button class="pick-button"  @click="emit('openPicker')"><PlusOutlined /> 选择数据集</a-button>
    </a-flex>
    
  </div>
</template>

<style scoped lang="scss">
.dataset-step {
  position: relative;
  width: 900px;
  min-height: 250px;
  margin: 48px auto 0;
}

label {
  display: inline-block;
  margin-right: 10px;
  color: var(--matrix-text-secondary);
}

.source-card {
  display: inline-grid;
  grid-template-columns: 24px 1fr;
  width: 280px;
  min-height: 80px;
  padding: 14px 16px;
  text-align: left;
  vertical-align: top;
  background: #f6f9ff;
  border: 1px solid var(--matrix-primary);
  cursor: pointer;
  gap: 8px;
}

.card-icon {
  grid-row: span 2;
  color: var(--matrix-primary);
}

strong {
  color: var(--matrix-primary);
  font-weight: 500;
}

small {
  color: var(--matrix-text-muted);
}

.dataset-status {
  margin: 20px 0;
}

.required {
  color: var(--matrix-error);
}

.dataset-status em {
  color: var(--matrix-text-secondary);
  font-style: normal;
}

.pick-button {
  margin: 0 24px;
}

</style>

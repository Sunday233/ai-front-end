<template>
  <div class="datasource-step">
    <div class="datasource-step__row">
      <span class="datasource-step__label">数据源：</span>
      <button class="datasource-step__mode datasource-step__mode--active" type="button">
        <DatabaseOutlined />
        <span>
          <strong>已有数据集</strong>
          <small>选择一个已经存在的数据集作为此对象类型的来源</small>
        </span>
      </button>
    </div>

    <div class="datasource-step__select">
      <span><b>*</b> 选择数据集：</span>
      <span class="datasource-step__dataset">
        <DatabaseOutlined />
        {{ selectedDataset?.name ?? '暂无选择数据集' }}
      </span>
      <Button type="primary" ghost @click="$emit('open-dataset')">
        <template #icon>
          <PlusOutlined />
        </template>
        选择数据集
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatasetOption } from "@/types/object-type-create/model";
import { DatabaseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { Button } from "ant-design-vue";

interface DatasourceStepProps {
  selectedDataset?: DatasetOption;
}

defineProps<DatasourceStepProps>();

defineEmits<{
  "open-dataset": [];
}>();
</script>

<style scoped lang="scss">
.datasource-step {
  padding: 56px 192px;
}

.datasource-step__row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.datasource-step__label {
  width: 72px;
  color: var(--matrix-text-secondary);
  text-align: right;
}

.datasource-step__mode {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  width: 282px;
  padding: 14px 16px;
  text-align: left;
  background: var(--matrix-bg-subtle);
  border: 1px solid var(--matrix-primary);

  strong,
  small {
    display: block;
  }

  strong {
    color: var(--matrix-primary);
    font-weight: 500;
  }

  small {
    margin-top: 6px;
    color: var(--matrix-text-muted);
    line-height: 20px;
  }
}

.datasource-step__select {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 8px;
  align-items: center;
  margin-top: 22px;

  b {
    color: var(--matrix-error);
  }
}

.datasource-step__dataset {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  color: var(--matrix-text-secondary);
}
</style>

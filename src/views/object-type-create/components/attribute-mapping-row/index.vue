<template>
  <div class="mapping-row">
    <span class="field-box">
      <span class="type-icon">{{ row.sourceField.type }}</span>
      {{ row.sourceField.name }}
      <span v-if="row.sourceField.isPrimary" class="primary-chip">主键</span>
      <DownOutlined />
    </span>
    <span class="type-box">
      <span class="type-icon">{{ row.targetAttribute.type }}</span>
      {{ row.targetAttribute.type }}
      <DownOutlined />
    </span>
    <span class="attribute-box">
      {{ row.targetAttribute.name }}
      <span :class="row.targetAttribute.isPrimary ? 'primary-chip' : 'count-text'">
        {{ row.targetAttribute.countText }}
      </span>
    </span>
    <a-button v-if="row.removable" type="text" danger aria-label="删除属性">
      <DeleteOutlined />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import {DeleteOutlined, DownOutlined} from '@ant-design/icons-vue';
import type {AttributeMappingRow} from '@/types/object-type-create/model';

defineProps<{
  row: AttributeMappingRow;
}>();
</script>

<style scoped lang="scss">
.mapping-row {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 120px 190px 32px;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.field-box,
.type-box,
.attribute-box {
  display: inline-flex;
  height: 30px;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  color: var(--matrix-color-text-secondary);
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-border);
  border-radius: var(--matrix-radius-md);
}

.type-icon {
  color: var(--matrix-color-primary);
  font-size: 11px;
}

.primary-chip {
  margin-left: auto;
  padding: 0 6px;
  color: var(--matrix-color-primary);
  background: var(--matrix-color-primary-soft);
  border-radius: var(--matrix-radius-sm);
}

.count-text {
  margin-left: auto;
  color: var(--matrix-color-text-muted);
}
</style>

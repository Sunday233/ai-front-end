<template>
  <div class="attribute-step">
    <div class="left-column">
      <label>主键</label>
      <button class="select-box" type="button" @click="$emit('changePrimaryKey')">
        <span class="type-icon">INT</span>
        emp_no
        <span class="primary-chip">主键</span>
        <DownOutlined />
      </button>
      <label>数据集字段</label>
      <div v-for="row in mappingRows" :key="row.id" class="source-row">
        <span class="type-icon">{{ row.sourceField.type }}</span>
        {{ row.sourceField.name }}
        <span v-if="row.sourceField.isPrimary" class="primary-chip">主键</span>
        <DownOutlined />
      </div>
      <a-button>
        <PlusOutlined />
        添加属性
      </a-button>
    </div>

    <div class="right-column">
      <label>标题键</label>
      <a-select class="title-select" placeholder="" />
      <label>属性名称</label>
      <AttributeMappingRow v-for="row in mappingRows" :key="row.id" :row="row" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {DownOutlined, PlusOutlined} from '@ant-design/icons-vue';
import AttributeMappingRow from '@/views/object-type-create/components/attribute-mapping-row/index.vue';
import type {AttributeMappingRow as AttributeMappingRowModel} from '@/types/object-type-create/model';

defineProps<{
  mappingRows: AttributeMappingRowModel[];
}>();

defineEmits<{
  changePrimaryKey: [];
}>();
</script>

<style scoped lang="scss">
.attribute-step {
  display: grid;
  grid-template-columns: 348px 536px;
  gap: 256px;
  width: 1140px;
  padding-top: 56px;
  margin-left: 77px;
}

.left-column,
.right-column {
  display: grid;
  align-content: start;
  gap: 8px;
}

label {
  margin-bottom: 4px;
  color: var(--matrix-color-text-secondary);
}

.select-box,
.source-row {
  display: inline-flex;
  height: 30px;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  color: var(--matrix-color-text-secondary);
  text-align: left;
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

.title-select {
  width: 100%;
}
</style>

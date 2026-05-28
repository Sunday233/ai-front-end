<script setup lang="ts">
import type { AttributeConfig, DatasetField } from "@/types/matrix/model";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";

interface AttributeStepProps {
  fields: DatasetField[];
  attributes: AttributeConfig[];
  titleKey?: string;
}

defineProps<AttributeStepProps>();

const emit = defineEmits<{
  add: [];
  remove: [id: string];
  updateTitleKey: [value: string];
}>();
</script>

<template>
  <div class="attribute-step">
    <section>
      <label>主键</label>
      <a-select value="emp_no" class="wide">
        <a-select-option value="emp_no">emp_no <a-tag color="blue">主键</a-tag></a-select-option>
      </a-select>

      <label>数据集字段</label>
      <div v-for="field in fields" :key="field.name" class="field-row">
        <a-tag>{{ field.type }}</a-tag>
        <span>{{ field.name }}</span>
        <a-tag v-if="field.isPrimary" color="blue">主键</a-tag>
      </div>
      <a-button @click="emit('add')"><PlusOutlined /> 添加属性</a-button>
    </section>

    <section>
      <label>标题键</label>
      <a-select :value="titleKey" class="wide" placeholder="请选择标题键" @update:value="emit('updateTitleKey', $event)">
        <a-select-option v-for="attribute in attributes" :key="attribute.id" :value="attribute.attributeName">{{ attribute.attributeName }}</a-select-option>
      </a-select>

      <label>属性名称</label>
      <div v-for="attribute in attributes" :key="attribute.id" class="attribute-row">
        <a-select :value="attribute.type" disabled>
          <a-select-option :value="attribute.type">{{ attribute.type }}</a-select-option>
        </a-select>
        <a-input :value="attribute.attributeName" readonly />
        <a-tag v-if="attribute.isPrimary" color="blue">主键</a-tag>
        <a-button v-if="!attribute.isPrimary" type="text" @click="emit('remove', attribute.id)"><DeleteOutlined /></a-button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.attribute-step {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 960px;
  margin: 56px auto 0;
  gap: 96px;
}

label {
  display: block;
  margin: 0 0 8px;
  color: var(--matrix-text-secondary);
}

.wide {
  width: 100%;
  margin-bottom: 18px;
}

.field-row,
.attribute-row {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  align-items: center;
  min-height: 34px;
  margin-bottom: 6px;
  gap: 8px;
}

.field-row {
  grid-template-columns: 64px 1fr auto;
  padding: 0 10px;
  border: 1px solid var(--matrix-border);
  border-radius: 4px;
}

.attribute-row :deep(.ant-select) {
  width: 120px;
}
</style>

<template>
  <section class="attribute-step page-panel">
    <div class="mapping-head">
      <span>主键</span>
      <span>数据集字段</span>
      <span>标题键</span>
      <span>属性名称</span>
    </div>
    <AttributeMappingRow
      v-for="row in rows"
      :key="row.id"
      :row="row"
      @delete="$emit('delete-row', $event)"
      @primary-change="$emit('primary-change', $event)"
    />
    <Button type="link" class="add-button" @click="$emit('add-row')">
      <PlusOutlined />
      添加属性
    </Button>
  </section>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import type { AttributeMappingRow as AttributeMappingRowModel } from '@/types/object-type-create/model';
import AttributeMappingRow from '../attribute-mapping-row/index.vue';

defineProps<{
  rows: AttributeMappingRowModel[];
}>();

defineEmits<{
  'delete-row': [id: string];
  'primary-change': [id: string];
  'add-row': [];
}>();
</script>

<style scoped lang="scss">
.attribute-step {
  padding: 34px 88px 48px;
}

.mapping-head {
  display: grid;
  grid-template-columns: 82px 238px 94px 1fr;
  gap: 18px;
  padding-bottom: 8px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.add-button {
  margin-top: 8px;
  padding-left: 338px;
  color: var(--shentu-color-primary);
}
</style>

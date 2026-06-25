<template>
  <div class="mapping-row">
    <label class="primary-cell">
      <Radio :checked="row.sourceField.primary" @change="$emit('primary-change', row.id)" />
      <span>{{ row.sourceField.name }}</span>
      <Tag v-if="row.sourceField.primary" color="blue">主键</Tag>
    </label>
    <div class="field-cell">
      <span class="type-pill">{{ typeLabel }}</span>
      <Input :value="row.targetAttribute.name" readonly />
      <span class="count">{{ row.targetAttribute.name.length }} / 64</span>
      <Button v-if="row.removable" type="text" danger aria-label="删除属性" @click="$emit('delete', row.id)">
        <DeleteOutlined />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DeleteOutlined } from '@ant-design/icons-vue';
import { Button, Input, Radio, Tag } from 'ant-design-vue';
import { computed } from 'vue';
import type { AttributeMappingRow } from '@/types/object-type-create/model';

const props = defineProps<{
  row: AttributeMappingRow;
}>();

defineEmits<{
  delete: [id: string];
  'primary-change': [id: string];
}>();

const typeLabel = computed(() => {
  const labels = {
    int: 'Int',
    float: 'Float',
    date: 'Date',
    string: 'String',
    boolean: 'Boolean',
    datetime: 'DateTime',
  };

  return labels[props.row.sourceField.type];
});
</script>

<style scoped lang="scss">
.mapping-row {
  display: grid;
  grid-template-columns: 320px 1fr;
  align-items: center;
  gap: 18px;
  padding: 8px 0;
}

.primary-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--shentu-color-text);
  font-size: 14px;
}

.field-cell {
  display: grid;
  grid-template-columns: 94px minmax(220px, 1fr) 58px 36px;
  align-items: center;
  gap: 8px;
}

.type-pill {
  display: inline-flex;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--shentu-color-border);
  border-radius: var(--shentu-radius-sm);
  background: var(--shentu-color-bg-subtle);
  color: var(--shentu-color-text-secondary);
  font-size: 12px;
}

.count {
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
}
</style>

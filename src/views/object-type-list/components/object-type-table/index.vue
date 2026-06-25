<template>
  <Table
    row-key="id"
    class="object-table"
    :columns="columns"
    :data-source="rows"
    :loading="loading"
    :pagination="false"
  >
    <template #bodyCell="{column, record}">
      <template v-if="column.key === 'name'">
        <div class="name-cell">
          <span class="type-icon"><DatabaseOutlined /></span>
          <span>
            <template v-for="segment in getHighlightedSegments(record.name, keyword)" :key="segment.text + segment.hit">
              <mark v-if="segment.hit">{{ segment.text }}</mark>
              <span v-else>{{ segment.text }}</span>
            </template>
          </span>
        </div>
      </template>
      <template v-else-if="column.key === 'status'">
        <ObjectTypeStatusTag :value="record.status" />
      </template>
      <template v-else-if="column.key === 'visibility'">
        <ObjectTypeStatusTag :value="record.visibility" />
      </template>
      <template v-else-if="column.key === 'action'">
        <Button type="link" size="small" class="detail-button" @click="$emit('detail', record.id)">详情</Button>
      </template>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { DatabaseOutlined } from '@ant-design/icons-vue';
import { Button, Table } from 'ant-design-vue';
import type { ObjectTypeListItem } from '@/types/object-type-list/model';
import { getHighlightedSegments } from '@/utils/object-type-list';
import ObjectTypeStatusTag from '../object-type-status-tag/index.vue';

defineProps<{
  rows: ObjectTypeListItem[];
  loading: boolean;
  keyword: string;
}>();

defineEmits<{
  detail: [id: string];
}>();

const columns = [
  { title: '类型名称', dataIndex: 'name', key: 'name', width: '36%' },
  { title: '状态', dataIndex: 'status', key: 'status', width: '16%' },
  { title: '可见性', dataIndex: 'visibility', key: 'visibility', width: '16%' },
  { title: '修改时间', dataIndex: 'updatedAt', key: 'updatedAt', width: '22%' },
  { title: '操作', dataIndex: 'action', key: 'action', width: '10%' },
];
</script>

<style scoped lang="scss">
.object-table {
  margin-top: 10px;

  :deep(.ant-table) {
    border: 1px solid var(--shentu-color-divider);
    border-radius: var(--shentu-radius-lg);
  }

  :deep(.ant-table-thead > tr > th) {
    background: var(--shentu-color-bg-soft);
    color: var(--shentu-color-text-secondary);
    font-weight: 500;
  }

  :deep(.ant-table-tbody > tr > td) {
    height: 57px;
    border-bottom-color: var(--shentu-color-divider);
  }
}

.name-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--shentu-color-text);
}

.type-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: var(--shentu-radius-sm);
  background: var(--shentu-color-primary-soft);
  color: var(--shentu-color-primary);
  font-size: 12px;
}

mark {
  background: var(--shentu-color-warning-soft);
  color: var(--shentu-color-primary);
}

.detail-button {
  height: 24px;
  padding: 0;
  color: var(--shentu-color-primary);
}
</style>

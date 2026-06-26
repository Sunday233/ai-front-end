<template>
  <div class="table-wrap">
    <table class="object-table">
      <thead>
        <tr>
          <th>类型名称</th>
          <th>状态</th>
          <th>可见性</th>
          <th>修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>
            <span class="name-cell">
              <span class="type-icon"><ApartmentOutlined /></span>
              <span>
                <template v-for="part in splitName(row.name)" :key="part.id">
                  <mark v-if="part.highlight">{{ part.text }}</mark>
                  <span v-else>{{ part.text }}</span>
                </template>
              </span>
            </span>
          </td>
          <td>
            <ObjectTypeStatusTag :text="row.status" :tone="row.status === '正常' ? 'success' : 'primary'" />
          </td>
          <td>
            <ObjectTypeStatusTag :text="row.visibility" tone="primary" />
          </td>
          <td>{{ row.updatedAt }}</td>
          <td>
            <a-button type="link" class="detail-button" @click="$emit('detail', row.id)">详情</a-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ApartmentOutlined} from '@ant-design/icons-vue';
import ObjectTypeStatusTag from '@/views/object-type-list/components/object-type-status-tag/index.vue';
import type {ObjectTypeListItem} from '@/types/object-type-list/model';

const props = defineProps<{
  rows: ObjectTypeListItem[];
  keyword: string;
}>();

defineEmits<{
  detail: [id: string];
}>();

interface NamePart {
  id: string;
  text: string;
  highlight: boolean;
}

const splitName = (name: string): NamePart[] => {
  const keyword = props.keyword.trim();

  if (!keyword) {
    return [{id: `${name}-plain`, text: name, highlight: false}];
  }

  const index = name.toLowerCase().indexOf(keyword.toLowerCase());

  if (index < 0) {
    return [{id: `${name}-plain`, text: name, highlight: false}];
  }

  return [
    {id: `${name}-before`, text: name.slice(0, index), highlight: false},
    {id: `${name}-match`, text: name.slice(index, index + keyword.length), highlight: true},
    {id: `${name}-after`, text: name.slice(index + keyword.length), highlight: false},
  ].filter((part) => part.text.length > 0);
};
</script>

<style scoped lang="scss">
.table-wrap {
  margin: 0 12px;
  overflow: hidden;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-divider);
}

.object-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th {
    height: 48px;
    color: var(--matrix-color-text);
    font-weight: 600;
    text-align: left;
    background: var(--matrix-color-table-head);
  }

  th,
  td {
    padding: 0 16px;
    border-bottom: 1px solid var(--matrix-color-divider);
  }

  td {
    height: 57px;
  }

  tbody tr:nth-child(even) {
    background: var(--matrix-color-row-alt);
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 28%;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    width: 16%;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 26%;
  }

  th:nth-child(5),
  td:nth-child(5) {
    width: 14%;
  }
}

.name-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.type-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-color-primary);
}

mark {
  color: var(--matrix-color-primary);
  background: transparent;
}

.detail-button {
  height: auto;
  padding: 0;
}
</style>

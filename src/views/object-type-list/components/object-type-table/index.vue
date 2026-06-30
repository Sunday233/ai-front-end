<template>
  <div class="object-type-table">
    <Table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :pagination="false"
      row-key="id"
      size="middle"
    >
      <template #bodyCell="{column, record}">
        <template v-if="column.key === 'name'">
          <span class="object-type-table__name">
            <ApartmentOutlined />
            <span v-html="renderName(record as ObjectTypeListItem)" />
          </span>
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :class="['object-type-table__tag', `object-type-table__tag--${(record as ObjectTypeListItem).status}`]">
            {{ statusText[(record as ObjectTypeListItem).status] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'visibility'">
          <Tag class="object-type-table__tag object-type-table__tag--visible">
            {{ visibilityText[(record as ObjectTypeListItem).visibility] }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <Button type="link" @click="$emit('detail', record as ObjectTypeListItem)">详情</Button>
        </template>
      </template>
    </Table>

    <div class="object-type-table__pagination">
      <span>第{{ current }}/{{ totalPages }}，共{{ total }}条</span>
      <Pagination
        :current="current"
        :page-size="pageSize"
        :total="total"
        :show-size-changer="false"
        @change="$emit('page-change', $event)"
      />
      <Select :value="pageSize" class="object-type-table__size" @change="$emit('page-size-change', Number($event))">
        <SelectOption :value="10">10 条/页</SelectOption>
        <SelectOption :value="20">20 条/页</SelectOption>
      </Select>
      <span>前往</span>
      <InputNumber :min="1" :max="totalPages" :value="current" class="object-type-table__jump" @change="onJump" />
      <span>页</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ObjectTypeListItem,
  ObjectTypeStatus,
  ObjectTypeVisibility,
} from "@/types/object-type-list/model";
import { highlightKeyword } from "@/utils/search";
import { ApartmentOutlined } from "@ant-design/icons-vue";
import {
  Button,
  InputNumber,
  Pagination,
  Select,
  SelectOption,
  Table,
  Tag,
} from "ant-design-vue";
import { computed } from "vue";

interface ObjectTypeTableProps {
  rows: ObjectTypeListItem[];
  keyword: string;
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
}

const props = defineProps<ObjectTypeTableProps>();

const emit = defineEmits<{
  detail: [row: ObjectTypeListItem];
  "page-change": [page: number];
  "page-size-change": [pageSize: number];
}>();

const statusText: Record<ObjectTypeStatus, string> = {
  normal: "正常",
  draft: "草稿",
  deprecated: "废弃",
};

const visibilityText: Record<ObjectTypeVisibility, string> = {
  visible: "可见",
  hidden: "隐藏",
};

const columns = [
  { title: "类型名称", dataIndex: "name", key: "name", width: "28%" },
  { title: "状态", dataIndex: "status", key: "status", width: "16%" },
  { title: "可见性", dataIndex: "visibility", key: "visibility", width: "16%" },
  { title: "修改时间", dataIndex: "updatedAt", key: "updatedAt", width: "26%" },
  { title: "操作", key: "action", width: "14%" },
];

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize)),
);

const renderName = (row: ObjectTypeListItem) =>
  highlightKeyword(row.name, props.keyword);

const onJump = (value: unknown) => {
  const nextPage = Number(value);

  if (!Number.isFinite(nextPage) || nextPage < 1) {
    return;
  }

  emit("page-change", nextPage);
};
</script>

<style scoped lang="scss">
.object-type-table {
  background: var(--matrix-bg-container);
  border-radius: 4px;
}

.object-type-table__name {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  :deep(.anticon) {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    color: #fff;
    background: var(--matrix-primary);
    border-radius: 2px;
  }

  :deep(mark) {
    color: var(--matrix-primary);
    background: transparent;
  }
}

.object-type-table__tag {
  border: 0;
  border-radius: 2px;
}

.object-type-table__tag--normal {
  color: #10a957;
  background: #e9faef;
}

.object-type-table__tag--draft,
.object-type-table__tag--visible {
  color: var(--matrix-primary);
  background: var(--matrix-primary-bg);
}

.object-type-table__tag--deprecated {
  color: var(--matrix-text-muted);
  background: var(--matrix-bg-subtle);
}

.object-type-table__pagination {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
  padding: 14px 18px 20px;
  color: var(--matrix-text-secondary);
}

.object-type-table__size {
  width: 90px;
}

.object-type-table__jump {
  width: 48px;
}

:deep(.ant-table-thead > tr > th) {
  background: #f4f5f7;
  border-bottom: 0;
}

:deep(.ant-table-tbody > tr > td) {
  height: 56px;
  border-color: var(--matrix-divider);
}

:deep(.ant-table-tbody > tr:nth-child(even) > td) {
  background: var(--matrix-bg-subtle);
}
</style>

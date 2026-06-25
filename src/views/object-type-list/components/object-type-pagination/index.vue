<template>
  <div class="pagination-row">
    <span class="total">第{{ current }}/{{ totalPages }}，共{{ total }}条</span>
    <Pagination
      size="small"
      :current="current"
      :page-size="pageSize"
      :total="total"
      :show-size-changer="false"
      @change="onChange"
    />
    <Select size="small" :value="pageSize" class="size-select" @change="onSizeChange">
      <SelectOption :value="10">10 条/页</SelectOption>
      <SelectOption :value="20">20 条/页</SelectOption>
    </Select>
    <span class="jumper">前往 <InputNumber size="small" :min="1" :max="totalPages" :value="current" @change="onJump" /> 页</span>
  </div>
</template>

<script setup lang="ts">
import { InputNumber, Pagination, Select, SelectOption } from 'ant-design-vue';
import { computed } from 'vue';

const props = defineProps<{
  current: number;
  pageSize: number;
  total: number;
}>();

const emit = defineEmits<{
  change: [pageNo: number, pageSize: number];
}>();

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize)),
);

const onChange = (pageNo: number) => {
  emit('change', pageNo, props.pageSize);
};

const onSizeChange = (value: unknown) => {
  if (typeof value === 'number') {
    emit('change', 1, value);
  }
};

const onJump = (value: string | number | null) => {
  const nextPage = Number(value);

  if (Number.isFinite(nextPage) && nextPage >= 1) {
    emit('change', nextPage, props.pageSize);
  }
};
</script>

<style scoped lang="scss">
.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
  color: var(--shentu-color-text-secondary);
  font-size: 12px;
}

.total,
.jumper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.size-select {
  width: 96px;
}
</style>

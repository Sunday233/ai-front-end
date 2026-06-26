<template>
  <div class="pagination">
    <span>第{{ pageNo }}/{{ totalPages }}，共{{ total }}条</span>
    <a-button size="small" :disabled="pageNo <= 1" @click="$emit('change', pageNo - 1)">
      <LeftOutlined />
    </a-button>
    <a-button
      v-for="page in totalPages"
      :key="page"
      size="small"
      :type="page === pageNo ? 'primary' : 'default'"
      @click="$emit('change', page)"
    >
      {{ page }}
    </a-button>
    <a-button size="small" :disabled="pageNo >= totalPages" @click="$emit('change', pageNo + 1)">
      <RightOutlined />
    </a-button>
    <a-select :value="pageSize" size="small" class="size-select" :options="pageSizeOptions" />
    <span>前往</span>
    <a-input size="small" class="jump-input" />
    <span>页</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {LeftOutlined, RightOutlined} from '@ant-design/icons-vue';

const props = defineProps<{
  pageNo: number;
  pageSize: number;
  total: number;
}>();

defineEmits<{
  change: [pageNo: number];
}>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));

const pageSizeOptions = [{value: 10, label: '10 条/页'}];
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin: 14px 20px 0;
}

.size-select {
  width: 88px;
}

.jump-input {
  width: 44px;
}
</style>

<template>
  <WorkbenchShell active-key="object-types">
    <div class="breadcrumb">
      <RouterLink to="/workbench">返回首页</RouterLink>
      <span>|</span>
      <strong>对象类型</strong>
    </div>

    <div class="title-row">
      <h1>对象类型列表 <span>{{ total }}</span></h1>
    </div>

    <ObjectTypeListToolbar
      v-model:keyword="keyword"
      :loading="loading"
      :can-create="permissions.canCreate"
      @search="onImmediateSearch"
      @refresh="onRefresh"
      @create="onCreate"
    />

    <ObjectTypeTable
      v-if="rows.length > 0"
      :rows="rows"
      :loading="loading"
      :keyword="keyword"
      @detail="onDetail"
    />
    <ObjectTypeEmptyState v-else :description="keyword ? '暂无搜索结果' : '暂无对象类型数据'" />

    <ObjectTypePagination :current="pageNo" :page-size="pageSize" :total="total" @change="onPageChange" />
  </WorkbenchShell>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { debounce } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import WorkbenchShell from '@/layout/workbench-shell/index.vue';
import {
  getObjectTypeList,
  getObjectTypeListPermissions,
  refreshObjectTypeList,
  searchObjectTypes,
} from '@/services/object-type-list';
import type { ObjectTypeListItem } from '@/types/object-type-list/model';
import ObjectTypeEmptyState from './components/object-type-empty-state/index.vue';
import ObjectTypeListToolbar from './components/object-type-list-toolbar/index.vue';
import ObjectTypePagination from './components/object-type-pagination/index.vue';
import ObjectTypeTable from './components/object-type-table/index.vue';

const router = useRouter();
const keyword = ref('');
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const rows = ref<ObjectTypeListItem[]>([]);
const loading = ref(false);
const permissions = ref({
  canCreate: true,
  canViewDetail: true,
});

const loadRows = async (mode: 'list' | 'search' | 'refresh' = 'list') => {
  loading.value = true;

  try {
    const params = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
    };
    const response =
      mode === 'search'
        ? await searchObjectTypes(params)
        : mode === 'refresh'
          ? await refreshObjectTypeList(params)
          : await getObjectTypeList(params);

    rows.value = response.list;
    total.value = response.total;
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(() => {
  pageNo.value = 1;
  void loadRows('search');
}, 800);

const onImmediateSearch = () => {
  pageNo.value = 1;
  void loadRows(keyword.value ? 'search' : 'list');
};

const onRefresh = async () => {
  await loadRows('refresh');
  message.success('列表已刷新');
};

const onCreate = () => {
  void router.push('/object-types/create');
};

const onDetail = (id: string) => {
  message.info(`查看对象类型详情：${id}`);
};

const onPageChange = (nextPageNo: number, nextPageSize: number) => {
  pageNo.value = nextPageNo;
  pageSize.value = nextPageSize;
  void loadRows(keyword.value ? 'search' : 'list');
};

watch(keyword, () => {
  void debouncedSearch();
});

onMounted(async () => {
  permissions.value = await getObjectTypeListPermissions();
  await loadRows();
});
</script>

<style scoped lang="scss">
.breadcrumb {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--shentu-color-text-tertiary);
  font-size: 14px;
  line-height: 24px;

  strong {
    color: var(--shentu-color-text);
    font-weight: 500;
  }
}

.title-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-top: 16px;

  h1 {
    margin: 0;
    color: var(--shentu-color-text);
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }

  span {
    margin-left: 4px;
    color: var(--shentu-color-primary);
  }
}
</style>

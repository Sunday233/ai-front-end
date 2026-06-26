<template>
  <AppShell>
    <div class="object-list-page">
      <div class="breadcrumb">返回首页&nbsp;&nbsp;|&nbsp;&nbsp;<ApartmentOutlined /> 对象类型</div>
      <div class="page-title">
        <h1>对象类型列表</h1>
        <span class="matrix-count-badge">{{ total }}</span>
      </div>

      <ObjectTypeListToolbar
        v-model:keyword="keyword"
        :loading="loading"
        :can-create="permissions.canCreate"
        @refresh="onRefresh"
        @create="router.push('/object-types/create')"
      />

      <a-spin :spinning="loading">
        <a-alert v-if="errorMessage" class="state-alert" type="error" :message="errorMessage" show-icon />
        <ObjectTypeEmptyState v-else-if="rows.length === 0" :description="emptyDescription" />
        <ObjectTypeTable v-else :rows="rows" :keyword="keyword" @detail="onDetail" />
        <ObjectTypePagination
          v-if="rows.length > 0"
          :page-no="pageNo"
          :page-size="pageSize"
          :total="total"
          @change="onPageChange"
        />
      </a-spin>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import {ApartmentOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {computed, onMounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import AppShell from '@/layout/app-shell/index.vue';
import {
  getObjectTypeList,
  getObjectTypeListPermissions,
  refreshObjectTypeList,
  searchObjectTypes,
} from '@/services/object-type-list';
import ObjectTypeEmptyState from '@/views/object-type-list/components/object-type-empty-state/index.vue';
import ObjectTypeListToolbar from '@/views/object-type-list/components/object-type-list-toolbar/index.vue';
import ObjectTypePagination from '@/views/object-type-list/components/object-type-pagination/index.vue';
import ObjectTypeTable from '@/views/object-type-list/components/object-type-table/index.vue';
import type {ObjectTypeListItem, ObjectTypeListPermissions} from '@/types/object-type-list/model';

const router = useRouter();
const rows = ref<ObjectTypeListItem[]>([]);
const keyword = ref('');
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(39);
const loading = ref(false);
const errorMessage = ref('');
const permissions = ref<ObjectTypeListPermissions>({
  canCreate: true,
  canViewDetail: true,
});

const emptyDescription = computed(() => (keyword.value.trim() ? '未找到匹配的对象类型' : '暂无对象类型数据'));

const loadList = async (mode: 'default' | 'search' | 'refresh' = 'default') => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const params = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
    };
    const result =
      mode === 'refresh'
        ? await refreshObjectTypeList(params)
        : keyword.value.trim()
          ? await searchObjectTypes(params)
          : await getObjectTypeList(params);

    rows.value = result.list;
    total.value = result.total;
  } catch {
    errorMessage.value = '列表数据加载失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

let searchTimer: number | undefined;

watch(keyword, () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    pageNo.value = 1;
    loadList('search');
  }, 500);
});

const onRefresh = async () => {
  await loadList('refresh');
};

const onPageChange = (nextPage: number) => {
  pageNo.value = nextPage;
  loadList();
};

const onDetail = (id: string) => {
  message.info(`查看对象类型详情：${id}`);
};

onMounted(async () => {
  permissions.value = await getObjectTypeListPermissions();
  await loadList();
});
</script>

<style scoped lang="scss">
.object-list-page {
  position: relative;
  z-index: 1;
}

.breadcrumb {
  display: flex;
  height: 34px;
  align-items: center;
  gap: 4px;
  color: var(--matrix-color-text-secondary);
}

.page-title {
  display: flex;
  height: 28px;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.state-alert {
  margin: 0 12px 12px;
}
</style>

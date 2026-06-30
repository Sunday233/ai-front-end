<template>
  <AppShell active-key="object-types">
    <section class="object-list-page">
      <div class="object-list-page__breadcrumb">返回首页 <span>|</span> <ApartmentOutlined /> 对象类型</div>
      <h1>对象类型列表 <span>{{ total }}</span></h1>
      <ObjectTypeListToolbar
        :keyword="keyword"
        :loading="loading"
        :can-create="permissions.canCreate"
        @search="onSearch"
        @refresh="onRefresh"
        @create="router.push('/object-types/create')"
      />
      <ObjectTypeTable
        :rows="rows"
        :keyword="keyword"
        :loading="loading"
        :current="pageNo"
        :page-size="pageSize"
        :total="total"
        @detail="onDetail"
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      />
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from "@/layout/app-shell/index.vue";
import {
  getObjectTypeList,
  getObjectTypeListPermissions,
  refreshObjectTypeList,
} from "@/services/object-type-list";
import type {
  ObjectTypeListItem,
  ObjectTypeListPermission,
} from "@/types/object-type-list/model";
import { ApartmentOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ObjectTypeListToolbar from "./components/object-type-list-toolbar/index.vue";
import ObjectTypeTable from "./components/object-type-table/index.vue";

const router = useRouter();
const rows = ref<ObjectTypeListItem[]>([]);
const loading = ref(false);
const keyword = ref("");
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(39);
const permissions = ref<ObjectTypeListPermission>({
  canCreate: true,
  canViewDetail: true,
});
let searchTimer: number | undefined;

const loadRows = async (useRefresh = false) => {
  loading.value = true;

  try {
    const params = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
    };
    const payload = useRefresh
      ? await refreshObjectTypeList(params)
      : await getObjectTypeList(params);
    rows.value = payload.list;
    total.value = payload.total;
  } finally {
    loading.value = false;
  }
};

const loadPermissions = async () => {
  const payload = await getObjectTypeListPermissions();
  permissions.value = payload.permissions;
};

const onSearch = (nextKeyword: string) => {
  keyword.value = nextKeyword;
  pageNo.value = 1;

  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    void loadRows();
  }, 300);
};

const onRefresh = () => {
  void loadRows(true);
};

const onPageChange = (nextPage: number) => {
  pageNo.value = nextPage;
  void loadRows();
};

const onPageSizeChange = (nextSize: number) => {
  pageSize.value = nextSize;
  pageNo.value = 1;
  void loadRows();
};

const onDetail = (row: ObjectTypeListItem) => {
  message.info(`查看 ${row.name} 详情的路由待后续接入`);
};

onMounted(() => {
  void Promise.all([loadRows(), loadPermissions()]);
});
</script>

<style scoped lang="scss">
.object-list-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 16px 26px 40px;
}

.object-list-page__breadcrumb {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 24px;
  color: var(--matrix-text-muted);
}

h1 {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 22px 0 0;
  font-size: 18px;
  font-weight: 500;

  span {
    min-width: 28px;
    padding: 0 6px;
    color: var(--matrix-text-secondary);
    font-size: 14px;
    text-align: center;
    background: var(--matrix-bg-subtle);
    border: 1px solid var(--matrix-border);
    border-radius: 2px;
  }
}
</style>

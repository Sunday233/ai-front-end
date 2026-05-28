<script setup lang="ts">
import { ResourceIcon } from "@/components";
import MatrixShell from "@/layout/matrix-shell/index.vue";
import {
  getObjectTypeList,
  getObjectTypeListPermissions,
  getWorkbenchSummary,
} from "@/services/matrix";
import type { NavigationItem, ObjectTypeRow } from "@/types/matrix/model";
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { TableColumnsType } from "ant-design-vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const keyword = ref("");
const loading = ref(false);
const menus = ref<NavigationItem[]>([]);
const rows = ref<ObjectTypeRow[]>([]);
const total = ref(39);
const pageNo = ref(1);
const pageSize = ref(10);
const canCreate = ref(true);

const columns: TableColumnsType<ObjectTypeRow> = [
  { title: "类型名称", dataIndex: "name", key: "name", width: "28%" },
  { title: "状态", dataIndex: "status", key: "status", width: "16%" },
  { title: "可见性", dataIndex: "visibility", key: "visibility", width: "16%" },
  { title: "修改时间", dataIndex: "updatedAt", key: "updatedAt", width: "26%" },
  { title: "操作", dataIndex: "actions", key: "actions" },
];

let searchTimer: number | undefined;

const displayPageText = computed(
  () =>
    `第${pageNo.value}/${Math.max(1, Math.ceil(total.value / pageSize.value))}，共${total.value}条`,
);

const highlightedName = (name: string): string => {
  const value = keyword.value.trim();
  if (!value) {
    return name;
  }
  return name.replace(
    new RegExp(value, "gi"),
    (match) => `<span class="highlight">${match}</span>`,
  );
};

const loadRows = async (): Promise<void> => {
  loading.value = true;
  const response = await getObjectTypeList({
    keyword: keyword.value,
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  });
  rows.value = response.rows;
  total.value = response.total;
  loading.value = false;
};

const onRefresh = (): void => {
  loadRows();
};

const onCreate = (): void => {
  router.push("/object-types/create");
};

watch(keyword, () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    pageNo.value = 1;
    loadRows();
  }, 500);
});

watch([pageNo, pageSize], () => {
  loadRows();
});

onMounted(async () => {
  const [summary, permissions] = await Promise.all([
    getWorkbenchSummary(),
    getObjectTypeListPermissions(),
  ]);
  menus.value = summary.menus;
  canCreate.value = permissions.canCreate;
  await loadRows();
});
</script>

<template>
  <MatrixShell active-key="objectType" :breadcrumb="['返回首页', '对象类型']" :menus="menus">
    <div class="list-page">
      <header class="title-row">
        <h1>对象类型列表 <span>39</span></h1>
      </header>

      <div class="actions-row">
        <a-input v-model:value="keyword" class="search" placeholder="请输入类型名称、id或rid进行搜索" :maxlength="50" allow-clear>
          <template #suffix>
            <span class="counter">{{ keyword.length }} / 50</span>
            <SearchOutlined />
          </template>
        </a-input>
        <div class="right-actions">
          <a-button :loading="loading" @click="onRefresh"><ReloadOutlined /></a-button>
          <a-button><SettingOutlined /></a-button>
          <a-button v-if="canCreate" type="primary" @click="onCreate"><PlusOutlined /> 创建</a-button>
        </div>
      </div>

      <div class="table-card">
        <a-table :columns="columns" :data-source="rows" :loading="loading" :pagination="false" row-key="id" size="middle">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <span class="name-cell">
                <span class="name-icon"><ResourceIcon type="object" /></span>
                <span v-html="highlightedName(record.name)" />
              </span>
            </template>
            <template v-else-if="column.key === 'status'">
              <a-tag :color="record.status === 'normal' ? 'green' : 'blue'">{{ record.status === "normal" ? "正常" : "草稿" }}</a-tag>
            </template>
            <template v-else-if="column.key === 'visibility'">
              <a-tag color="blue">{{ record.visibility === "visible" ? "可见" : "隐藏" }}</a-tag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <a class="text-link">详情</a>
            </template>
          </template>
          <template #emptyText>
            <a-empty :description="keyword ? '未找到匹配的对象类型' : '暂无对象类型'" />
          </template>
        </a-table>

        <div class="pager">
          <span>{{ displayPageText }}</span>
          <a-pagination v-model:current="pageNo" v-model:page-size="pageSize" :total="total" :show-size-changer="false" size="small" />
          <a-select v-model:value="pageSize" size="small" :options="[{ value: 10, label: '10 条/页' }, { value: 20, label: '20 条/页' }]" />
          <span>前往</span>
          <a-input-number v-model:value="pageNo" size="small" :min="1" :max="Math.max(1, Math.ceil(total / pageSize))" />
          <span>页</span>
        </div>
      </div>
    </div>
  </MatrixShell>
</template>

<style scoped lang="scss">
.list-page {
  position: relative;
  z-index: 1;
}

.title-row {
  height: 44px;
}

h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
}

h1 span {
  display: inline-flex;
  min-width: 34px;
  height: 22px;
  margin-left: 8px;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-text-secondary);
  font-size: 12px;
  background: #f3f5f8;
  border: 1px solid var(--matrix-border);
  border-radius: 2px;
}

.actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 16px;
}

.search {
  width: 330px;
}

.counter {
  margin-right: 8px;
  color: var(--matrix-text-muted);
}

.right-actions {
  display: flex;
  gap: 12px;
}

.table-card {
  min-height: 646px;
  padding: 0 16px 18px;
  background: var(--matrix-white);
}

.table-card :deep(.ant-table-thead > tr > th) {
  color: var(--matrix-text);
  font-weight: 600;
  background: #f4f5f7;
}

.table-card :deep(.ant-table-row:nth-child(even) > td) {
  background: var(--matrix-soft-bg);
}

.name-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.name-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--matrix-white);
  background: var(--matrix-primary);
  border-radius: 2px;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 58px;
  color: var(--matrix-text-secondary);
  gap: 10px;
}

.pager :deep(.ant-input-number) {
  width: 52px;
}

:deep(.highlight) {
  color: var(--matrix-primary);
  font-weight: 600;
}
</style>

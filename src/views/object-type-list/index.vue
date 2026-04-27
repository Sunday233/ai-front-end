<template>
  <div class="pageWrap">
    <div class="headerRow">
      <h2 class="pageTitle">对象类型列表</h2>
      <span class="titleCount">{{ pagination.total }}</span>
    </div>

    <a-card :bordered="false" class="listCard">
      <div class="toolBar">
        <a-input
          v-model:value="filters.keyword"
          class="searchInput"
          allow-clear
          placeholder="请输入类型名称进行检索"
          @press-enter="onQuery"
        >
          <template #prefix>
            <span class="searchPrefix">⌕</span>
          </template>
        </a-input>
        <a-button class="iconButton" @click="onRefresh" title="刷新">↻</a-button>
        <a-button class="iconButton" @click="onOpenSettings" title="列表设置">⚙</a-button>
        <a-button type="primary" @click="onCreate">+ 新建</a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
        :row-selection="rowSelection"
        class="dataTable"
        row-key="id"
      >
        <template #bodyCell="{column, record}">
          <template v-if="column.dataIndex === 'status'">
            <span class="statusCell">
              <span :class="['statusDot', record.status === 'active' ? 'dotActive' : 'dotBuilding']" />
              {{ statusTextMap[record.status] }}
            </span>
          </template>

          <template v-if="column.dataIndex === 'name'">
            <span class="nameCell">
              <span class="nameIcon">▣</span>
              <span>{{ record.name }}</span>
            </span>
          </template>

          <template v-if="column.dataIndex === 'visibility'">
            <a-tag :color="record.visibility === 'public' ? 'blue' : 'red'">
              {{ visibilityTextMap[record.visibility] }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="onCheck(record.id)">查看</a-button>
          </template>
        </template>
      </a-table>

      <div class="paginationRow">
        <a-pagination
          :current="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :show-less-items="false"
          @change="onPageChange"
        />
        <div class="pagerToolBar">
          <a-select
            v-model:value="pagination.pageSize"
            :options="pageSizeOptions"
            class="pageSizeSelect"
            @change="onPageSizeChange"
          />
          <span class="jumpLabel">前往</span>
          <a-input-number
            v-model:value="quickPage"
            :controls="false"
            :max="maxPage"
            :min="1"
            class="jumpInput"
          />
          <span class="jumpLabel">页</span>
          <a-button @click="onQuickGo">确定</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {message, type TableColumnsType} from 'ant-design-vue';

import {getObjectTypeList} from '@/services/objectType';
import type {ObjectTypeItem} from '@/types/object-type/model';

const router = useRouter();

const loading = ref(false);
const tableData = ref<ObjectTypeItem[]>([]);
const selectedRowKeys = ref<string[]>([]);
const quickPage = ref<number | null>(1);

const filters = reactive({
  keyword: '',
});

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const maxPage = computed(() => {
  if (pagination.total === 0) {
    return 1;
  }
  return Math.ceil(pagination.total / pagination.pageSize);
});

const pageSizeOptions = [
  {
    label: '10 条/页',
    value: 10,
  },
  {
    label: '20 条/页',
    value: 20,
  },
  {
    label: '50 条/页',
    value: 50,
  },
];

const statusTextMap: Record<ObjectTypeItem['status'], string> = {
  active: '活跃',
  building: '建设中',
};

const visibilityTextMap: Record<ObjectTypeItem['visibility'], string> = {
  public: '可见',
  private: '不可见',
};

const columns: TableColumnsType<ObjectTypeItem> = [
  {
    title: '类型名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 140,
  },
  {
    title: '可见性',
    dataIndex: 'visibility',
    key: 'visibility',
    width: 120,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 160,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
];

const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: Array<string | number>) => {
    selectedRowKeys.value = keys.map((item) => String(item));
  },
}));

const loadData = async () => {
  loading.value = true;
  try {
    const response = await getObjectTypeList({
      keyword: filters.keyword,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });

    tableData.value = response.list;
    pagination.total = response.total;
  } finally {
    loading.value = false;
  }
};

const onQuery = () => {
  pagination.current = 1;
  void loadData();
};

const onRefresh = () => {
  void loadData();
};

const onOpenSettings = () => {
  message.info('列表设置能力待接入');
};

const onCreate = () => {
  void router.push('/object-type/create');
};

const onPageChange = (page: number, pageSize: number) => {
  pagination.current = page;
  pagination.pageSize = pageSize;
  quickPage.value = page;
  void loadData();
};

const onPageSizeChange = (value: string | number) => {
  pagination.pageSize = Number(value);
  pagination.current = 1;
  quickPage.value = 1;
  void loadData();
};

const onQuickGo = () => {
  const rawPage = quickPage.value ?? pagination.current;
  const targetPage = Math.min(Math.max(rawPage, 1), maxPage.value);
  quickPage.value = targetPage;
  if (targetPage === pagination.current) {
    return;
  }
  pagination.current = targetPage;
  void loadData();
};

const onCheck = (recordId: string) => {
  message.info(`对象类型 ${recordId} 的详情页待接入`);
};

onMounted(() => {
  quickPage.value = pagination.current;
  void loadData();
});

watch(
  () => filters.keyword,
  (keyword, previousKeyword) => {
    if (previousKeyword.trim().length > 0 && keyword.trim().length === 0) {
      pagination.current = 1;
      quickPage.value = 1;
      void loadData();
    }
  }
);
</script>

<style scoped lang="scss">
.pageWrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.headerRow {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pageTitle {
  margin: 0;
  color: var(--shell-title);
  font-size: 22px;
}

.titleCount {
  padding: 0 8px;
  color: var(--shell-subtitle);
  font-size: 12px;
  background: var(--shell-badge-bg);
  border-radius: 999px;
}

.listCard {
  border-radius: 8px;
  box-shadow: var(--shell-card-shadow);
}

.toolBar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
}

.searchInput {
  max-width: 380px;
}

.searchPrefix {
  color: var(--shell-subtitle);
  font-size: 12px;
}

.iconButton {
  width: 32px;
  padding: 0;
}

.dataTable {
  border: 1px solid var(--shell-border);
  border-radius: 8px;
}

.nameCell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.nameIcon {
  color: var(--ant-color-primary);
  font-size: 12px;
}

.statusCell {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}

.statusDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dotActive {
  background: #52c41a;
}

.dotBuilding {
  background: #2f54eb;
}

.paginationRow {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 14px;
}

.pagerToolBar {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pageSizeSelect {
  width: 110px;
}

.jumpLabel {
  color: var(--shell-subtitle);
  font-size: 12px;
}

.jumpInput {
  width: 70px;
}
</style>

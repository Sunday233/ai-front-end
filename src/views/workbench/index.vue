<template>
  <WorkbenchShell active-key="workbench">
    <div class="breadcrumb">
      <RouterLink to="/workbench">返回首页</RouterLink>
      <span>|</span>
      <strong>工作台</strong>
    </div>

    <WorkbenchHeader
      v-model:keyword="keyword"
      :permissions="permissions"
      @search="onSearch"
      @create-select="onCreateSelect"
    />

    <Spin :spinning="loading">
      <ObjectTypeSection title="最近浏览的对象类型" :count="recentCards.length" :cards="recentCards" compact />
      <ObjectTypeSection title="收藏的对象类型" :count="favoriteCards.length" :cards="favoriteCards" />
    </Spin>
  </WorkbenchShell>
</template>

<script setup lang="ts">
import { message, Spin } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import WorkbenchShell from '@/layout/workbench-shell/index.vue';
import {
  getWorkbenchCreatePermissions,
  getWorkbenchSummary,
  searchWorkbenchObjectTypes,
} from '@/services/workbench';
import type {
  WorkbenchCreatePermissions,
  WorkbenchObjectTypeCard,
} from '@/types/workbench/model';
import ObjectTypeSection from './components/object-type-section/index.vue';
import WorkbenchHeader from './components/workbench-header/index.vue';

const baseParams = {
  workspaceId: 'workspace-matrix',
  agentId: 'agent-rrr',
};

const keyword = ref('');
const loading = ref(false);
const recentCards = ref<WorkbenchObjectTypeCard[]>([]);
const favoriteCards = ref<WorkbenchObjectTypeCard[]>([]);
const permissions = ref<WorkbenchCreatePermissions>({
  canCreateObjectType: true,
  canCreateLink: true,
  canCreateAction: true,
  canCreateObjectGroup: true,
  canManageAgent: true,
});

const loadWorkbench = async () => {
  loading.value = true;

  try {
    const [summary, createPermissions] = await Promise.all([
      getWorkbenchSummary(baseParams),
      getWorkbenchCreatePermissions(baseParams),
    ]);
    recentCards.value = summary.recentObjectTypes;
    favoriteCards.value = summary.favoriteObjectTypes;
    permissions.value = createPermissions;
  } finally {
    loading.value = false;
  }
};

const onSearch = async () => {
  const result = await searchWorkbenchObjectTypes({
    ...baseParams,
    keyword: keyword.value,
  });
  favoriteCards.value = result.list.slice(1);
  recentCards.value = result.list.slice(0, 1);
};

const onCreateSelect = () => {
  message.success('已进入创建流程');
};

onMounted(() => {
  void loadWorkbench();
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
</style>

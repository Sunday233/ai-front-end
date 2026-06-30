<template>
  <AppShell active-key="workbench" :show-manage="permissions.canManageAgent">
    <section class="workbench-page">
      <WorkbenchHeader
        :keyword="keyword"
        :can-create="permissions.canCreateObjectType || permissions.canCreateLink || permissions.canCreateAction"
        @search="onSearch"
        @create="onCreate"
      />

      <div class="workbench-page__content">
        <section class="workbench-page__section">
          <div class="workbench-page__title">
            <h2>最近浏览的对象类型</h2>
            <span>{{ filteredRecent.length }}</span>
            <RouterLink to="/object-types">查看全部</RouterLink>
          </div>
          <div class="workbench-page__recent">
            <ObjectTypeCard v-for="card in filteredRecent" :key="card.id" :card="card" />
          </div>
        </section>

        <section class="workbench-page__section">
          <div class="workbench-page__title">
            <h2>收藏的对象类型</h2>
            <span>{{ filteredFavorites.length }}</span>
            <RouterLink to="/object-types">查看全部</RouterLink>
          </div>
          <div class="workbench-page__grid">
            <ObjectTypeCard v-for="card in filteredFavorites" :key="card.id" :card="card" />
          </div>
        </section>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from "@/layout/app-shell/index.vue";
import {
  getWorkbenchCreatePermissions,
  getWorkbenchSummary,
  searchWorkbenchObjectTypes,
} from "@/services/workbench";
import type {
  WorkbenchCreatePermission,
  WorkbenchObjectTypeCard,
} from "@/types/workbench/model";
import { message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ObjectTypeCard from "./components/object-type-card/index.vue";
import WorkbenchHeader from "./components/workbench-header/index.vue";

const router = useRouter();
const keyword = ref("");
const recentCards = ref<WorkbenchObjectTypeCard[]>([]);
const favoriteCards = ref<WorkbenchObjectTypeCard[]>([]);
const searchedCards = ref<WorkbenchObjectTypeCard[] | null>(null);
const permissions = ref<WorkbenchCreatePermission>({
  canCreateObjectType: true,
  canCreateLink: true,
  canCreateAction: true,
  canCreateObjectGroup: true,
  canManageAgent: true,
});

const filteredRecent = computed(() => {
  if (!searchedCards.value) {
    return recentCards.value;
  }

  return searchedCards.value.filter((card) =>
    recentCards.value.some((recent) => recent.id === card.id),
  );
});

const filteredFavorites = computed(() => {
  if (!searchedCards.value) {
    return favoriteCards.value;
  }

  return searchedCards.value.filter((card) =>
    favoriteCards.value.some((favorite) => favorite.id === card.id),
  );
});

const loadWorkbench = async () => {
  const [{ summary }, createPermissions] = await Promise.all([
    getWorkbenchSummary({
      workspaceId: "workspace-eda",
      agentId: "agent-matrix",
    }),
    getWorkbenchCreatePermissions({ agentId: "agent-matrix" }),
  ]);

  recentCards.value = summary.recentObjectTypes;
  favoriteCards.value = summary.favoriteObjectTypes;
  permissions.value = createPermissions;
};

const onSearch = async (nextKeyword: string) => {
  keyword.value = nextKeyword;

  if (!nextKeyword.trim()) {
    searchedCards.value = null;
    return;
  }

  const { list } = await searchWorkbenchObjectTypes({
    agentId: "agent-matrix",
    keyword: nextKeyword,
  });
  searchedCards.value = list;
};

const onCreate = async (key: string) => {
  if (key === "objectType") {
    await router.push("/object-types/create");
    return;
  }

  message.info("该创建流程暂未开放，已保留入口位置");
};

onMounted(() => {
  void loadWorkbench();
});
</script>

<style scoped lang="scss">
.workbench-page {
  position: relative;
  min-height: 100vh;
}

.workbench-page__content {
  position: relative;
  z-index: 1;
  padding: 12px 16px 40px;
}

.workbench-page__section + .workbench-page__section {
  margin-top: 14px;
}

.workbench-page__title {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 28px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  span {
    min-width: 20px;
    padding: 0 6px;
    color: var(--matrix-text-secondary);
    text-align: center;
    background: var(--matrix-bg-subtle);
    border: 1px solid var(--matrix-border);
    border-radius: 2px;
  }

  a {
    margin-left: auto;
    color: var(--matrix-primary);
  }
}

.workbench-page__recent {
  width: 336px;
}

.workbench-page__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
</style>

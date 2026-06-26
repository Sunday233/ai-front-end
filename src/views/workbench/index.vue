<template>
  <AppShell>
    <div class="workbench-page">
      <WorkbenchHeader
        v-model:keyword="keyword"
        :menu-open="createMenuOpen"
        :summary="summary"
        @toggle-create-menu="createMenuOpen = !createMenuOpen"
        @select-create-route="onSelectCreateRoute"
      />

      <a-spin :spinning="loading">
        <ObjectTypeSection
          title="最近浏览的对象类型"
          :cards="filteredRecentCards"
          variant="recent"
        />
        <ObjectTypeSection title="收藏的对象类型" :cards="filteredFavoriteCards" />
      </a-spin>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import AppShell from '@/layout/app-shell/index.vue';
import {getWorkbenchSummary, searchWorkbenchObjectTypes} from '@/services/workbench';
import ObjectTypeSection from '@/views/workbench/components/object-type-section/index.vue';
import WorkbenchHeader from '@/views/workbench/components/workbench-header/index.vue';
import type {WorkbenchObjectTypeCard, WorkbenchSummary} from '@/types/workbench/model';

const router = useRouter();
const loading = ref(false);
const keyword = ref('');
const createMenuOpen = ref(false);
const summary = ref<WorkbenchSummary | null>(null);
const searchedCards = ref<WorkbenchObjectTypeCard[] | null>(null);

const filteredRecentCards = computed(() => {
  return filterCards(summary.value?.recentObjectTypes ?? []);
});

const filteredFavoriteCards = computed(() => {
  return searchedCards.value ?? filterCards(summary.value?.favoriteObjectTypes ?? []);
});

const filterCards = (cards: WorkbenchObjectTypeCard[]) => {
  const value = keyword.value.trim().toLowerCase();

  if (!value) {
    return cards;
  }

  return cards.filter((card) => card.name.toLowerCase().includes(value));
};

const onSelectCreateRoute = (routePath: string) => {
  createMenuOpen.value = false;
  router.push(routePath);
};

let searchTimer: number | undefined;

watch(keyword, (value) => {
  window.clearTimeout(searchTimer);

  if (!value.trim()) {
    searchedCards.value = null;
    return;
  }

  searchTimer = window.setTimeout(async () => {
    const result = await searchWorkbenchObjectTypes({keyword: value});
    searchedCards.value = result.list;
  }, 300);
});

onMounted(async () => {
  loading.value = true;
  try {
    summary.value = await getWorkbenchSummary();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.workbench-page {
  min-height: calc(100vh - 50px);
}
</style>

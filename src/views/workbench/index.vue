<template>
  <div class="pageWrap">
    <div class="toolBar">
      <a-input
        v-model:value="filters.keyword"
        class="searchInput"
        allow-clear
        placeholder="请输入对象名称、RID或属性名称进行搜索"
        @press-enter="onQuery"
      />
      <a-select v-model:value="filters.branch" class="branchSelect" :options="branchOptions" />
      <a-button @click="onQuery">查询</a-button>
      <a-button @click="onReset">重置</a-button>
      <a-button type="primary" @click="onCreate">+ 新建</a-button>
    </div>

    <a-card :bordered="false" class="sectionCard">
      <template #title>
        <div class="titleRow">
          <span>最近浏览的数据类型</span>
          <span class="titleCount">{{ recentCards.length }}</span>
        </div>
      </template>

      <a-row :gutter="[14, 14]">
        <a-col v-for="card in recentCards" :key="card.id" :xs="24" :sm="12" :lg="8">
          <a-card :bordered="false" :loading="loading" class="recentCard">
            <div class="cardHeader">
              <div :class="['cardIcon', card.color === 'green' ? 'cardIconGreen' : 'cardIconBlue']" />
              <div>
                <div class="cardTitle">{{ card.name }}</div>
                <div class="cardMeta">{{ card.relationCaseCount }}万条案例 ｜ 应用{{ card.appCount }}次</div>
              </div>
            </div>
            <p class="cardDescription">{{ card.description }}</p>
            <div class="cardTags">
              <a-tag v-for="tag in card.tags" :key="`${card.id}-${tag}`" color="blue">{{ tag }}</a-tag>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false" class="sectionCard">
      <template #title>
        <div class="titleRow">
          <span>收藏的对象类型</span>
          <span class="titleCount">{{ favoriteCards.length }}</span>
        </div>
      </template>

      <template #extra>
        <a-button type="link" @click="onViewAll">查看全部</a-button>
      </template>

      <div class="emptyWrap">
        <a-empty description="暂无数据" />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

import {getWorkbenchList} from '@/services/workbench';
import type {WorkbenchCard} from '@/types/workbench/model';

interface BranchOption {
  label: string;
  value: string;
}

const router = useRouter();

const loading = ref(false);
const recentCards = ref<WorkbenchCard[]>([]);
const favoriteCards = ref<WorkbenchCard[]>([]);

const filters = reactive({
  keyword: '',
  branch: 'main',
});

const branchOptions: BranchOption[] = [
  {
    label: '请选择分支',
    value: 'main',
  },
  {
    label: '研发分支',
    value: 'dev',
  },
  {
    label: '测试分支',
    value: 'test',
  },
];

const loadWorkbench = async () => {
  loading.value = true;
  try {
    const response = await getWorkbenchList({
      keyword: filters.keyword,
      branch: filters.branch,
    });
    recentCards.value = response.recent;
    favoriteCards.value = response.favorites;
  } finally {
    loading.value = false;
  }
};

const onQuery = () => {
  void loadWorkbench();
};

const onReset = () => {
  filters.keyword = '';
  filters.branch = 'main';
  void loadWorkbench();
};

const onCreate = () => {
  void router.push('/object-type/create');
};

const onViewAll = () => {
  void router.push('/object-type/list');
};

onMounted(() => {
  void loadWorkbench();
});
</script>

<style scoped lang="scss">
.pageWrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toolBar {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 14px;
  background: var(--ant-color-bg-container);
  border-radius: 8px;
  box-shadow: var(--shell-card-shadow);
}

.searchInput {
  flex: 1;
}

.branchSelect {
  width: 160px;
}

.sectionCard {
  border-radius: 8px;
  box-shadow: var(--shell-card-shadow);
}

.titleRow {
  display: flex;
  gap: 8px;
  align-items: center;
}

.titleCount {
  padding: 0 8px;
  color: var(--shell-subtitle);
  font-size: 12px;
  background: var(--shell-badge-bg);
  border-radius: 999px;
}

.recentCard {
  min-height: 172px;
  background: #fafcff;
}

.cardHeader {
  display: flex;
  gap: 10px;
  align-items: center;
}

.cardIcon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
}

.cardIconBlue {
  background: linear-gradient(135deg, #3f87ff, #2b6de8);
}

.cardIconGreen {
  background: linear-gradient(135deg, #54d59f, #20a56d);
}

.cardTitle {
  color: var(--shell-title);
  font-size: 18px;
  font-weight: 600;
}

.cardMeta {
  color: var(--shell-subtitle);
  font-size: 12px;
}

.cardDescription {
  margin: 12px 0;
  color: var(--shell-subtitle);
  line-height: 1.5;
}

.cardTags {
  display: flex;
  gap: 6px;
  align-items: center;
}

.emptyWrap {
  padding: 30px 0;
}
</style>

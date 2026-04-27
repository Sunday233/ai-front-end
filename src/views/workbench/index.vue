<template>
  <div class="pageWrap">
    <div class="toolBar">
      <a-input
        v-model:value="filters.keyword"
        class="searchInput"
        allow-clear
        placeholder="请输入对象名称、RID或属性名称进行搜索"
        @press-enter="onQuery"
      >
        <template #prefix>
          <span class="searchPrefix">⌕</span>
        </template>
      </a-input>
      <a-select
        v-model:value="filters.branch"
        class="branchSelect"
        :options="branchOptions"
        placeholder="请选择分支"
      />
      <a-button @click="onQuery">查询</a-button>
      <a-button @click="onReset">重置</a-button>
      <a-popover v-model:open="createMenuOpen" placement="bottomRight" trigger="click">
        <template #content>
          <div class="createMenuPanel">
            <button
              v-for="item in createMenuItems"
              :key="item.key"
              class="createMenuItem"
              type="button"
              @click="onCreateMenuSelect(item.key)"
            >
              <span class="createMenuItemTitle">{{ item.label }}</span>
              <span class="createMenuItemDesc">{{ item.description }}</span>
            </button>
          </div>
        </template>
        <a-button type="primary">+ 新建</a-button>
      </a-popover>
    </div>

    <a-card :bordered="false" class="sectionCard">
      <template #title>
        <div class="titleRow">
          <span>最近浏览的数据类型</span>
          <span class="titleCount">{{ recentTotal }}</span>
        </div>
      </template>

      <div class="recentGrid">
        <a-card v-for="card in recentCards" :key="card.id" :bordered="false" :loading="loading" class="recentCard">
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
      </div>
    </a-card>

    <a-card :bordered="false" class="sectionCard">
      <template #title>
        <div class="titleRow">
          <span>收藏的对象类型</span>
          <span class="titleCount">{{ favoriteTotal }}</span>
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
import {message} from 'ant-design-vue';
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

import {getWorkbenchList} from '@/services/workbench';
import type {WorkbenchCard} from '@/types/workbench/model';

interface BranchOption {
  label: string;
  value: string;
}

type CreateMenuKey = 'object-type-create' | 'relation-type-create' | 'action-type-create';

interface CreateMenuItem {
  key: CreateMenuKey;
  label: string;
  description: string;
}

const router = useRouter();

const loading = ref(false);
const recentCards = ref<WorkbenchCard[]>([]);
const favoriteCards = ref<WorkbenchCard[]>([]);
const recentTotal = ref(0);
const favoriteTotal = ref(0);
const createMenuOpen = ref(false);

const filters = reactive({
  keyword: '',
  branch: '',
});

const branchOptions: BranchOption[] = [
  {
    label: '主分支',
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

const createMenuItems: CreateMenuItem[] = [
  {
    key: 'object-type-create',
    label: '对象类型',
    description: '对象类型可以是实体或者是事件',
  },
  {
    key: 'relation-type-create',
    label: '链接类型',
    description: '链接类型可以链接两个对象类型',
  },
  {
    key: 'action-type-create',
    label: '动作类型',
    description: '允许用户将数据写入动态智能体',
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
    recentTotal.value = response.recentTotal;
    favoriteTotal.value = response.favoriteTotal;
  } finally {
    loading.value = false;
  }
};

const onQuery = () => {
  void loadWorkbench();
};

const onReset = () => {
  filters.keyword = '';
  filters.branch = '';
  void loadWorkbench();
};

const onCreate = () => {
  void router.push('/object-type/create');
};

const onCreateMenuSelect = (clickedKey: CreateMenuKey) => {
  createMenuOpen.value = false;
  if (clickedKey === 'object-type-create') {
    onCreate();
    return;
  }
  message.info('该能力待接入');
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pageWrap::after {
  content: '';
  position: absolute;
  top: -16px;
  right: 18px;
  width: 92px;
  height: 52px;
  background: radial-gradient(circle at 50% 50%, rgb(71 141 255 / 20%), transparent 64%);
  pointer-events: none;
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
  width: 170px;
}

.searchPrefix {
  color: var(--shell-subtitle);
  font-size: 12px;
}

.createMenuPanel {
  display: flex;
  flex-direction: column;
  width: 230px;
}

.createMenuItem {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.createMenuItem:hover {
  background: var(--shell-hover-bg);
}

.createMenuItemTitle {
  color: var(--ant-color-primary);
  font-size: 14px;
}

.createMenuItemDesc {
  color: var(--shell-subtitle);
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
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

.recentGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
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

@media (max-width: 920px) {
  .recentGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .recentGrid {
    grid-template-columns: 1fr;
  }
}
</style>

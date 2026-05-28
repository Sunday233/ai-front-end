<script setup lang="ts">
import { ResourceIcon } from "@/components";
import MatrixShell from "@/layout/matrix-shell/index.vue";
import { getWorkbenchSummary } from "@/services/matrix";
import type {
  NavigationItem,
  ObjectTypeCard,
  ResourceType,
} from "@/types/matrix/model";
import {
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(true);
const keyword = ref("");
const createOpen = ref(false);
const menus = ref<NavigationItem[]>([]);
const recentCards = ref<ObjectTypeCard[]>([]);
const favoriteCards = ref<ObjectTypeCard[]>([]);

const createOptions: Array<{
  key: ResourceType;
  title: string;
  description: string;
}> = [
  {
    key: "objectType",
    title: "对象类型",
    description: "对象类型可以是实体或者是事件",
  },
  {
    key: "linkType",
    title: "链接类型",
    description: "链接类型可以链接两个对象类型",
  },
  {
    key: "actionType",
    title: "动作类型",
    description: "允许用户将数据写入动态智能体",
  },
  {
    key: "objectTypeGroup",
    title: "对象类型组",
    description: "对象类型组可以包含多个对象类型",
  },
];

const filteredFavorites = computed(() => {
  const value = keyword.value.trim().toLowerCase();
  if (!value) {
    return favoriteCards.value;
  }
  return favoriteCards.value.filter((card) =>
    card.name.toLowerCase().includes(value),
  );
});

const onCreateOption = (key: ResourceType): void => {
  createOpen.value = false;
  if (key === "objectType") {
    router.push("/object-types/create");
  }
};

onMounted(async () => {
  const summary = await getWorkbenchSummary();
  menus.value = summary.menus;
  recentCards.value = summary.recentCards;
  favoriteCards.value = summary.favoriteCards;
  loading.value = false;
});
</script>

<template>
  <MatrixShell active-key="workbench" :breadcrumb="['返回首页', '工作台']" :menus="menus">
    <div class="workbench">
      <div class="toolbar">
        <a-input v-model:value="keyword" placeholder="请输入关键词进行搜索" allow-clear>
          <template #suffix>
            <span class="counter">{{ keyword.length }} / 50</span>
            <SearchOutlined />
          </template>
        </a-input>
        <div class="create-wrapper">
          <a-button type="primary" @click="createOpen = !createOpen"><PlusOutlined /> 新建</a-button>
          <div v-if="createOpen" class="create-menu">
            <button v-for="option in createOptions" :key="option.key" class="create-option" type="button" @click="onCreateOption(option.key)">
              <span class="option-icon"><ResourceIcon :type="option.key" /></span>
              <span>
                <strong>{{ option.title }}</strong>
                <small>{{ option.description }}</small>
              </span>
            </button>
          </div>
        </div>
      </div>

      <a-spin :spinning="loading">
        <section class="section">
          <div class="section-title">最近浏览的对象类型 <span>1</span></div>
          <div class="recent-grid">
            <article v-for="card in recentCards" :key="card.id" class="object-card recent-card">
              <div class="card-main">
                <div class="card-icon"><ResourceIcon type="object" /></div>
                <div>
                  <h3>{{ card.name }}</h3>
                  <p><b>{{ card.instanceCount }}</b>条实例 <i /> {{ card.usageLabel }}</p>
                  <small>{{ card.description }}</small>
                </div>
              </div>
              <div class="card-footer">
                <span v-for="tag in card.tags" :key="`${card.id}-${tag.label}`" class="mini-tag"><ResourceIcon type="object" /> {{ tag.label }} <em v-if="tag.count">{{ tag.count }}</em></span>
                <MoreOutlined class="more" />
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="section-title">收藏的对象类型 <span>{{ filteredFavorites.length }}</span><a class="view-all">查看全部</a></div>
          <div class="card-grid">
            <article v-for="card in filteredFavorites" :key="card.id" class="object-card">
              <StarFilled class="star" />
              <div class="card-main">
                <div class="card-icon"><ResourceIcon type="object" /></div>
                <div>
                  <h3>{{ card.name }}</h3>
                  <p><b>{{ card.instanceCount }}</b>条实例 <i /> {{ card.usageLabel }}</p>
                  <small>{{ card.description }}</small>
                </div>
              </div>
              <div class="card-footer">
                <span v-for="tag in card.tags" :key="`${card.id}-${tag.label}`" class="mini-tag"><ResourceIcon type="object" /> {{ tag.label }} <em v-if="tag.count">{{ tag.count }}</em></span>
                <MoreOutlined class="more" />
              </div>
            </article>
          </div>
        </section>
      </a-spin>
    </div>
  </MatrixShell>
</template>

<style scoped lang="scss">
.workbench {
  position: relative;
  z-index: 1;
}

.toolbar {
  display: grid;
  grid-template-columns: minmax(640px, 1fr) auto;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.counter {
  margin-right: 8px;
  color: var(--matrix-text-muted);
}

.create-wrapper {
  position: relative;
}

.create-menu {
  position: absolute;
  top: 44px;
  right: 0;
  z-index: 4;
  width: 322px;
  padding: 14px;
  background: var(--matrix-white);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 15%);
}

.create-menu::before {
  position: absolute;
  top: -8px;
  right: 16px;
  width: 16px;
  height: 16px;
  content: "";
  background: var(--matrix-white);
  transform: rotate(45deg);
}

.create-option {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 8px;
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  gap: 12px;
}

.create-option:hover {
  background: var(--matrix-soft-bg);
}

.option-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--matrix-text);
  background: var(--matrix-soft-bg);
}

.create-option strong,
.create-option small {
  display: block;
}

.create-option small {
  margin-top: 4px;
  color: var(--matrix-text-muted);
}

.section {
  margin-top: 12px;
}

.section-title {
  position: relative;
  min-height: 30px;
  color: var(--matrix-text);
  font-size: 16px;
  line-height: 24px;
}

.section-title span {
  display: inline-flex;
  min-width: 24px;
  height: 20px;
  margin-left: 8px;
  padding: 0 6px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-text-secondary);
  font-size: 12px;
  background: #f3f5f8;
  border: 1px solid var(--matrix-border);
  border-radius: 2px;
}

.view-all {
  float: right;
  color: var(--matrix-primary);
  font-size: 14px;
}

.recent-grid {
  display: grid;
  grid-template-columns: 420px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 16px;
}

.object-card {
  position: relative;
  min-height: 184px;
  overflow: hidden;
  background: var(--matrix-white);
  border: 1px solid var(--matrix-divider);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 4%);
}

.object-card:hover {
  box-shadow: 0 4px 14px rgb(0 0 0 / 8%);
}

.card-main {
  display: flex;
  padding: 16px;
  gap: 12px;
}

.card-icon {
  display: flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--matrix-white);
  font-size: 22px;
  background: #2f86ff;
  border-radius: 3px;
}

h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
}

p {
  margin: 0 0 10px;
  color: var(--matrix-text-secondary);
}

p b {
  color: var(--matrix-primary);
  font-weight: 500;
}

p i {
  display: inline-block;
  width: 1px;
  height: 13px;
  margin: 0 12px;
  vertical-align: -2px;
  background: var(--matrix-border);
}

small {
  color: var(--matrix-text-secondary);
}

.star {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--matrix-warning);
}

.card-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
  border-top: 1px solid var(--matrix-divider);
  gap: 8px;
}

.mini-tag {
  display: inline-flex;
  align-items: center;
  max-width: 140px;
  color: var(--matrix-text-muted);
  white-space: nowrap;
  gap: 4px;
}

.mini-tag :deep(.resource-icon) {
  width: 18px;
  height: 18px;
  color: var(--matrix-white);
  background: var(--matrix-primary);
  border-radius: 2px;
}

.mini-tag em {
  min-width: 20px;
  padding: 0 4px;
  font-style: normal;
  text-align: center;
  background: #f3f5f8;
  border-radius: 2px;
}

.more {
  margin-left: auto;
}
</style>

<template>
  <a-layout class="shellLayout">
    <a-layout-sider :trigger="null" :width="208" class="siderPanel">
      <div class="brandTitle">智能体管理Matrix</div>
      <div class="tenantBlock">
        <span>DCH-研发智能体</span>
        <button type="button" class="refreshButton" @click="onRefresh">⟳</button>
      </div>

      <div class="menuGroups">
        <div v-for="group in menuGroups" :key="group.title" class="groupBlock">
          <div class="groupTitle">{{ group.title }}</div>

          <div
            v-for="item in group.items"
            :key="item.key"
            :class="['menuItem', {'menuItemActive': isActive(item.path)}]"
            @click="onNavigate(item.path)"
          >
            <span class="menuItemMain">
              <span class="menuIcon">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </span>
            <span v-if="item.count" class="countBadge">{{ item.count }}</span>
          </div>

          <div v-for="child in group.children" :key="child.key" class="menuChild">
            <span class="menuItemMain">
              <span class="menuIcon">{{ child.icon }}</span>
              <span>{{ child.label }}</span>
            </span>
            <span v-if="child.count" class="countBadge">{{ child.count }}</span>
          </div>
        </div>
      </div>
    </a-layout-sider>

    <a-layout class="mainLayout">
      <a-layout-header class="mainHeader">
        <a-breadcrumb>
          <a-breadcrumb-item>返回首页</a-breadcrumb-item>
          <a-breadcrumb-item>智能体管理 Matrix</a-breadcrumb-item>
          <a-breadcrumb-item>{{ currentTitle }}</a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content class="mainContent">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  path?: string;
  count?: number;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
  children: MenuItem[];
}

const route = useRoute();
const router = useRouter();

const menuGroups: MenuGroup[] = [
  {
    title: '工作台',
    items: [
      {
        key: 'workbench',
        icon: '⌂',
        label: '工作台',
        path: '/workbench',
      },
      {
        key: 'share',
        icon: '◈',
        label: '分享管理',
      },
      {
        key: 'logs',
        icon: '▤',
        label: '操作日志',
      },
    ],
    children: [],
  },
  {
    title: '数字资产',
    items: [
      {
        key: 'object-types',
        icon: '⌬',
        label: '对象类型',
        path: '/object-type/list',
        count: 1234,
      },
      {
        key: 'common-attrs',
        icon: '⇄',
        label: '共享属性',
        count: 1234,
      },
      {
        key: 'relation-types',
        icon: '◫',
        label: '链接类型',
        count: 1234,
      },
      {
        key: 'action-types',
        icon: '◰',
        label: '动作类型',
        count: 1234,
      },
      {
        key: 'object-groups',
        icon: '▣',
        label: '对象类型组',
        count: 1234,
      },
    ],
    children: [
      {
        key: 'object-attrs',
        icon: '◇',
        label: '属性',
      },
    ],
  },
  {
    title: '能力域',
    items: [
      {
        key: 'values',
        icon: '[-]',
        label: '值类型',
        count: 1234,
      },
      {
        key: 'functions',
        icon: 'ƒ',
        label: '函数',
        count: 1234,
      },
      {
        key: 'agent',
        icon: '⎔',
        label: '智能体管理',
      },
      {
        key: 'cleanup',
        icon: '◍',
        label: '数据清理',
      },
    ],
    children: [],
  },
];

const currentTitle = computed(() => {
  const title = route.meta.title;
  if (typeof title === 'string' && title.length > 0) {
    return title;
  }
  return '工作台';
});

const isActive = (path?: string) => {
  if (!path) {
    return false;
  }
  return route.path === path;
};

const onNavigate = (path?: string) => {
  if (!path || path === route.path) {
    return;
  }
  void router.push(path);
};

const onRefresh = () => {
  void router.replace(route.fullPath);
};
</script>

<style scoped lang="scss">
.shellLayout {
  min-height: 100%;
  background: var(--shell-bg);
}

.siderPanel {
  background: var(--shell-sider-bg);
  border-right: 1px solid var(--shell-border);
}

.brandTitle {
  padding: 18px 16px 10px;
  color: var(--ant-color-primary);
  font-size: 14px;
  font-weight: 600;
}

.tenantBlock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin: 0 10px 8px;
  color: var(--shell-title);
  font-size: 13px;
  border-radius: var(--shell-radius);
}

.refreshButton {
  border: none;
  background: transparent;
  color: var(--shell-subtitle);
  cursor: pointer;
}

.menuGroups {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 10px 16px;
}

.groupBlock {
  border-top: 1px solid var(--shell-border);
  padding-top: 8px;
}

.groupTitle {
  margin: 0 6px 6px;
  color: var(--shell-muted);
  font-size: 12px;
}

.menuItem,
.menuChild {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 10px;
  border-radius: 6px;
  color: #2d323d;
  font-size: 13px;
  cursor: pointer;
}

.menuItemMain {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.menuIcon {
  width: 14px;
  color: var(--shell-subtitle);
  font-size: 12px;
  text-align: center;
}

.menuItem:hover {
  background: var(--shell-hover-bg);
}

.menuItemActive {
  color: var(--ant-color-primary);
  background: var(--shell-active-bg);
}

.menuItemActive .menuIcon {
  color: var(--ant-color-primary);
}

.menuChild {
  margin-left: 18px;
  color: var(--shell-subtitle);
  cursor: default;
}

.countBadge {
  min-width: 30px;
  padding: 0 6px;
  color: var(--shell-subtitle);
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  background: var(--shell-badge-bg);
  border-radius: 10px;
}

.mainLayout {
  background: transparent;
}

.mainHeader {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  background: transparent;
  border-bottom: 1px solid var(--shell-border);
}

.mainContent {
  padding: 14px;
}
</style>

<template>
  <div class="workbench-shell">
    <aside class="sidebar">
      <div class="brand">智能体管理Matrix</div>
      <div class="agent-name">rrr</div>

      <nav class="menu-block">
        <RouterLink class="menu-item" :class="{active: activeKey === 'workbench'}" to="/workbench">
          <AppstoreOutlined />
          <span>工作台</span>
        </RouterLink>
      </nav>

      <section class="menu-section">
        <div class="section-title">数据资源</div>
        <RouterLink
          v-for="item in resourceMenus"
          :key="item.key"
          class="menu-item"
          :class="{active: activeKey === item.key}"
          :to="item.routePath"
        >
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
          <span class="count">{{ item.count }}</span>
        </RouterLink>
      </section>

      <section class="menu-section">
        <RouterLink
          v-for="item in managementMenus"
          :key="item.key"
          class="menu-item"
          :class="{active: activeKey === item.key}"
          :to="item.routePath"
        >
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </section>

      <div class="sidebar-footer">
        <div class="edit-state">已编辑 22 处</div>
        <div class="footer-actions">
          <Button size="small">放弃</Button>
          <Button size="small" type="primary">保存</Button>
        </div>
      </div>
    </aside>

    <main class="main-area">
      <div class="hero-bg" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ApiOutlined,
  AppstoreOutlined,
  ClearOutlined,
  DatabaseOutlined,
  FolderOpenOutlined,
  LinkOutlined,
  SettingOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';

interface ShellMenuItem {
  key: string;
  name: string;
  count?: number;
  routePath: string;
  icon: unknown;
}

defineProps<{
  activeKey: string;
}>();

const resourceMenus: ShellMenuItem[] = [
  {
    key: 'object-types',
    name: '对象类型',
    count: 39,
    routePath: '/object-types',
    icon: DatabaseOutlined,
  },
  {
    key: 'links',
    name: '链接类型',
    count: 6,
    routePath: '/workbench',
    icon: LinkOutlined,
  },
  {
    key: 'actions',
    name: '动作类型',
    count: 31,
    routePath: '/workbench',
    icon: ThunderboltOutlined,
  },
  {
    key: 'groups',
    name: '对象类型组',
    count: 17,
    routePath: '/workbench',
    icon: FolderOpenOutlined,
  },
];

const managementMenus: ShellMenuItem[] = [
  {
    key: 'agent-manage',
    name: '智能体管理',
    routePath: '/workbench',
    icon: SettingOutlined,
  },
  {
    key: 'data-clean',
    name: '数据清理',
    routePath: '/workbench',
    icon: ClearOutlined,
  },
  {
    key: 'knowledge',
    name: '知识库',
    routePath: '/workbench',
    icon: ApiOutlined,
  },
];
</script>

<style scoped lang="scss">
.workbench-shell {
  display: flex;
  min-height: 100vh;
  background: var(--shentu-color-bg-layout);
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  width: var(--shentu-sidebar-width);
  flex-direction: column;
  border-right: 1px solid var(--shentu-color-divider);
  background: var(--shentu-color-bg-container);
}

.brand {
  padding: 18px 16px 6px;
  color: var(--shentu-color-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.agent-name {
  padding: 0 16px 12px;
  color: var(--shentu-color-text);
  font-size: 14px;
  line-height: 22px;
}

.menu-block,
.menu-section {
  padding: 4px 8px;
}

.section-title {
  padding: 13px 12px 8px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.menu-item {
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border-radius: var(--shentu-radius-md);
  color: var(--shentu-color-text-secondary);
  font-size: 14px;
  line-height: 22px;

  :deep(.anticon) {
    color: inherit;
    font-size: 15px;
  }

  &:hover,
  &.active {
    background: var(--shentu-color-primary-soft);
    color: var(--shentu-color-primary);
  }
}

.count {
  min-width: 22px;
  margin-left: auto;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--shentu-color-bg-soft);
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 18px;
  text-align: center;
}

.menu-item.active .count {
  background: var(--shentu-color-bg-container);
  color: var(--shentu-color-primary);
}

.sidebar-footer {
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid var(--shentu-color-divider);
}

.edit-state {
  margin-bottom: 10px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.footer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.main-area {
  position: relative;
  width: calc(100% - var(--shentu-sidebar-width));
  min-height: 100vh;
  margin-left: var(--shentu-sidebar-width);
  overflow: hidden;
  padding: 18px 16px 32px;
}

.hero-bg {
  position: absolute;
  top: -96px;
  right: -40px;
  width: 520px;
  height: 210px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 70% 35%, rgb(11 102 253 / 16%), transparent 45%),
    linear-gradient(135deg, rgb(11 102 253 / 8%), transparent 70%);
  pointer-events: none;
}
</style>

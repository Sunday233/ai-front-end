<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink class="brand" to="/workbench">{{ summary?.workspaceName ?? '智能体管理Matrix' }}</RouterLink>

      <div class="agent-name">{{ summary?.agentName ?? 'rrr' }}</div>

      <nav class="sidebar-menu" aria-label="主导航">
        <RouterLink
          class="menu-item"
          :class="{active: activeKey === 'workbench'}"
          to="/workbench"
        >
          <DesktopOutlined />
          <span>工作台</span>
        </RouterLink>

        <div class="menu-group-title">数据资源</div>
        <RouterLink
          v-for="item in resourceMenus"
          :key="item.key"
          class="menu-item"
          :class="{active: activeKey === item.key}"
          :to="item.routePath"
        >
          <component :is="getMenuIcon(item.key)" />
          <span>{{ item.name }}</span>
          <span v-if="item.count !== undefined" class="matrix-count-badge">{{ item.count }}</span>
        </RouterLink>

        <RouterLink
          v-for="item in managementMenus"
          :key="item.key"
          class="menu-item"
          :class="{active: activeKey === item.key}"
          :to="item.routePath"
        >
          <component :is="getMenuIcon(item.key)" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="edited-row">
          <CheckCircleOutlined />
          <span>已编辑 <strong>22</strong> 处</span>
        </div>
        <div class="footer-actions">
          <a-button>放弃</a-button>
          <a-button type="primary">保存</a-button>
        </div>
      </div>
    </aside>

    <main class="shell-main">
      <div class="top-illustration" aria-hidden="true"></div>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ApartmentOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  ClearOutlined,
  ClusterOutlined,
  DesktopOutlined,
  LinkOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from '@ant-design/icons-vue';
import type {Component} from 'vue';
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {getWorkbenchSummary} from '@/services/workbench';
import type {WorkbenchResourceMenu, WorkbenchResourceType, WorkbenchSummary} from '@/types/workbench/model';

const summary = ref<WorkbenchSummary | null>(null);
const route = useRoute();

const menuIconMap: Record<WorkbenchResourceType, Component> = {
  workbench: DesktopOutlined,
  'object-type': ApartmentOutlined,
  'link-type': LinkOutlined,
  'action-type': ThunderboltOutlined,
  'object-type-group': AppstoreOutlined,
  'agent-management': ClusterOutlined,
  'data-cleaning': ClearOutlined,
  'knowledge-base': ToolOutlined,
};

const resourceKeys: WorkbenchResourceType[] = ['object-type', 'link-type', 'action-type', 'object-type-group'];
const managementKeys: WorkbenchResourceType[] = ['agent-management', 'data-cleaning', 'knowledge-base'];

const activeKey = computed<WorkbenchResourceType>(() => {
  if (route.path === '/object-types' || route.path === '/object-types/create') {
    return 'object-type';
  }

  return 'workbench';
});

const resourceMenus = computed(() => {
  return filterMenus(resourceKeys);
});

const managementMenus = computed(() => {
  if (summary.value?.permissions.canManageAgent === false) {
    return [];
  }

  return filterMenus(managementKeys);
});

const filterMenus = (keys: WorkbenchResourceType[]) => {
  return (summary.value?.menus ?? []).filter((item) => keys.includes(item.key));
};

const getMenuIcon = (key: WorkbenchResourceMenu['key']) => {
  return menuIconMap[key] ?? AppstoreOutlined;
};

onMounted(async () => {
  summary.value = await getWorkbenchSummary();
});
</script>

<style scoped lang="scss">
.app-shell {
  display: flex;
  min-height: 100vh;
  background: var(--matrix-color-page-bg);
}

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 3;
  display: flex;
  width: var(--matrix-sidebar-width);
  flex-direction: column;
  background: var(--matrix-color-panel-bg);
  border-right: 1px solid var(--matrix-color-divider);
}

.brand {
  display: flex;
  height: 42px;
  align-items: center;
  padding: 0 20px;
  color: var(--matrix-color-primary);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid var(--matrix-color-divider);
}

.agent-name {
  height: 48px;
  padding: 18px 22px 0;
  color: var(--matrix-color-text);
}

.sidebar-menu {
  flex: 1;
  padding: 0 6px;
}

.menu-group-title {
  padding: 16px 18px 8px;
  color: var(--matrix-color-text);
  font-size: 13px;
}

.menu-item {
  display: grid;
  height: 36px;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  color: var(--matrix-color-text);
  text-decoration: none;
  border-radius: var(--matrix-radius-md);

  &:hover {
    color: var(--matrix-color-primary);
    background: var(--matrix-color-primary-soft);
  }

  &.active {
    color: var(--matrix-color-primary);
    background: var(--matrix-color-primary-soft);
  }
}

.sidebar-footer {
  padding: 0 16px 20px;
}

.edited-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--matrix-color-text-secondary);

  strong {
    color: var(--matrix-color-primary);
    font-weight: 500;
  }
}

.footer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.shell-main {
  position: relative;
  min-height: 100vh;
  flex: 1;
  margin-left: var(--matrix-sidebar-width);
  padding: 18px 16px 32px 14px;
  overflow: hidden;
}

.top-illustration {
  position: absolute;
  top: 0;
  right: 0;
  width: 420px;
  height: 86px;
  pointer-events: none;
  background:
    linear-gradient(150deg, rgba(11, 102, 253, 0.08), rgba(255, 255, 255, 0) 72%),
    linear-gradient(20deg, rgba(255, 255, 255, 0.9), rgba(230, 244, 255, 0.28));
  clip-path: polygon(18% 0, 100% 0, 100% 100%, 0 100%);
}
</style>

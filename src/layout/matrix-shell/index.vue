<script setup lang="ts">
import { ResourceIcon } from "@/components";
import type { NavigationItem, ResourceType } from "@/types/matrix/model";
import { CheckCircleOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

interface MatrixShellProps {
  activeKey: ResourceType;
  breadcrumb: string[];
  menus: NavigationItem[];
}

const props = defineProps<MatrixShellProps>();

const route = useRoute();
const router = useRouter();

const dataMenus = computed(() =>
  props.menus.filter((item) =>
    [
      "objectType",
      "linkType",
      "actionType",
      "objectTypeGroup",
      "agentManage",
      "dataClean",
      "knowledge",
    ].includes(item.key),
  ),
);

const onMenuClick = (item: NavigationItem): void => {
  if (item.route && route.path !== item.route) {
    router.push(item.route);
  }
};
</script>

<template>
  <div class="matrix-shell">
    <aside class="sidebar">
      <div class="brand">智能体管理Matrix</div>
      <div class="agent-name">rrr</div>

      <button class="nav-item" :class="{ active: activeKey === 'workbench' }" type="button" @click="onMenuClick({ key: 'workbench', label: '工作台', route: '/workbench' })">
        <ResourceIcon type="workbench" />
        <span>工作台</span>
      </button>

      <div class="nav-section">数据资源</div>
      <button v-for="item in dataMenus" :key="item.key" class="nav-item" :class="{ active: activeKey === item.key }" type="button" @click="onMenuClick(item)">
        <ResourceIcon :type="item.key" />
        <span>{{ item.label }}</span>
        <span v-if="item.count !== undefined" class="count">{{ item.count }}</span>
      </button>

      <div class="sidebar-footer">
        <div class="edited"><CheckCircleOutlined /> 已编辑 <span>22</span> 处</div>
        <div class="footer-actions">
          <a-button>放弃</a-button>
          <a-button type="primary"><SaveOutlined /> 保存</a-button>
        </div>
      </div>
    </aside>

    <main class="content">
      <div class="top-visual" />
      <div class="breadcrumb">
        <template v-for="(item, index) in breadcrumb" :key="`${item}-${index}`">
          <span :class="{ current: index === breadcrumb.length - 1 }">{{ item }}</span>
          <span v-if="index < breadcrumb.length - 1" class="separator">|</span>
        </template>
      </div>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.matrix-shell {
  display: flex;
  min-height: 100vh;
  background: var(--matrix-page-bg);
}

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 5;
  width: var(--matrix-sidebar-width);
  background: var(--matrix-white);
  border-right: 1px solid var(--matrix-divider);
}

.brand {
  height: 44px;
  padding: 12px 24px;
  color: var(--matrix-primary);
  font-weight: 600;
  border-bottom: 1px solid var(--matrix-divider);
}

.agent-name {
  padding: 20px 24px 12px;
  color: var(--matrix-text);
}

.nav-section {
  padding: 18px 24px 8px;
  color: var(--matrix-text-secondary);
  font-size: 13px;
}

.nav-item {
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  height: 36px;
  margin: 4px 8px;
  padding: 0 16px;
  color: var(--matrix-text);
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  gap: 10px;
}

.nav-item:hover,
.nav-item.active {
  color: var(--matrix-primary);
  background: #e8f3ff;
}

.count {
  min-width: 28px;
  margin-left: auto;
  padding: 1px 6px;
  color: #344054;
  text-align: center;
  background: #f3f5f8;
  border: 1px solid var(--matrix-border);
  border-radius: 3px;
}

.sidebar-footer {
  position: absolute;
  right: 18px;
  bottom: 24px;
  left: 18px;
}

.edited {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--matrix-text-secondary);
  gap: 6px;
}

.edited span {
  color: var(--matrix-primary);
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.footer-actions :deep(.ant-btn) {
  flex: 1;
}

.content {
  position: relative;
  flex: 1;
  min-height: 100vh;
  margin-left: var(--matrix-sidebar-width);
  padding: 18px 24px 40px;
  overflow: hidden;
}

.top-visual {
  position: absolute;
  top: 0;
  right: 0;
  width: 520px;
  height: 110px;
  pointer-events: none;
  background:
    radial-gradient(circle at 64% 45%, rgb(11 102 253 / 18%), transparent 48px),
    linear-gradient(145deg, rgb(255 255 255 / 0%) 20%, rgb(255 255 255 / 70%) 42%, rgb(230 240 255 / 80%) 43%, rgb(255 255 255 / 0%) 62%);
  opacity: 0.9;
}

.breadcrumb {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 26px;
  margin-bottom: 12px;
  color: var(--matrix-text-muted);
  gap: 8px;
}

.breadcrumb .current {
  color: var(--matrix-text);
  font-weight: 500;
}

.separator {
  color: var(--matrix-border);
}
</style>

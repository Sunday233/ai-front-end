<template>
  <div class="app-shell">
    <aside class="app-shell__sidebar">
      <RouterLink class="app-shell__brand" to="/workbench">智能体管理Matrix</RouterLink>
      <div class="app-shell__agent">rrr</div>

      <nav class="app-shell__nav">
        <RouterLink class="app-shell__item" :class="{'app-shell__item--active': activeKey === 'workbench'}" to="/workbench">
          <DesktopOutlined />
          <span>工作台</span>
        </RouterLink>

        <div class="app-shell__section">数据资源</div>

        <RouterLink class="app-shell__item" :class="{'app-shell__item--active': activeKey === 'object-types'}" to="/object-types">
          <ApartmentOutlined />
          <span>对象类型</span>
          <span class="app-shell__badge">39</span>
        </RouterLink>
        <a class="app-shell__item" href="#link-types" aria-disabled="true">
          <LinkOutlined />
          <span>链接类型</span>
          <span class="app-shell__badge">6</span>
        </a>
        <a class="app-shell__item" href="#action-types" aria-disabled="true">
          <EditOutlined />
          <span>动作类型</span>
          <span class="app-shell__badge">31</span>
        </a>
        <a class="app-shell__item" href="#object-groups" aria-disabled="true">
          <BlockOutlined />
          <span>对象类型组</span>
          <span class="app-shell__badge">17</span>
        </a>
        <a v-if="showManage" class="app-shell__item" href="#agent-manage" aria-disabled="true">
          <SettingOutlined />
          <span>智能体管理</span>
        </a>
        <a v-if="showManage" class="app-shell__item" href="#data-clean" aria-disabled="true">
          <ClearOutlined />
          <span>数据清理</span>
        </a>
        <a class="app-shell__item" href="#knowledge" aria-disabled="true">
          <BookOutlined />
          <span>知识库</span>
        </a>
      </nav>

      <div class="app-shell__footer">
        <div class="app-shell__edited">
          <CheckCircleOutlined />
          <span>已编辑 <b>22</b> 处</span>
        </div>
        <div class="app-shell__actions">
          <Button>放弃</Button>
          <Button type="primary">保存</Button>
        </div>
      </div>
    </aside>

    <main class="app-shell__main">
      <div class="app-shell__hero" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ApartmentOutlined,
  BlockOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClearOutlined,
  DesktopOutlined,
  EditOutlined,
  LinkOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { Button } from "ant-design-vue";

interface AppShellProps {
  activeKey: "workbench" | "object-types";
  showManage?: boolean;
}

withDefaults(defineProps<AppShellProps>(), {
  showManage: true,
});
</script>

<style scoped lang="scss">
.app-shell {
  display: flex;
  min-height: 100vh;
  background: var(--matrix-bg-page);
}

.app-shell__sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: var(--matrix-sidebar-width);
  background: var(--matrix-bg-container);
  border-right: 1px solid var(--matrix-divider);
}

.app-shell__brand {
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 20px;
  color: var(--matrix-primary);
  font-weight: 600;
  border-bottom: 1px solid var(--matrix-divider);
}

.app-shell__agent {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 22px;
  color: var(--matrix-text);
}

.app-shell__nav {
  flex: 1;
  padding: 0 6px;
}

.app-shell__section {
  margin: 14px 16px 8px;
  color: var(--matrix-text-secondary);
  font-size: 13px;
}

.app-shell__item {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  column-gap: 8px;
  height: 36px;
  margin-bottom: 3px;
  padding: 0 16px;
  color: var(--matrix-text);
  border-radius: 6px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.app-shell__item:hover,
.app-shell__item--active {
  color: var(--matrix-primary);
  background: var(--matrix-primary-bg);
}

.app-shell__badge {
  min-width: 28px;
  padding: 0 6px;
  color: var(--matrix-text-secondary);
  text-align: center;
  background: var(--matrix-bg-subtle);
  border: 1px solid var(--matrix-border);
  border-radius: 3px;
}

.app-shell__footer {
  padding: 14px 16px 18px;
}

.app-shell__edited {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 0 18px 26px;
  color: var(--matrix-text-secondary);
  font-size: 13px;

  b {
    color: var(--matrix-primary);
    font-weight: 500;
  }
}

.app-shell__actions {
  display: flex;
  gap: 32px;
  align-items: center;
}

.app-shell__main {
  position: relative;
  flex: 1;
  min-height: 100vh;
  margin-left: var(--matrix-sidebar-width);
  overflow: hidden;
}

.app-shell__hero {
  position: absolute;
  inset: 0 0 auto 0;
  height: 110px;
  pointer-events: none;
  background:
    radial-gradient(circle at 78% 16%, rgb(11 102 253 / 16%) 0, transparent 46px),
    linear-gradient(160deg, transparent 58%, rgb(255 255 255 / 62%) 58%),
    linear-gradient(90deg, rgb(245 245 245 / 0%) 0, rgb(232 242 255 / 78%) 78%, rgb(245 245 245 / 0%) 100%);
}
</style>

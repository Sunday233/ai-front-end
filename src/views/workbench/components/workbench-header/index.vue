<template>
  <header class="workbench-header">
    <div class="workbench-header__breadcrumb">返回首页 <span>|</span> <DesktopOutlined /> 工作台</div>
    <div class="workbench-header__tools">
      <Input
        :value="keyword"
        class="workbench-header__search"
        placeholder="请输入关键词进行搜索"
        :maxlength="50"
        allow-clear
        @change="onInputChange"
      >
        <template #suffix>
          <span class="workbench-header__counter">{{ keyword.length }} / 50</span>
          <SearchOutlined />
        </template>
      </Input>
      <Dropdown trigger="click" placement="bottomRight">
        <Button v-if="canCreate" type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新建
        </Button>
        <template #overlay>
          <div class="workbench-header__popover">
            <CreateResourceMenu @select="$emit('create', $event)" />
          </div>
        </template>
      </Dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  DesktopOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { Button, Dropdown, Input } from "ant-design-vue";
import CreateResourceMenu from "../create-resource-menu/index.vue";

interface WorkbenchHeaderProps {
  keyword: string;
  canCreate: boolean;
}

defineProps<WorkbenchHeaderProps>();

const emit = defineEmits<{
  search: [keyword: string];
  create: [key: string];
}>();

const onInputChange = (event: Event) => {
  emit("search", (event.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
.workbench-header {
  position: relative;
  z-index: 1;
  padding: 16px 16px 0;
}

.workbench-header__breadcrumb {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 24px;
  margin-bottom: 22px;
  color: var(--matrix-text-muted);
}

.workbench-header__tools {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) auto;
  gap: 20px;
  align-items: center;
}

.workbench-header__search {
  height: 32px;
}

.workbench-header__counter {
  margin-right: 8px;
  color: var(--matrix-text-muted);
}

.workbench-header__popover {
  overflow: hidden;
  background: var(--matrix-bg-container);
  border-radius: 8px;
  box-shadow: var(--matrix-shadow-popover);
}
</style>

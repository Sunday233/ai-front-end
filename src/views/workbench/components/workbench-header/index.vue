<template>
  <header class="workbench-header">
    <div class="breadcrumb">返回首页&nbsp;&nbsp;|&nbsp;&nbsp;<DesktopOutlined /> 工作台</div>
    <div class="toolbar">
      <a-input
        :value="keyword"
        placeholder="请输入关键词进行搜索"
        allow-clear
        class="search-input"
        @change="onInputChange"
      >
        <template #suffix>
          <span class="word-count">{{ keyword.length }} / 50</span>
          <SearchOutlined />
        </template>
      </a-input>
      <div class="create-wrapper">
        <a-button v-if="canCreate" type="primary" @click="$emit('toggleCreateMenu')">
          <PlusOutlined />
          新建
        </a-button>
        <CreateResourceMenu
          v-if="menuOpen && summary"
          :options="summary.createOptions"
          :permissions="summary.permissions"
          @select="$emit('selectCreateRoute', $event)"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {DesktopOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons-vue';
import {computed} from 'vue';
import CreateResourceMenu from '@/views/workbench/components/create-resource-menu/index.vue';
import type {WorkbenchSummary} from '@/types/workbench/model';

const props = defineProps<{
  keyword: string;
  menuOpen: boolean;
  summary: WorkbenchSummary | null;
}>();

const emit = defineEmits<{
  'update:keyword': [value: string];
  toggleCreateMenu: [];
  selectCreateRoute: [routePath: string];
}>();

const canCreate = computed(() => {
  const permissions = props.summary?.permissions;

  return Boolean(
    permissions?.canCreateObjectType ||
      permissions?.canCreateLink ||
      permissions?.canCreateAction ||
      permissions?.canCreateObjectGroup,
  );
});

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:keyword', target.value.slice(0, 50));
};
</script>

<style scoped lang="scss">
.workbench-header {
  position: relative;
  z-index: 2;
}

.breadcrumb {
  display: flex;
  height: 34px;
  align-items: center;
  gap: 4px;
  color: var(--matrix-color-text-secondary);
}

.toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 20px;
}

.search-input {
  height: 30px;
}

.word-count {
  margin-right: 8px;
  color: var(--matrix-color-text-muted);
}

.create-wrapper {
  position: relative;
}
</style>

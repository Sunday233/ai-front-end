<template>
  <div class="workbench-header">
    <Input
      :value="keyword"
      :maxlength="50"
      class="search-input"
      placeholder="请输入关键词进行搜索"
      @change="onInput"
      @press-enter="$emit('search')"
    >
      <template #suffix>
        <span class="count">{{ keyword.length }} / 50</span>
        <SearchOutlined />
      </template>
    </Input>

    <Dropdown v-if="canCreate" trigger="click" placement="bottomRight">
      <Button class="create-button" type="primary">
        <PlusOutlined />
        新建
      </Button>
      <template #overlay>
        <CreateResourceMenu :permissions="permissions" @select="$emit('create-select')" />
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Button, Dropdown, Input } from 'ant-design-vue';
import { computed } from 'vue';
import type { WorkbenchCreatePermissions } from '@/types/workbench/model';
import CreateResourceMenu from '../create-resource-menu/index.vue';

const props = defineProps<{
  keyword: string;
  permissions: WorkbenchCreatePermissions;
}>();

const emit = defineEmits<{
  'update:keyword': [value: string];
  search: [];
  'create-select': [];
}>();

const canCreate = computed(() => {
  return (
    props.permissions.canCreateObjectType ||
    props.permissions.canCreateLink ||
    props.permissions.canCreateAction ||
    props.permissions.canCreateObjectGroup
  );
});

const onInput = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
.workbench-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 8px;
}

.search-input {
  flex: 1 1 auto;

  :deep(.ant-input-affix-wrapper) {
    height: 34px;
  }
}

.count {
  margin-right: 10px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
}

.create-button {
  display: inline-flex;
  height: 34px;
  align-items: center;
  gap: 4px;
  border-radius: var(--shentu-radius-sm);
}
</style>

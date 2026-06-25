<template>
  <div class="create-resource-menu">
    <RouterLink
      v-if="permissions.canCreateObjectType"
      class="resource-option"
      to="/object-types/create"
      @click="$emit('select')"
    >
      <span class="option-icon"><DatabaseOutlined /></span>
      <span>
        <strong>对象类型</strong>
        <small>创建对象类型及配套属性</small>
      </span>
    </RouterLink>
    <button v-if="permissions.canCreateLink" class="resource-option" type="button" @click="$emit('select')">
      <span class="option-icon"><LinkOutlined /></span>
      <span>
        <strong>链接类型</strong>
        <small>创建对象之间的关联关系</small>
      </span>
    </button>
    <button v-if="permissions.canCreateAction" class="resource-option" type="button" @click="$emit('select')">
      <span class="option-icon"><ThunderboltOutlined /></span>
      <span>
        <strong>动作类型</strong>
        <small>创建对象可执行的操作</small>
      </span>
    </button>
    <button v-if="permissions.canCreateObjectGroup" class="resource-option" type="button" @click="$emit('select')">
      <span class="option-icon"><FolderOpenOutlined /></span>
      <span>
        <strong>对象类型组</strong>
        <small>创建对象类型分组</small>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  DatabaseOutlined,
  FolderOpenOutlined,
  LinkOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons-vue';
import type { WorkbenchCreatePermissions } from '@/types/workbench/model';

defineProps<{
  permissions: WorkbenchCreatePermissions;
}>();

defineEmits<{
  select: [];
}>();
</script>

<style scoped lang="scss">
.create-resource-menu {
  width: 260px;
  padding: 8px;
  border: 1px solid var(--shentu-color-divider);
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-bg-container);
  box-shadow: var(--shentu-shadow-popover);
}

.resource-option {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 0;
  border-radius: var(--shentu-radius-md);
  background: transparent;
  color: var(--shentu-color-text);
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--shentu-color-primary-soft);
  }

  strong,
  small {
    display: block;
  }

  strong {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }

  small {
    color: var(--shentu-color-text-tertiary);
    font-size: 12px;
    line-height: 20px;
  }
}

.option-icon {
  display: inline-flex;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: var(--shentu-radius-md);
  background: var(--shentu-color-primary-soft);
  color: var(--shentu-color-primary);
  font-size: 16px;
}
</style>

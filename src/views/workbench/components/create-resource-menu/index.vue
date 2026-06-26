<template>
  <div class="create-menu" role="menu">
    <button
      v-for="option in visibleOptions"
      :key="option.key"
      class="create-menu-item"
      type="button"
      @click="$emit('select', option.routePath)"
    >
      <span class="menu-icon">
        <component :is="getOptionIcon(option.key)" />
      </span>
      <span class="option-copy">
        <span class="option-title">{{ option.title }}</span>
        <span class="option-description">{{ option.description }}</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ApartmentOutlined, AppstoreOutlined, LinkOutlined, ThunderboltOutlined} from '@ant-design/icons-vue';
import type {Component} from 'vue';
import {computed} from 'vue';
import type {WorkbenchCreateOption, WorkbenchCreatePermissions} from '@/types/workbench/model';

const props = defineProps<{
  options: WorkbenchCreateOption[];
  permissions: WorkbenchCreatePermissions;
}>();

defineEmits<{
  select: [routePath: string];
}>();

const iconMap: Record<WorkbenchCreateOption['key'], Component> = {
  'object-type': ApartmentOutlined,
  'link-type': LinkOutlined,
  'action-type': ThunderboltOutlined,
  'object-type-group': AppstoreOutlined,
};

const visibleOptions = computed(() => {
  return props.options.filter((option) => props.permissions[option.permissionKey]);
});

const getOptionIcon = (key: WorkbenchCreateOption['key']) => {
  return iconMap[key];
};
</script>

<style scoped lang="scss">
.create-menu {
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 8;
  width: 260px;
  padding: 14px 12px;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-divider);
  border-radius: var(--matrix-radius-lg);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);

  &::before {
    position: absolute;
    top: -7px;
    right: 10px;
    width: 14px;
    height: 14px;
    content: '';
    background: var(--matrix-color-panel-bg);
    border-top: 1px solid var(--matrix-color-divider);
    border-left: 1px solid var(--matrix-color-divider);
    transform: rotate(45deg);
  }
}

.create-menu-item {
  display: grid;
  width: 100%;
  grid-template-columns: 30px 1fr;
  gap: 10px;
  align-items: center;
  padding: 9px 6px;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: var(--matrix-radius-sm);

  &:hover {
    background: var(--matrix-color-row-alt);
  }
}

.menu-icon {
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-color-text);
  background: var(--matrix-color-row-alt);
}

.option-copy {
  display: grid;
  gap: 2px;
}

.option-title {
  color: var(--matrix-color-text);
  font-weight: 500;
}

.option-description {
  color: var(--matrix-color-text-muted);
  font-size: 12px;
}
</style>

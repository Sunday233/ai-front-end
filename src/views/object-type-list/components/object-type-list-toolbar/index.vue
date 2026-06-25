<template>
  <div class="toolbar">
    <Input
      :value="keyword"
      :maxlength="50"
      class="toolbar-search"
      placeholder="请输入类型名称、id或rid进行搜索"
      @change="onInput"
      @press-enter="$emit('search')"
    >
      <template #suffix>
        <span class="count">{{ keyword.length }} / 50</span>
        <SearchOutlined />
      </template>
    </Input>
    <Button class="icon-button" :loading="loading" aria-label="刷新" @click="$emit('refresh')">
      <ReloadOutlined />
    </Button>
    <Button class="icon-button" aria-label="设置">
      <SettingOutlined />
    </Button>
    <Button v-if="canCreate" type="primary" class="create-button" @click="$emit('create')">
      <PlusOutlined />
      创建
    </Button>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { Button, Input } from 'ant-design-vue';

defineProps<{
  keyword: string;
  loading: boolean;
  canCreate: boolean;
}>();

const emit = defineEmits<{
  'update:keyword': [value: string];
  search: [];
  refresh: [];
  create: [];
}>();

const onInput = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.toolbar-search {
  width: 310px;

  :deep(.ant-input-affix-wrapper) {
    height: 32px;
  }
}

.count {
  margin-right: 10px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
}

.icon-button,
.create-button {
  display: inline-flex;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: var(--shentu-radius-sm);
}

.icon-button {
  width: 32px;
  margin-left: 0;
}

.toolbar-search + .icon-button {
  margin-left: auto;
}

.create-button {
  gap: 4px;
}
</style>

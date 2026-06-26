<template>
  <div class="toolbar">
    <a-input
      :value="keyword"
      class="search"
      placeholder="请输入类型名称、id或rid进行搜索"
      allow-clear
      @change="onKeywordChange"
    >
      <template #suffix>
        <span class="word-count">{{ keyword.length }} / 50</span>
        <SearchOutlined />
      </template>
    </a-input>

    <div class="actions">
      <a-button :loading="loading" aria-label="刷新" @click="$emit('refresh')">
        <ReloadOutlined />
      </a-button>
      <a-button aria-label="设置">
        <SettingOutlined />
      </a-button>
      <a-button v-if="canCreate" type="primary" @click="$emit('create')">
        <PlusOutlined />
        创建
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PlusOutlined, ReloadOutlined, SearchOutlined, SettingOutlined} from '@ant-design/icons-vue';

defineProps<{
  keyword: string;
  loading: boolean;
  canCreate: boolean;
}>();

const emit = defineEmits<{
  'update:keyword': [value: string];
  refresh: [];
  create: [];
}>();

const onKeywordChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:keyword', target.value.slice(0, 50));
};
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 26px 12px 14px;
}

.search {
  width: 270px;
}

.word-count {
  margin-right: 8px;
  color: var(--matrix-color-text-muted);
}

.actions {
  display: flex;
  gap: 10px;
}
</style>

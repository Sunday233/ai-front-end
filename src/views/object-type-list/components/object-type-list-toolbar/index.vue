<template>
  <div class="object-list-toolbar">
    <Input
      :value="keyword"
      class="object-list-toolbar__search"
      placeholder="请输入类型名称、id或rid进行搜索"
      :maxlength="50"
      allow-clear
      @change="onInputChange"
    >
      <template #suffix>
        <span>{{ keyword.length }} / 50</span>
        <SearchOutlined />
      </template>
    </Input>
    <div class="object-list-toolbar__actions">
      <Button :loading="loading" @click="$emit('refresh')">
        <template #icon>
          <ReloadOutlined />
        </template>
      </Button>
      <Button>
        <template #icon>
          <SettingOutlined />
        </template>
      </Button>
      <Button v-if="canCreate" type="primary" @click="$emit('create')">
        <template #icon>
          <PlusOutlined />
        </template>
        创建
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { Button, Input } from "ant-design-vue";

interface ObjectTypeListToolbarProps {
  keyword: string;
  loading: boolean;
  canCreate: boolean;
}

defineProps<ObjectTypeListToolbarProps>();

const emit = defineEmits<{
  search: [keyword: string];
  refresh: [];
  create: [];
}>();

const onInputChange = (event: Event) => {
  emit("search", (event.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
.object-list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0 14px;
}

.object-list-toolbar__search {
  width: 272px;
  height: 32px;

  :deep(.ant-input-suffix) {
    color: var(--matrix-text-muted);
  }
}

.object-list-toolbar__actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>

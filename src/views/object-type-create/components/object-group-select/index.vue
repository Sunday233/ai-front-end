<template>
  <div class="group-select">
    <button class="group-chip" type="button" @click="open = !open">
      <template v-if="selectedGroup">
        <AppstoreOutlined />
        {{ selectedGroup.name }}
        <span class="matrix-count-badge">{{ selectedGroup.count }}</span>
        <CloseCircleOutlined @click.stop="$emit('select', null)" />
      </template>
      <template v-else>
        添加对象组
        <DownOutlined />
      </template>
    </button>
    <div v-if="open" class="group-menu">
      <button v-for="group in groups" :key="group.id" type="button" @click="onSelect(group)">
        <AppstoreOutlined />
        <span>{{ group.name }}</span>
        <span class="matrix-count-badge">{{ group.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {AppstoreOutlined, CloseCircleOutlined, DownOutlined} from '@ant-design/icons-vue';
import {ref} from 'vue';
import type {ObjectGroupOption} from '@/types/object-type-create/model';

defineProps<{
  groups: ObjectGroupOption[];
  selectedGroup: ObjectGroupOption | null;
}>();

const emit = defineEmits<{
  select: [group: ObjectGroupOption | null];
}>();

const open = ref(false);

const onSelect = (group: ObjectGroupOption) => {
  emit('select', group);
  open.value = false;
};
</script>

<style scoped lang="scss">
.group-select {
  position: relative;
  display: inline-flex;
}

.group-chip,
.group-menu button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--matrix-color-primary);
  cursor: pointer;
  background: transparent;
  border: 0;
}

.group-menu {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 4;
  min-width: 150px;
  padding: 8px;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-divider);
  border-radius: var(--matrix-radius-md);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  button {
    width: 100%;
    padding: 8px;
  }
}
</style>

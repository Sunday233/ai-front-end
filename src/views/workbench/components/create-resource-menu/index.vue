<template>
  <div class="create-resource-menu">
    <button
      v-for="item in items"
      :key="item.key"
      class="create-resource-menu__item"
      type="button"
      @click="$emit('select', item.key)"
    >
      <span class="create-resource-menu__icon">
        <component :is="item.icon" />
      </span>
      <span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.description }}</small>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ApartmentOutlined,
  ApiOutlined,
  BlockOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";

defineEmits<{
  select: [key: string];
}>();

const items = [
  {
    key: "objectType",
    title: "对象类型",
    description: "对象类型可以是实体或者是事件",
    icon: ApartmentOutlined,
  },
  {
    key: "linkType",
    title: "链接类型",
    description: "链接类型可以链接两个对象类型",
    icon: ApiOutlined,
  },
  {
    key: "actionType",
    title: "动作类型",
    description: "允许用户将数据写入动态智能体",
    icon: EditOutlined,
  },
  {
    key: "objectGroup",
    title: "对象类型组",
    description: "对象类型组可以包含多个对象类型",
    icon: BlockOutlined,
  },
];
</script>

<style scoped lang="scss">
.create-resource-menu {
  width: 260px;
  padding: 12px 0;
}

.create-resource-menu__item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 10px;
  width: 100%;
  padding: 10px 18px;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;

  &:hover {
    background: var(--matrix-bg-subtle);
  }

  strong,
  small {
    display: block;
  }

  strong {
    color: var(--matrix-text);
    font-weight: 500;
  }

  small {
    margin-top: 3px;
    color: var(--matrix-text-muted);
    font-size: 12px;
    line-height: 18px;
  }
}

.create-resource-menu__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--matrix-text-secondary);
  background: var(--matrix-bg-subtle);
}
</style>

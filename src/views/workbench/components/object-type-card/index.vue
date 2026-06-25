<template>
  <article class="object-card">
    <div class="card-head">
      <div class="object-icon">
        <UserOutlined />
      </div>
      <button class="more-button" type="button" aria-label="更多操作">
        <MoreOutlined />
      </button>
      <StarFilled v-if="card.favorite" class="star" />
    </div>
    <h3>{{ card.name }}</h3>
    <p>{{ card.description }}</p>
    <div class="meta">{{ card.instanceCount }}条实例 | 应用-{{ card.appCount }}次</div>
    <div class="tag-row">
      <span v-for="tag in card.tags" :key="tag.label" class="object-tag">
        <DatabaseOutlined />
        {{ tag.label }}
        <em>{{ tag.count }}</em>
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  DatabaseOutlined,
  MoreOutlined,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { WorkbenchObjectTypeCard } from '@/types/workbench/model';

defineProps<{
  card: WorkbenchObjectTypeCard;
}>();
</script>

<style scoped lang="scss">
.object-card {
  min-height: 182px;
  padding: 16px;
  border: 1px solid var(--shentu-color-divider);
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-bg-container);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.object-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: var(--shentu-radius-lg);
  background: var(--shentu-color-primary);
  color: var(--shentu-color-bg-container);
  font-size: 22px;
}

.more-button {
  display: inline-flex;
  width: 24px;
  height: 24px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--shentu-radius-sm);
  background: transparent;
  color: var(--shentu-color-text-tertiary);
  cursor: pointer;

  &:hover {
    background: var(--shentu-color-bg-soft);
    color: var(--shentu-color-primary);
  }
}

.star {
  color: var(--shentu-color-warning);
  font-size: 16px;
}

h3 {
  margin: 12px 0 4px;
  color: var(--shentu-color-text);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

p,
.meta {
  margin: 0;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.meta {
  margin-top: 4px;
}

.tag-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--shentu-color-divider);
}

.object-tag {
  display: inline-flex;
  max-width: 180px;
  align-items: center;
  gap: 4px;
  color: var(--shentu-color-primary);
  font-size: 12px;
  line-height: 20px;

  em {
    color: var(--shentu-color-text-tertiary);
    font-style: normal;
  }
}
</style>

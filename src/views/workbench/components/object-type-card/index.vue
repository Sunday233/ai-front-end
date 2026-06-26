<template>
  <article class="object-card">
    <button class="favorite" type="button" :aria-pressed="card.favorite">
      <StarFilled v-if="card.favorite" />
      <StarOutlined v-else />
    </button>
    <div class="card-main">
      <span class="matrix-icon-tile"><TeamOutlined /></span>
      <div>
        <h3>{{ card.name }}</h3>
        <p class="metrics"><strong>{{ card.instanceCount }}</strong>条实例 <span>|</span> {{ card.appText }}</p>
        <p v-if="card.description" class="description">{{ card.description }}</p>
      </div>
    </div>
    <div class="tag-row">
      <span v-for="tag in card.tags" :key="tag.id" class="card-tag">
        <AppstoreOutlined />
        <span class="tag-label">{{ tag.label }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </span>
      <button class="more" type="button" aria-label="更多操作">
        <EllipsisOutlined />
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import {AppstoreOutlined, EllipsisOutlined, StarFilled, StarOutlined, TeamOutlined} from '@ant-design/icons-vue';
import type {WorkbenchObjectTypeCard} from '@/types/workbench/model';

defineProps<{
  card: WorkbenchObjectTypeCard;
}>();
</script>

<style scoped lang="scss">
.object-card {
  position: relative;
  display: grid;
  min-height: 184px;
  overflow: hidden;
  background: var(--matrix-color-panel-bg);
  border: 1px solid var(--matrix-color-divider);
  border-radius: var(--matrix-radius-lg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.favorite {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-color-warning);
  cursor: pointer;
  background: var(--matrix-color-row-alt);
  border: 0;
  border-radius: var(--matrix-radius-sm);
}

.card-main {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  padding: 14px 14px 10px;
}

h3 {
  margin: 2px 0 8px;
  font-size: 16px;
  font-weight: 500;
}

.metrics {
  margin: 0;
  color: var(--matrix-color-text-secondary);

  strong {
    color: var(--matrix-color-primary);
    font-weight: 500;
  }

  span {
    margin: 0 12px;
    color: var(--matrix-color-text-muted);
  }
}

.description {
  margin: 14px 0 0;
  color: var(--matrix-color-text-secondary);
}

.tag-row {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 8px;
  align-self: end;
  padding: 8px 14px;
  border-top: 1px solid var(--matrix-color-divider);
}

.card-tag {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 4px;
  color: var(--matrix-color-text-secondary);
  white-space: nowrap;
}

.card-tag :deep(.anticon) {
  color: var(--matrix-color-primary);
}

.tag-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-count {
  display: inline-flex;
  min-width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  color: var(--matrix-color-text-muted);
  font-size: 12px;
  background: var(--matrix-color-table-head);
  border-radius: var(--matrix-radius-sm);
}

.more {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  background: transparent;
  border: 0;
}
</style>

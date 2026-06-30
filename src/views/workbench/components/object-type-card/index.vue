<template>
  <article class="object-card">
    <button class="object-card__star" type="button" :aria-label="card.favorite ? '已收藏' : '收藏'">
      <StarFilled />
    </button>
    <div class="object-card__main">
      <span class="object-card__icon">
        <TeamOutlined />
      </span>
      <div>
        <h3>{{ card.name }}</h3>
        <p>
          <a>{{ card.instanceCount }}条实例</a>
          <span>|</span>
          <span>{{ card.appName }}</span>
        </p>
      </div>
    </div>
    <div class="object-card__description">{{ card.description || '\u00A0' }}</div>
    <footer class="object-card__footer">
      <span v-for="group in card.groups" :key="group.id" class="object-card__group">
        <ApartmentOutlined />
        <span>{{ group.name }}</span>
        <em>{{ group.count }}</em>
      </span>
      <button class="object-card__more" type="button" aria-label="更多操作">
        <EllipsisOutlined />
      </button>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { WorkbenchObjectTypeCard } from "@/types/workbench/model";
import {
  ApartmentOutlined,
  EllipsisOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons-vue";

interface ObjectTypeCardProps {
  card: WorkbenchObjectTypeCard;
}

defineProps<ObjectTypeCardProps>();
</script>

<style scoped lang="scss">
.object-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 182px;
  overflow: hidden;
  background: var(--matrix-bg-container);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 6%);
}

.object-card__main {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  padding: 18px 14px 0;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  p {
    display: flex;
    gap: 10px;
    margin: 0;
    color: var(--matrix-text-secondary);
  }

  a {
    color: var(--matrix-primary);
  }
}

.object-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  font-size: 22px;
  background: var(--matrix-primary);
  border-radius: 3px;
}

.object-card__description {
  min-height: 48px;
  padding: 10px 14px 0;
  color: var(--matrix-text-secondary);
}

.object-card__footer {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 48px;
  margin-top: auto;
  padding: 0 14px;
  border-top: 1px solid var(--matrix-divider);
}

.object-card__group {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  min-width: 0;
  color: var(--matrix-text-secondary);
  font-size: 12px;

  > span {
    max-width: 116px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(.anticon) {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    color: #fff;
    background: var(--matrix-primary);
    border-radius: 2px;
  }

  em {
    min-width: 20px;
    padding: 0 5px;
    color: var(--matrix-text-muted);
    font-style: normal;
    text-align: center;
    background: var(--matrix-bg-subtle);
    border-radius: 2px;
  }
}

.object-card__more,
.object-card__star {
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.object-card__more {
  margin-left: auto;
  color: var(--matrix-text-secondary);
}

.object-card__star {
  position: absolute;
  top: 16px;
  right: 14px;
  color: var(--matrix-warning);
}
</style>

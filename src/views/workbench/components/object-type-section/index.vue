<template>
  <section class="object-section">
    <div class="section-header">
      <h2>{{ title }} <span>{{ count }}</span></h2>
      <RouterLink to="/object-types">查看全部</RouterLink>
    </div>
    <div class="card-grid" :class="{compact}">
      <ObjectTypeCard v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkbenchObjectTypeCard } from '@/types/workbench/model';
import ObjectTypeCard from '../object-type-card/index.vue';

defineProps<{
  title: string;
  count: number;
  cards: WorkbenchObjectTypeCard[];
  compact?: boolean;
}>();
</script>

<style scoped lang="scss">
.object-section {
  position: relative;
  z-index: 1;
  margin-top: 18px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h2 {
    margin: 0;
    color: var(--shentu-color-text);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  span {
    color: var(--shentu-color-primary);
  }

  a {
    color: var(--shentu-color-primary);
    font-size: 14px;
    line-height: 22px;
  }
}

.card-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.card-grid.compact {
  max-width: 340px;
}
</style>

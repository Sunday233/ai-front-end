<template>
  <section class="object-section">
    <div class="section-title">
      <h2>{{ title }}</h2>
      <span class="matrix-count-badge">{{ cards.length }}</span>
      <RouterLink class="view-all" to="/object-types">查看全部</RouterLink>
    </div>
    <div class="cards-grid" :class="{recent: variant === 'recent'}">
      <ObjectTypeCard v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ObjectTypeCard from '@/views/workbench/components/object-type-card/index.vue';
import type {WorkbenchObjectTypeCard} from '@/types/workbench/model';

defineProps<{
  title: string;
  cards: WorkbenchObjectTypeCard[];
  variant?: 'recent' | 'favorite';
}>();
</script>

<style scoped lang="scss">
.object-section {
  position: relative;
  z-index: 1;
  margin-top: 14px;
}

.section-title {
  display: flex;
  height: 28px;
  align-items: center;
  gap: 8px;
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.view-all {
  margin-left: auto;
  color: var(--matrix-color-primary);
  font-size: 13px;
  text-decoration: none;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 8px;

  &.recent {
    width: min(340px, 100%);
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <ConsoleLayout>
    <RouterView />
  </ConsoleLayout>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';

import ConsoleLayout from '@/layout/console-layout.vue';
</script>

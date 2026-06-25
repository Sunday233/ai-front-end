<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const theme = {
  token: {
    colorPrimary: '#0B66FD',
    colorSuccess: '#24C366',
    colorError: '#FF4D4F',
    colorWarning: '#FFAE00',
    borderRadius: 4,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  },
};
</script>

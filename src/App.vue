<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";

const theme = {
  token: {
    colorPrimary: "#0b66fd",
    colorText: "#262626",
    colorTextSecondary: "#595959",
    colorBorder: "#d9dce2",
    borderRadius: 4,
    fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
  },
};
</script>

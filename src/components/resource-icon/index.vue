<script setup lang="ts">
import type { ResourceType } from "@/types/matrix/model";
import {
  ApartmentOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BranchesOutlined,
  ClearOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  FolderOutlined,
  RobotOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";

interface ResourceIconProps {
  type?: ResourceType | "object";
}

withDefaults(defineProps<ResourceIconProps>(), {
  type: "object",
});
</script>

<template>
  <span class="resource-icon">
    <DesktopOutlined v-if="type === 'workbench'" />
    <ApartmentOutlined v-else-if="type === 'objectType'" />
    <BranchesOutlined v-else-if="type === 'linkType'" />
    <ApiOutlined v-else-if="type === 'actionType'" />
    <AppstoreOutlined v-else-if="type === 'objectTypeGroup'" />
    <RobotOutlined v-else-if="type === 'agentManage'" />
    <ClearOutlined v-else-if="type === 'dataClean'" />
    <FolderOutlined v-else-if="type === 'knowledge'" />
    <DatabaseOutlined v-else-if="type === 'object'" />
    <TeamOutlined v-else />
  </span>
</template>

<style scoped lang="scss">
.resource-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  line-height: 1;
}
</style>

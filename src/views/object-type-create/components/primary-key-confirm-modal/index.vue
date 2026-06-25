<template>
  <Modal
    :open="open"
    title="确认修改主键"
    ok-text="确认"
    cancel-text="取消"
    @ok="$emit('confirm')"
    @cancel="$emit('cancel')"
  >
    <p class="confirm-text">确定将主键从 {{ currentKey }} 修改为 {{ nextKey }}？修改后可能影响依赖该主键的对象实例。</p>
  </Modal>
</template>

<script setup lang="ts">
import { Modal } from 'ant-design-vue';

defineProps<{
  open: boolean;
  currentKey: string;
  nextKey: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss">
.confirm-text {
  margin: 0;
  color: var(--shentu-color-text-secondary);
  font-size: 14px;
  line-height: 22px;
}
</style>

<template>
  <a-modal
    :open="open"
    title="确认修改主键"
    ok-text="确认修改"
    cancel-text="取消"
    @ok="$emit('confirm')"
    @cancel="$emit('cancel')"
  >
    <p>修改主键会替换原有主键配置，并可能影响依赖该字段的对象实例。请确认是否继续。</p>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

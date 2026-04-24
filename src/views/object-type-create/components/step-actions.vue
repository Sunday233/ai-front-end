<template>
  <div class="stepWrap">
    <a-form layout="vertical" class="formWrap">
      <a-form-item label="选择生成的操作类型">
        <a-checkbox-group v-model:value="actionsModel" :options="actionOptions" />
      </a-form-item>

      <a-form-item label="配置可执行操作的用户/用户组">
        <a-select v-model:value="actorGroupModel" :options="groupOptions" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

import type {ActionConfig} from '@/types/object-type/api';

interface Props {
  form: ActionConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:form': [form: ActionConfig];
}>();

const actionsModel = computed({
  get: () => props.form.actions,
  set: (value: string[]) => {
    emit('update:form', {
      ...props.form,
      actions: value,
    });
  },
});

const actorGroupModel = computed({
  get: () => props.form.actorGroup,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      actorGroup: value,
    });
  },
});

const actionOptions = [
  {
    label: '创建人员',
    value: 'create-user',
  },
  {
    label: '修改人员',
    value: 'edit-user',
  },
  {
    label: '删除人员',
    value: 'delete-user',
  },
];

const groupOptions = [
  {
    label: '用户组1',
    value: '用户组1',
  },
  {
    label: '用户组2',
    value: '用户组2',
  },
  {
    label: '管理员组',
    value: '管理员组',
  },
];
</script>

<style scoped lang="scss">
.stepWrap {
  display: flex;
}

.formWrap {
  width: 100%;
  max-width: 520px;
}
</style>

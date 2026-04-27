<template>
  <div class="stepWrap">
    <div class="targetRow">
      <span class="targetLabel">目标：</span>
      <span class="targetIcon">◉</span>
    </div>

    <a-form :label-col="{style: {width: '92px'}}" class="formWrap" layout="horizontal">
      <a-form-item label="对象类型名称">
        <a-input v-model:value="objectTypeNameModel" placeholder="请输入对象类型名称" />
      </a-form-item>
      <a-form-item label="别名">
        <a-input v-model:value="aliasModel" placeholder="请输入别名" />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea
          v-model:value="descriptionModel"
          :maxlength="30"
          :rows="4"
          placeholder="请输入描述内容"
          show-count
        />
      </a-form-item>
      <a-form-item label="所在对象组">
        <a-checkbox-group v-model:value="groupsModel" :options="groupOptions" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

import type {MetadataConfig} from '@/types/object-type/api';

interface Props {
  form: MetadataConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:form': [form: MetadataConfig];
}>();

const objectTypeNameModel = computed({
  get: () => props.form.objectTypeName,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      objectTypeName: value,
    });
  },
});

const aliasModel = computed({
  get: () => props.form.alias,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      alias: value,
    });
  },
});

const descriptionModel = computed({
  get: () => props.form.description,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      description: value,
    });
  },
});

const groupsModel = computed({
  get: () => props.form.groups,
  set: (value: string[]) => {
    emit('update:form', {
      ...props.form,
      groups: value,
    });
  },
});

const groupOptions = [
  {label: '选项1', value: '选项1'},
  {label: '选项2', value: '选项2'},
  {label: '选项3', value: '选项3'},
];
</script>

<style scoped lang="scss">
.stepWrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.targetRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.targetLabel {
  color: var(--shell-subtitle);
}

.targetIcon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  color: var(--ant-color-primary);
  font-size: 12px;
  border: 1px solid var(--shell-border);
  border-radius: 4px;
}

.formWrap {
  width: 100%;
  max-width: 620px;
}
</style>

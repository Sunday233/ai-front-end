<template>
  <div class="stepWrap">
    <div class="sourceSelectRow">
      <span class="rowLabel">数据源：</span>
      <div class="sourceRow">
        <div
          :class="['sourceCard', props.form.mode === 'new-schema' ? 'sourceCardActive' : '']"
          @click="onSelectMode('new-schema')"
        >
          <div class="sourceTitle">+ 新建基础库</div>
          <p>内含不存在数据集，为此对象类型创建一个全新的数据集并进行后续操作。</p>
        </div>
        <div
          :class="['sourceCard', props.form.mode === 'new-table' ? 'sourceCardActive' : '']"
          @click="onSelectMode('new-table')"
        >
          <div class="sourceTitle">新增数据集</div>
          <p>选择一个已存在数据集作为此对象类型的来源。</p>
        </div>
      </div>
    </div>

    <a-form :label-col="{style: {width: '82px'}}" class="formWrap" layout="horizontal">
      <a-form-item label="数据集名称">
        <a-input v-model:value="dataSourceNameModel" placeholder="请输入数据集名称" />
      </a-form-item>
      <a-form-item label="保存位置">
        <div class="savePathRow">
          <a-select
            v-model:value="savePathModel"
            :options="pathOptions"
            class="savePathSelect"
            placeholder="请选择保存位置"
          />
          <a-button class="pathButton" title="目录定位" type="text">↗</a-button>
          <a-button class="pathButton" title="目录切换" type="text">↘</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

import type {DataSourceMode, SourceConfig} from '@/types/object-type/api';

interface Props {
  form: SourceConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:form': [form: SourceConfig];
}>();

const dataSourceNameModel = computed({
  get: () => props.form.dataSourceName,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      dataSourceName: value,
    });
  },
});

const savePathModel = computed({
  get: () => props.form.savePath,
  set: (value: string) => {
    emit('update:form', {
      ...props.form,
      savePath: value,
    });
  },
});

const pathOptions = [
  {
    label: '对象类型根目录',
    value: '对象类型根目录',
  },
  {
    label: '业务资产目录',
    value: '业务资产目录',
  },
  {
    label: '公共目录',
    value: '公共目录',
  },
];

const onSelectMode = (mode: DataSourceMode) => {
  emit('update:form', {
    ...props.form,
    mode,
  });
};
</script>

<style scoped lang="scss">
.stepWrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sourceSelectRow {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.rowLabel {
  color: var(--shell-subtitle);
  line-height: 38px;
}

.sourceRow {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.sourceCard {
  padding: 16px;
  cursor: pointer;
  background: #f7f9fc;
  border: 1px solid var(--shell-border);
  border-radius: 8px;
}

.sourceCardActive {
  border-color: var(--ant-color-primary);
  box-shadow: 0 0 0 1px rgb(22 119 255 / 18%);
}

.sourceTitle {
  margin-bottom: 8px;
  color: var(--ant-color-primary);
  font-weight: 600;
}

.sourceCard p {
  margin: 0;
  color: var(--shell-subtitle);
  line-height: 1.5;
}

.formWrap {
  max-width: 640px;
}

.savePathRow {
  display: flex;
  gap: 2px;
  align-items: center;
}

.savePathSelect {
  width: 100%;
}

.pathButton {
  color: var(--shell-subtitle);
}
</style>

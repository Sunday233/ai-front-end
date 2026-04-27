<template>
  <div class="stepWrap">
    <div class="keyRow">
      <a-form :label-col="{style: {width: '56px'}}" class="keyForm" layout="horizontal">
        <a-form-item label="主键">
          <a-select v-model:value="primaryKeyModel" :options="attributeNameOptions" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{style: {width: '56px'}}" class="keyForm" layout="horizontal">
        <a-form-item label="标题">
          <a-select v-model:value="labelKeyModel" :options="attributeNameOptions" />
        </a-form-item>
      </a-form>
    </div>

    <div class="attrPanel">
      <div class="sourceColumn">
        <div class="columnTitle">源数据</div>
        <div v-for="item in sourceData" :key="item.id" class="sourceItem">{{ item.label }}</div>
        <a-button class="addButton" @click="emit('add-attribute')">+ 添加属性</a-button>
      </div>

      <div class="nameColumn">
        <div class="columnTitle">属性名称</div>
        <div v-for="item in props.form.attributes" :key="item.id" class="nameRow">
          <a-select
            :value="item.type"
            :options="typeOptions"
            class="typeSelect"
            @change="(value) => onTypeChange(item.id, value)"
          />
          <a-input
            :value="item.name"
            class="nameInput"
            placeholder="请输入属性名称"
            @update:value="(value) => onNameChange(item.id, value)"
          />
          <a-tag v-if="item.role === 'primary'" color="blue">主键</a-tag>
          <a-tag v-else-if="item.role === 'label'" color="green">标题键</a-tag>
          <a-button v-else danger type="text" @click="emit('remove-attribute', item.id)">删除</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

import type {AttributeConfig, AttributeType} from '@/types/object-type/api';

interface Props {
  form: AttributeConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:form': [form: AttributeConfig];
  'add-attribute': [];
  'remove-attribute': [attributeId: string];
}>();

const emitUpdatedForm = (nextForm: AttributeConfig) => {
  emit('update:form', nextForm);
};

const sourceData = computed(() =>
  props.form.attributes.map((item, index) => ({
    id: `${item.id}-${index}`,
    label: item.name.trim().length > 0 ? item.name : `字段${index + 1}`,
  }))
);

const attributeNameOptions = computed(() =>
  props.form.attributes.map((item, index) => ({
    label: item.name.trim().length > 0 ? item.name : `字段${index + 1}`,
    value: item.name.trim().length > 0 ? item.name : item.id,
  }))
);

const primaryKeyModel = computed({
  get: () => props.form.primaryKey,
  set: (value: string) => {
    emitUpdatedForm({
      ...props.form,
      primaryKey: value,
    });
  },
});

const labelKeyModel = computed({
  get: () => props.form.labelKey,
  set: (value: string) => {
    emitUpdatedForm({
      ...props.form,
      labelKey: value,
    });
  },
});

const onTypeChange = (attributeId: string, value: string | number) => {
  const nextAttributes = props.form.attributes.map((item) => {
    if (item.id !== attributeId) {
      return item;
    }
    return {
      ...item,
      type: String(value) as AttributeType,
    };
  });

  emitUpdatedForm({
    ...props.form,
    attributes: nextAttributes,
  });
};

const onNameChange = (attributeId: string, value: string) => {
  const currentAttribute = props.form.attributes.find((item) => item.id === attributeId);
  const nextAttributes = props.form.attributes.map((item) => {
    if (item.id !== attributeId) {
      return item;
    }
    return {
      ...item,
      name: value,
    };
  });

  let nextPrimaryKey = props.form.primaryKey;
  let nextLabelKey = props.form.labelKey;
  if (currentAttribute?.name === props.form.primaryKey) {
    nextPrimaryKey = value;
  }
  if (currentAttribute?.name === props.form.labelKey) {
    nextLabelKey = value;
  }

  emitUpdatedForm({
    ...props.form,
    primaryKey: nextPrimaryKey,
    labelKey: nextLabelKey,
    attributes: nextAttributes,
  });
};

const typeOptions = [
  {
    label: '字符串',
    value: 'string',
  },
  {
    label: '日期',
    value: 'date',
  },
  {
    label: '布尔',
    value: 'boolean',
  },
  {
    label: '数字',
    value: 'number',
  },
];
</script>

<style scoped lang="scss">
.stepWrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.keyRow {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.keyForm {
  max-width: 360px;
}

.attrPanel {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 14px;
}

.sourceColumn,
.nameColumn {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.columnTitle {
  color: var(--shell-subtitle);
  font-size: 12px;
}

.sourceItem,
.nameRow {
  min-height: 36px;
  padding: 6px 8px;
  background: #fafbfe;
  border: 1px solid var(--shell-border);
  border-radius: 8px;
}

.sourceItem {
  display: flex;
  align-items: center;
  color: var(--shell-title);
}

.nameRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.addButton {
  align-self: flex-start;
}

.typeSelect {
  width: 120px;
}

.nameInput {
  width: 100%;
}
</style>

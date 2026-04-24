<template>
  <div class="stepWrap">
    <div class="keyRow">
      <a-form layout="vertical" class="keyForm">
        <a-form-item label="主键">
          <a-input v-model:value="primaryKeyModel" />
        </a-form-item>
      </a-form>
      <a-form layout="vertical" class="keyForm">
        <a-form-item label="标题">
          <a-input v-model:value="labelKeyModel" />
        </a-form-item>
      </a-form>
    </div>

    <div class="attrHeader">
      <span>源数据</span>
      <span>属性名称</span>
    </div>

    <div class="attrList">
      <div v-for="item in props.form.attributes" :key="item.id" class="attrRow">
        <a-space>
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
          <a-button v-else type="text" danger @click="emit('remove-attribute', item.id)">删除</a-button>
        </a-space>
      </div>
    </div>

    <a-button @click="emit('add-attribute')">+ 添加属性</a-button>
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
  const nextAttributes = props.form.attributes.map((item) => {
    if (item.id !== attributeId) {
      return item;
    }
    return {
      ...item,
      name: value,
    };
  });

  emitUpdatedForm({
    ...props.form,
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

.attrHeader {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 8px;
  color: var(--shell-subtitle);
  font-size: 12px;
}

.attrList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attrRow {
  padding: 8px;
  background: #fafbfe;
  border: 1px solid var(--shell-border);
  border-radius: 8px;
}

.typeSelect {
  width: 120px;
}

.nameInput {
  width: 260px;
}
</style>

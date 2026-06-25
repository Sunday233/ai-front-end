<template>
  <section class="metadata-step page-panel">
    <Form class="metadata-form" layout="horizontal" :label-col="{span: 7}" :wrapper-col="{span: 17}">
      <FormItem label="图标：">
        <button class="icon-picker" type="button" aria-label="选择图标">
          <DatabaseOutlined />
        </button>
      </FormItem>
      <FormItem required label="对象类型显示名称：" :validate-status="nameError ? 'error' : undefined" :help="nameError">
        <Input v-model:value="model.objectTypeName" :maxlength="64" placeholder="请输入对象类型显示名称" />
        <div class="count">{{ model.objectTypeName.length }} / 64</div>
      </FormItem>
      <FormItem label="对象类型名称同义词：">
        <Input v-model:value="model.objectTypeEnglishName" :maxlength="64" placeholder="使用逗号分隔多个值" />
        <div class="count">{{ model.objectTypeEnglishName.length }} / 64</div>
      </FormItem>
      <FormItem required label="ID：" :validate-status="idError ? 'error' : undefined" :help="idError">
        <Input v-model:value="model.objectTypeId" :maxlength="64" placeholder="请输入" />
      </FormItem>
      <FormItem label="描述：">
        <Textarea v-model:value="model.description" :maxlength="256" :rows="2" placeholder="请输入" />
        <div class="count">{{ model.description.length }} / 256</div>
      </FormItem>
      <FormItem label="所在对象组：">
        <ObjectGroupSelect :value="model.objectGroupId" @change="model.objectGroupId = $event" />
      </FormItem>
    </Form>
  </section>
</template>

<script setup lang="ts">
import { DatabaseOutlined } from '@ant-design/icons-vue';
import { Form, FormItem, Input, Textarea } from 'ant-design-vue';
import { computed } from 'vue';
import {
  validateObjectTypeId,
  validateObjectTypeName,
} from '@/utils/object-type-create';
import ObjectGroupSelect from '../object-group-select/index.vue';

export interface MetadataFormModel {
  objectTypeName: string;
  objectTypeEnglishName: string;
  objectTypeId: string;
  description: string;
  objectGroupId?: string;
}

const model = defineModel<MetadataFormModel>({ required: true });

const nameError = computed(() => {
  return model.value.objectTypeName
    ? validateObjectTypeName(model.value.objectTypeName)
    : null;
});

const idError = computed(() => {
  return model.value.objectTypeId
    ? validateObjectTypeId(model.value.objectTypeId)
    : null;
});
</script>

<style scoped lang="scss">
.metadata-step {
  padding: 48px 0 42px;
}

.metadata-form {
  width: 780px;
  margin: 0 auto;
}

.icon-picker {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--shentu-radius-md);
  background: var(--shentu-color-primary);
  color: var(--shentu-color-bg-container);
  cursor: pointer;
  font-size: 20px;
}

.count {
  margin-top: 4px;
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 18px;
  text-align: right;
}
</style>

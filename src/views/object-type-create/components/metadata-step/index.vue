<template>
  <div class="metadata-step">
    <Form layout="horizontal" :label-col="{style: {width: '124px'}}" :wrapper-col="{style: {width: '584px'}}">
      <FormItem label="图标">
        <button class="metadata-step__icon" type="button" aria-label="对象类型图标">
          <TeamOutlined />
        </button>
      </FormItem>
      <FormItem required label="对象类型显示名称">
        <Input
          :value="model.objectTypeName"
          placeholder="请输入对象类型显示名称"
          :maxlength="64"
          show-count
          @change="update('objectTypeName', $event)"
        />
      </FormItem>
      <FormItem label="对象类型名称同义词">
        <Textarea
          :value="model.synonyms"
          placeholder="使用逗号分隔多个值"
          :maxlength="1000"
          show-count
          :auto-size="{minRows: 2, maxRows: 2}"
          @change="update('synonyms', $event)"
        />
      </FormItem>
      <FormItem required label="ID">
        <Input :value="model.objectTypeId" placeholder="请输入" :maxlength="64" show-count @change="update('objectTypeId', $event)" />
      </FormItem>
      <FormItem label="描述">
        <Textarea
          :value="model.description"
          placeholder="请输入"
          :maxlength="256"
          show-count
          :auto-size="{minRows: 2, maxRows: 2}"
          @change="update('description', $event)"
        />
      </FormItem>
      <FormItem label="所在对象组">
        <Button type="link" class="metadata-step__group">添加对象组 <DownOutlined /></Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { DownOutlined, TeamOutlined } from "@ant-design/icons-vue";
import { Button, Form, FormItem, Input, Textarea } from "ant-design-vue";

export interface MetadataStepModel {
  objectTypeName: string;
  synonyms: string;
  objectTypeId: string;
  description: string;
}

interface MetadataStepProps {
  model: MetadataStepModel;
}

defineProps<MetadataStepProps>();

const emit = defineEmits<{
  update: [model: Partial<MetadataStepModel>];
}>();

const update = (key: keyof MetadataStepModel, event: Event) => {
  emit("update", {
    [key]: (event.target as HTMLInputElement | HTMLTextAreaElement).value,
  });
};
</script>

<style scoped lang="scss">
.metadata-step {
  width: 720px;
  margin: 54px auto 0;
}

.metadata-step__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  color: #fff;
  cursor: pointer;
  background: var(--matrix-primary);
  border: 0;
  border-radius: 2px;
}

.metadata-step__group {
  padding-left: 0;
}
</style>

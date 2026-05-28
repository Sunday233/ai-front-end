<script setup lang="ts">
interface MetadataForm {
  objectTypeName: string;
  synonyms: string;
  objectTypeId: string;
  description: string;
  objectGroup: string;
}

const modelValue = defineModel<MetadataForm>({ required: true });

const updateField = (field: keyof MetadataForm, value: string): void => {
  modelValue.value = {
    ...modelValue.value,
    [field]: value,
  };
};
</script>

<template>
  <div class="metadata-step">
    <a-form layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="图标">
        <div class="icon-preview">♙</div>
      </a-form-item>
      <a-form-item label="对象类型显示名称" required>
        <a-input :value="modelValue.objectTypeName" placeholder="请输入对象类型显示名称" show-count :maxlength="64" @update:value="updateField('objectTypeName', $event)" />
      </a-form-item>
      <a-form-item label="对象类型名称同义词">
        <a-textarea :value="modelValue.synonyms" placeholder="使用逗号分隔多个值" show-count :maxlength="1000" @update:value="updateField('synonyms', $event)" />
      </a-form-item>
      <a-form-item label="ID" required>
        <a-input :value="modelValue.objectTypeId" placeholder="请输入" show-count :maxlength="64" @update:value="updateField('objectTypeId', $event)" />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea :value="modelValue.description" show-count :maxlength="256" @update:value="updateField('description', $event)" />
      </a-form-item>
      <a-form-item label="所在对象组">
        <a class="text-link" @click="updateField('objectGroup', '默认对象组')">{{ modelValue.objectGroup || "添加对象组" }}</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.metadata-step {
  width: 760px;
  margin: 52px auto 0;
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--matrix-white);
  background: var(--matrix-primary);
  border-radius: 2px;
}
</style>

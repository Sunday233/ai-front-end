<template>
  <div class="metadata-step">
    <div class="form-row">
      <label>图标：</label>
      <span class="matrix-icon-tile"><TeamOutlined /></span>
    </div>
    <div class="form-row">
      <label><span>*</span> 对象类型显示名称：</label>
      <a-input v-model:value="model.displayName" placeholder="请输入对象类型显示名称" show-count :maxlength="64" />
    </div>
    <div class="form-row">
      <label>对象类型名称同义词：</label>
      <a-textarea v-model:value="model.synonyms" placeholder="使用逗号分隔多个值" show-count :maxlength="1000" />
    </div>
    <div class="form-row">
      <label><span>*</span> ID：</label>
      <a-input v-model:value="model.objectTypeId" placeholder="请输入" show-count :maxlength="64" />
    </div>
    <div class="form-row">
      <label>描述：</label>
      <a-textarea v-model:value="model.description" show-count :maxlength="256" />
    </div>
    <div class="form-row">
      <label>所在对象组：</label>
      <ObjectGroupSelect
        :groups="groups"
        :selected-group="selectedGroup"
        @select="$emit('selectGroup', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {TeamOutlined} from '@ant-design/icons-vue';
import ObjectGroupSelect from '@/views/object-type-create/components/object-group-select/index.vue';
import type {ObjectGroupOption} from '@/types/object-type-create/model';

interface MetadataForm {
  displayName: string;
  synonyms: string;
  objectTypeId: string;
  description: string;
}

defineProps<{
  groups: ObjectGroupOption[];
  selectedGroup: ObjectGroupOption | null;
}>();

defineEmits<{
  selectGroup: [group: ObjectGroupOption | null];
}>();

const model = defineModel<MetadataForm>({required: true});
</script>

<style scoped lang="scss">
.metadata-step {
  width: 700px;
  padding-top: 54px;
  margin-left: 96px;
}

.form-row {
  display: grid;
  grid-template-columns: 170px 1fr;
  align-items: start;
  gap: 10px;
  margin-bottom: 10px;

  label {
    padding-top: 6px;
    color: var(--matrix-color-text-secondary);
    text-align: right;

    span {
      color: var(--matrix-color-error);
    }
  }
}
</style>

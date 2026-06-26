<template>
  <AppShell>
    <div class="create-page">
      <div class="breadcrumb">返回首页&nbsp;&nbsp;|&nbsp;&nbsp;<ApartmentOutlined /> 对象类型&nbsp;&nbsp;>&nbsp;&nbsp;创建对象类型</div>
      <CreateStepHeader :current="currentStep" />

      <section class="content-panel" :class="`step-${currentStep}`">
        <a-spin :spinning="loading">
          <DatasourceStep
            v-if="currentStep === 1 && draft"
            :selected-dataset="selectedDataset"
            @open-dataset-modal="datasetModalOpen = true"
          />
          <MetadataStep
            v-if="currentStep === 2 && draft"
            v-model="metadata"
            :groups="draft.objectGroups"
            :selected-group="selectedGroup"
            @select-group="selectedGroup = $event"
          />
          <AttributeStep
            v-if="currentStep === 3 && draft"
            :mapping-rows="draft.mappingRows"
            @change-primary-key="primaryKeyModalOpen = true"
          />
          <ActionStep
            v-if="currentStep === 4 && draft"
            v-model:selected-action-ids="selectedActionIds"
            v-model:selected-executors="selectedExecutors"
            :action-rows="draft.actionRows"
            :executor-type="draft.executorType"
            :executor-options="draft.executorOptions"
          />
          <WizardFooter
            :current="currentStep"
            :can-next="canNext"
            :submitting="submitting"
            @prev="currentStep -= 1"
            @next="onNext"
            @finish="onFinish"
          />
        </a-spin>
      </section>

      <DatasetSelectModal
        v-if="draft"
        :open="datasetModalOpen"
        :draft="draft"
        @cancel="datasetModalOpen = false"
        @select="onSelectDataset"
      />
      <PrimaryKeyConfirmModal
        :open="primaryKeyModalOpen"
        @cancel="primaryKeyModalOpen = false"
        @confirm="primaryKeyModalOpen = false"
      />
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import {ApartmentOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {computed, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import AppShell from '@/layout/app-shell/index.vue';
import {createObjectType, getObjectTypeCreateDraft} from '@/services/object-type-create';
import ActionStep from '@/views/object-type-create/components/action-step/index.vue';
import AttributeStep from '@/views/object-type-create/components/attribute-step/index.vue';
import CreateStepHeader from '@/views/object-type-create/components/create-step-header/index.vue';
import DatasetSelectModal from '@/views/object-type-create/components/dataset-select-modal/index.vue';
import DatasourceStep from '@/views/object-type-create/components/datasource-step/index.vue';
import MetadataStep from '@/views/object-type-create/components/metadata-step/index.vue';
import PrimaryKeyConfirmModal from '@/views/object-type-create/components/primary-key-confirm-modal/index.vue';
import WizardFooter from '@/views/object-type-create/components/wizard-footer/index.vue';
import type {ActionType, DatasetRow, ExecutorOption, ObjectGroupOption, ObjectTypeCreateDraft} from '@/types/object-type-create/model';

interface MetadataForm {
  displayName: string;
  synonyms: string;
  objectTypeId: string;
  description: string;
}

const router = useRouter();
const loading = ref(false);
const submitting = ref(false);
const currentStep = ref(1);
const draft = ref<ObjectTypeCreateDraft | null>(null);
const datasetModalOpen = ref(false);
const primaryKeyModalOpen = ref(false);
const selectedDataset = ref<DatasetRow | null>(null);
const selectedGroup = ref<ObjectGroupOption | null>(null);
const selectedActionIds = ref<ActionType[]>([]);
const selectedExecutors = ref<ExecutorOption[]>([]);
const metadata = ref<MetadataForm>({
  displayName: '',
  synonyms: '',
  objectTypeId: '',
  description: '',
});

const canNext = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(selectedDataset.value);
  }

  if (currentStep.value === 2) {
    return Boolean(metadata.value.displayName.trim() && metadata.value.objectTypeId.trim());
  }

  if (currentStep.value === 3) {
    return Boolean(draft.value?.mappingRows.length);
  }

  return true;
});

const onSelectDataset = (dataset: DatasetRow) => {
  selectedDataset.value = dataset;
  datasetModalOpen.value = false;
};

const onNext = () => {
  if (!canNext.value) {
    message.warning('请先完成当前步骤必填项');
    return;
  }

  currentStep.value += 1;
};

const onFinish = async () => {
  submitting.value = true;

  try {
    await createObjectType({
      existingDatasetId: selectedDataset.value?.datasetId,
      objectTypeName: metadata.value.displayName || '测试',
      objectTypeId: metadata.value.objectTypeId || 'ot_id_999999',
      description: metadata.value.description,
      objectGroupId: selectedGroup.value?.id,
    });
    message.success('创建成功');
    router.push('/object-types');
  } finally {
    submitting.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    draft.value = await getObjectTypeCreateDraft();
    selectedDataset.value = null;
    selectedGroup.value = draft.value.objectGroups[0] ?? null;
    selectedExecutors.value = draft.value.selectedExecutors;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.create-page {
  position: relative;
  z-index: 1;
}

.breadcrumb {
  display: flex;
  height: 28px;
  align-items: center;
  gap: 4px;
  color: var(--matrix-color-text-secondary);
}

.content-panel {
  position: relative;
  min-height: 455px;
  margin-top: 16px;
  background: var(--matrix-color-panel-bg);
  border-radius: var(--matrix-radius-lg);

  &.step-1 {
    min-height: 304px;
  }

  &.step-3 {
    min-height: 507px;
  }

  &.step-4 {
    min-height: 402px;
  }

  :deep(.ant-spin),
  :deep(.ant-spin-nested-loading),
  :deep(.ant-spin-container) {
    min-height: inherit;
  }

  :deep(.ant-spin-container) {
    position: relative;
  }
}
</style>

<template>
  <WorkbenchShell active-key="object-types">
    <div class="breadcrumb">
      <RouterLink to="/workbench">返回首页</RouterLink>
      <span>|</span>
      <RouterLink to="/object-types">对象类型</RouterLink>
      <span>&gt;</span>
      <strong>创建对象类型</strong>
    </div>

    <CreateStepHeader :current="currentStep" @change="currentStep = $event" />

    <div class="step-content">
      <DatasourceStep
        v-if="currentStep === 1"
        :selected-dataset="selectedDataset"
        @open-dataset="datasetModalOpen = true"
      />
      <MetadataStep v-else-if="currentStep === 2" v-model="metadata" />
      <AttributeStep
        v-else-if="currentStep === 3"
        :rows="mappingRows"
        @delete-row="onDeleteMappingRow"
        @primary-change="onPrimaryChange"
        @add-row="onAddMappingRow"
      />
      <ActionStep
        v-else
        :actions="actionRows"
        :executor-users="executorUsers"
        @toggle-action="onToggleAction"
        @update-users="onUpdateUsers"
      />
    </div>

    <WizardFooter
      :current="currentStep"
      :can-next="canNext"
      @prev="currentStep -= 1"
      @next="currentStep += 1"
      @skip="onFinish"
      @finish="onFinish"
    />

    <DatasetSelectModal
      :open="datasetModalOpen"
      :datasets="datasets"
      :selected-dataset-id="selectedDataset?.datasetId"
      @close="datasetModalOpen = false"
      @select="onSelectDataset"
    />

    <PrimaryKeyConfirmModal
      :open="primaryConfirmOpen"
      :current-key="currentPrimaryKey"
      :next-key="pendingPrimaryKey"
      @cancel="primaryConfirmOpen = false"
      @confirm="confirmPrimaryKeyChange"
    />
  </WorkbenchShell>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import WorkbenchShell from '@/layout/workbench-shell/index.vue';
import {
  createObjectType,
  getAvailableDatasets,
} from '@/services/object-type-create';
import type {
  ActionPermissionRow,
  AttributeMappingRow as AttributeMappingRowModel,
  DatasetListItem,
  ObjectTypeCreateDraft,
} from '@/types/object-type-create/model';
import {
  createInitialMappingRows,
  validateObjectTypeId,
  validateObjectTypeName,
} from '@/utils/object-type-create';
import ActionStep from './components/action-step/index.vue';
import AttributeStep from './components/attribute-step/index.vue';
import CreateStepHeader from './components/create-step-header/index.vue';
import DatasetSelectModal from './components/dataset-select-modal/index.vue';
import DatasourceStep from './components/datasource-step/index.vue';
import MetadataStep from './components/metadata-step/index.vue';
import PrimaryKeyConfirmModal from './components/primary-key-confirm-modal/index.vue';
import WizardFooter from './components/wizard-footer/index.vue';

interface MetadataFormModel {
  objectTypeName: string;
  objectTypeEnglishName: string;
  objectTypeId: string;
  description: string;
  objectGroupId?: string;
}

const router = useRouter();
const currentStep = ref(1);
const datasetModalOpen = ref(false);
const primaryConfirmOpen = ref(false);
const pendingPrimaryKey = ref('');
const datasets = ref<DatasetListItem[]>([]);
const selectedDataset = ref<DatasetListItem | null>(null);
const mappingRows = ref<AttributeMappingRowModel[]>([]);
const executorUsers = ref<string[]>(['chenzhenq5', 'chenzhenq8']);
const metadata = ref<MetadataFormModel>({
  objectTypeName: '',
  objectTypeEnglishName: '',
  objectTypeId: '',
  description: '',
  objectGroupId: undefined,
});
const actionRows = ref<ActionPermissionRow[]>([
  {
    actionType: 'create',
    title: '创建测试',
    description: '设置emp_no、birth_date、first_name和更多2项其他属性',
    selected: false,
    executableUsers: [],
    executableGroups: [],
  },
  {
    actionType: 'update',
    title: '修改测试',
    description: '修改hight、birth_date、first_name和更多2项其他属性',
    selected: false,
    executableUsers: [],
    executableGroups: [],
  },
  {
    actionType: 'delete',
    title: '删除测试',
    description: '允许删除对象实例及其所有属性',
    selected: false,
    executableUsers: [],
    executableGroups: [],
  },
]);

const currentPrimaryKey = computed(() => {
  return (
    mappingRows.value.find((row) => row.sourceField.primary)?.id ?? 'emp_no'
  );
});

const canNext = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(selectedDataset.value);
  }

  if (currentStep.value === 2) {
    return (
      Boolean(metadata.value.objectTypeName) &&
      Boolean(metadata.value.objectTypeId) &&
      validateObjectTypeName(metadata.value.objectTypeName) === null &&
      validateObjectTypeId(metadata.value.objectTypeId) === null
    );
  }

  if (currentStep.value === 3) {
    return mappingRows.value.length > 0;
  }

  return true;
});

const loadDatasets = async () => {
  const response = await getAvailableDatasets({ pageNo: 1, pageSize: 10 });
  datasets.value = response.list;
  mappingRows.value = createInitialMappingRows(
    response.list[1]?.columns ?? response.list[0]?.columns ?? [],
  );
};

const onSelectDataset = (dataset: DatasetListItem) => {
  selectedDataset.value = dataset;
  mappingRows.value = createInitialMappingRows(dataset.columns);
  datasetModalOpen.value = false;
};

const onDeleteMappingRow = (id: string) => {
  mappingRows.value = mappingRows.value.filter(
    (row) => row.id !== id || !row.removable,
  );
};

const onAddMappingRow = () => {
  const nextIndex = mappingRows.value.length + 1;
  mappingRows.value.push({
    id: `custom_${nextIndex}`,
    sourceField: {
      name: `custom_${nextIndex}`,
      type: 'string',
      primary: false,
    },
    targetAttribute: {
      name: `custom_${nextIndex}`,
      type: 'string',
      readonly: true,
    },
    removable: true,
  });
};

const onPrimaryChange = (id: string) => {
  if (id === currentPrimaryKey.value) {
    return;
  }

  pendingPrimaryKey.value = id;
  primaryConfirmOpen.value = true;
};

const confirmPrimaryKeyChange = () => {
  mappingRows.value = mappingRows.value.map((row) => ({
    ...row,
    sourceField: {
      ...row.sourceField,
      primary: row.id === pendingPrimaryKey.value,
    },
    removable: row.id !== pendingPrimaryKey.value,
  }));
  primaryConfirmOpen.value = false;
};

const onToggleAction = (actionType: ActionPermissionRow['actionType']) => {
  actionRows.value = actionRows.value.map((action) => {
    if (action.actionType !== actionType) {
      return action;
    }

    return {
      ...action,
      selected: !action.selected,
      executableUsers: !action.selected ? executorUsers.value : [],
    };
  });
};

const onUpdateUsers = (users: string[]) => {
  executorUsers.value = users;
  actionRows.value = actionRows.value.map((action) => {
    return action.selected ? { ...action, executableUsers: users } : action;
  });
};

const onFinish = async () => {
  const dataset =
    selectedDataset.value ?? datasets.value[1] ?? datasets.value[0];
  const body: ObjectTypeCreateDraft = {
    datasourceMode: 'existing',
    datasetName: dataset?.name ?? '',
    datasetPath: dataset?.path ?? '',
    existingDatasetId: dataset?.datasetId,
    objectTypeIcon: 'default-blue',
    objectTypeName: metadata.value.objectTypeName || 'employees',
    objectTypeEnglishName: metadata.value.objectTypeEnglishName || 'employees',
    description: metadata.value.description,
    objectGroupId: metadata.value.objectGroupId,
    objectTypeId: metadata.value.objectTypeId || 'employees',
    attributes: mappingRows.value,
    actions: actionRows.value.filter((action) => action.selected),
  };

  await createObjectType(body);
  message.success('对象类型创建成功');
  void router.push('/object-types');
};

onMounted(() => {
  void loadDatasets();
});
</script>

<style scoped lang="scss">
.breadcrumb {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--shentu-color-text-tertiary);
  font-size: 14px;
  line-height: 24px;

  strong {
    color: var(--shentu-color-text);
    font-weight: 500;
  }
}

.step-content {
  margin-top: 16px;
}
</style>

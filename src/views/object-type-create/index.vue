<template>
  <AppShell active-key="object-types">
    <section class="create-page">
      <div class="create-page__breadcrumb">返回首页 <span>|</span> <ApartmentOutlined /> 对象类型 <span>></span> 创建对象类型</div>
      <CreateStepHeader :current="currentStep" />

      <section class="create-page__panel">
        <DatasourceStep v-if="currentStep === 0" :selected-dataset="selectedDataset" @open-dataset="datasetModalOpen = true" />
        <MetadataStep v-else-if="currentStep === 1" :model="metadata" @update="onMetadataUpdate" />
        <AttributeStep v-else-if="currentStep === 2" :rows="mappingRows" @update="mappingRows = $event" @primary-change="onPrimaryChange" />
        <ActionStep v-else :actions="actions" :selected-ids="selectedActionIds" @update="selectedActionIds = $event" />

        <footer class="create-page__footer">
          <Button v-if="currentStep > 0" @click="currentStep -= 1">上一步</Button>
          <Button v-if="currentStep < 3" type="primary" :disabled="nextDisabled" @click="currentStep += 1">下一步</Button>
          <Button v-else type="primary" :loading="submitting" @click="onSubmit">完成</Button>
        </footer>
      </section>

      <Modal v-model:open="datasetModalOpen" title="选择数据集" width="720px" @ok="selectDataset">
        <Table :columns="datasetColumns" :data-source="datasets" row-key="id" :pagination="false" size="middle" />
      </Modal>

      <Modal v-model:open="primaryConfirmOpen" title="修改主键确认" @ok="confirmPrimaryKey">
        <p>修改主键可能影响对象实例的唯一识别。确认将主键切换为「{{ pendingPrimaryRow?.sourceField.name }}」吗？</p>
      </Modal>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from "@/layout/app-shell/index.vue";
import {
  createObjectType,
  getAvailableDatasets,
} from "@/services/object-type-create";
import type {
  ActionOption,
  AttributeMappingRow,
  DatasetOption,
} from "@/types/object-type-create/model";
import { ApartmentOutlined } from "@ant-design/icons-vue";
import { Button, Modal, Table, message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ActionStep from "./components/action-step/index.vue";
import AttributeStep from "./components/attribute-step/index.vue";
import CreateStepHeader from "./components/create-step-header/index.vue";
import DatasourceStep from "./components/datasource-step/index.vue";
import MetadataStep, {
  type MetadataStepModel,
} from "./components/metadata-step/index.vue";

const router = useRouter();
const currentStep = ref(0);
const datasets = ref<DatasetOption[]>([]);
const selectedDataset = ref<DatasetOption>();
const datasetModalOpen = ref(false);
const primaryConfirmOpen = ref(false);
const pendingPrimaryRow = ref<AttributeMappingRow>();
const submitting = ref(false);
const selectedActionIds = ref<string[]>([]);

const metadata = ref<MetadataStepModel>({
  objectTypeName: "",
  synonyms: "",
  objectTypeId: "",
  description: "",
});

const mappingRows = ref<AttributeMappingRow[]>([]);

const actions = ref<ActionOption[]>([
  {
    id: "create",
    actionType: "create",
    name: "创建测试",
    description: "设置emp_no、birth_date、first_name和更多2项其他属性",
    executableUsers: [],
    executableGroups: [],
  },
  {
    id: "update",
    actionType: "update",
    name: "修改测试",
    description: "修改hight、birth_date、first_name和更多2项其他属性",
    executableUsers: [],
    executableGroups: [],
  },
  {
    id: "delete",
    actionType: "delete",
    name: "删除测试",
    description: "允许删除对象实例及其所有属性",
    executableUsers: [],
    executableGroups: [],
  },
]);

const datasetColumns = [
  { title: "数据集名称", dataIndex: "name", key: "name" },
  { title: "存储路径", dataIndex: "path", key: "path" },
];

const nextDisabled = computed(() => {
  if (currentStep.value === 0) {
    return !selectedDataset.value;
  }

  if (currentStep.value === 1) {
    return (
      !metadata.value.objectTypeName.trim() ||
      !metadata.value.objectTypeId.trim()
    );
  }

  if (currentStep.value === 2) {
    return mappingRows.value.length === 0;
  }

  return false;
});

const buildRows = (dataset: DatasetOption): AttributeMappingRow[] => {
  return dataset.fields.map((field, index) => ({
    id: field.id,
    sourceField: field,
    attributeName: field.name,
    attributeType: field.type,
    titleKey: index === 0,
    primaryKey: Boolean(field.primary),
    removable: !field.primary,
  }));
};

const loadDatasets = async () => {
  const payload = await getAvailableDatasets();
  datasets.value = payload.datasets;
  selectedDataset.value = payload.datasets[0];

  if (selectedDataset.value) {
    mappingRows.value = buildRows(selectedDataset.value);
  }
};

const selectDataset = () => {
  selectedDataset.value = datasets.value[0];

  if (selectedDataset.value) {
    mappingRows.value = buildRows(selectedDataset.value);
  }

  datasetModalOpen.value = false;
};

const onMetadataUpdate = (nextModel: Partial<MetadataStepModel>) => {
  metadata.value = { ...metadata.value, ...nextModel };
};

const onPrimaryChange = (row: AttributeMappingRow) => {
  if (row.primaryKey) {
    return;
  }

  pendingPrimaryRow.value = row;
  primaryConfirmOpen.value = true;
};

const confirmPrimaryKey = () => {
  const nextPrimaryId = pendingPrimaryRow.value?.id;

  if (!nextPrimaryId) {
    primaryConfirmOpen.value = false;
    return;
  }

  mappingRows.value = mappingRows.value.map((row) => ({
    ...row,
    primaryKey: row.id === nextPrimaryId,
  }));
  primaryConfirmOpen.value = false;
};

const onSubmit = async () => {
  submitting.value = true;

  try {
    await createObjectType({
      draft: {
        datasourceMode: "existing",
        datasetName: selectedDataset.value?.name ?? "",
        datasetPath: selectedDataset.value?.path ?? "",
        existingDatasetId: selectedDataset.value?.id,
        objectTypeIcon: "team",
        objectTypeName: metadata.value.objectTypeName || "回归测试1",
        objectTypeEnglishName: metadata.value.objectTypeId || "regression-test",
        description: metadata.value.description,
        objectTypeId: metadata.value.objectTypeId || "regression-test",
        attributes: mappingRows.value,
        actions: actions.value.filter((action) =>
          selectedActionIds.value.includes(action.id),
        ),
      },
    });
    message.success("对象类型创建成功");
    await router.push("/object-types");
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  void loadDatasets();
});
</script>

<style scoped lang="scss">
.create-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 16px 16px 40px;
}

.create-page__breadcrumb {
  display: flex;
  gap: 6px;
  align-items: center;
  height: 24px;
  margin-bottom: 8px;
  color: var(--matrix-text-muted);
}

.create-page__panel {
  position: relative;
  min-height: 456px;
  margin-top: 16px;
  background: var(--matrix-bg-container);
  border-radius: 6px;
}

.create-page__footer {
  position: absolute;
  right: 106px;
  bottom: 34px;
  display: flex;
  gap: 12px;
}
</style>

<script setup lang="ts">
import MatrixShell from "@/layout/matrix-shell/index.vue";
import {
  createObjectType,
  getAvailableDatasets,
  getWorkbenchSummary,
} from "@/services/matrix";
import type {
  ActionConfig,
  AttributeConfig,
  DatasetSummary,
  NavigationItem,
} from "@/types/matrix/model";
import { Modal, message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ActionStep from "./components/ActionStep.vue";
import AttributeStep from "./components/AttributeStep.vue";
import DatasetPickerModal from "./components/DatasetPickerModal.vue";
import DatasetStep from "./components/DatasetStep.vue";
import MetadataStep from "./components/MetadataStep.vue";
import WizardSteps from "./components/WizardSteps.vue";

interface MetadataForm {
  objectTypeName: string;
  synonyms: string;
  objectTypeId: string;
  description: string;
  objectGroup: string;
}

const router = useRouter();
const currentStep = ref(0);
const menus = ref<NavigationItem[]>([]);
const datasets = ref<DatasetSummary[]>([]);
const selectedDataset = ref<DatasetSummary>();
const pickerOpen = ref(false);
const submitting = ref(false);
const titleKey = ref<string>();

const metadata = ref<MetadataForm>({
  objectTypeName: "",
  synonyms: "",
  objectTypeId: "",
  description: "",
  objectGroup: "",
});

const attributes = ref<AttributeConfig[]>([
  {
    id: "attr-emp-no",
    type: "Int",
    fieldName: "emp_no",
    attributeName: "emp_no",
    isPrimary: true,
  },
  {
    id: "attr-hight",
    type: "Float",
    fieldName: "hight",
    attributeName: "hight",
  },
  {
    id: "attr-birth-date",
    type: "Date",
    fieldName: "birth_date",
    attributeName: "birth_date",
  },
  {
    id: "attr-first-name",
    type: "String",
    fieldName: "first_name",
    attributeName: "first_name",
  },
  {
    id: "attr-last-name",
    type: "String",
    fieldName: "last_name",
    attributeName: "last_name",
  },
  {
    id: "attr-gender",
    type: "String",
    fieldName: "gender",
    attributeName: "gender",
  },
]);

const actions = ref<ActionConfig[]>([
  {
    id: "create",
    title: "创建测试",
    description: "设置emp_no、birth_date、first_name和更多2项其他属性",
    selected: false,
  },
  {
    id: "update",
    title: "修改测试",
    description: "修改hight、birth_date、first_name和更多2项其他属性",
    selected: false,
  },
  {
    id: "delete",
    title: "删除测试",
    description: "允许删除对象实例及其所有属性",
    selected: false,
  },
]);

const fields = computed(
  () => selectedDataset.value?.fields ?? datasets.value[0]?.fields ?? [],
);

const canContinue = computed(() => {
  if (currentStep.value === 0) {
    return Boolean(selectedDataset.value);
  }
  if (currentStep.value === 1) {
    return Boolean(
      metadata.value.objectTypeName.trim() &&
        metadata.value.objectTypeId.trim(),
    );
  }
  if (currentStep.value === 2) {
    return attributes.value.length > 0;
  }
  return true;
});

const onDatasetSelect = (dataset: DatasetSummary): void => {
  selectedDataset.value = dataset;
  pickerOpen.value = false;
  if (dataset.fields.length > 0) {
    attributes.value = dataset.fields.map((field) => ({
      id: `attr-${field.name}`,
      type: field.type,
      fieldName: field.name,
      attributeName: field.name,
      isPrimary: field.isPrimary,
    }));
  }
};

const onNext = (): void => {
  if (!canContinue.value) {
    message.warning("请先完成当前步骤必填项");
    return;
  }
  currentStep.value += 1;
};

const onPrevious = (): void => {
  currentStep.value -= 1;
};

const onAddAttribute = (): void => {
  const index = attributes.value.length + 1;
  attributes.value.push({
    id: `attr-custom-${index}`,
    type: "String",
    fieldName: `custom_${index}`,
    attributeName: `custom_${index}`,
  });
};

const onRemoveAttribute = (id: string): void => {
  attributes.value = attributes.value.filter(
    (attribute) => attribute.id !== id,
  );
};

const onToggleAction = (id: string): void => {
  actions.value = actions.value.map((action) =>
    action.id === id ? { ...action, selected: !action.selected } : action,
  );
};

const onFinish = async (): Promise<void> => {
  if (!selectedDataset.value) {
    return;
  }
  submitting.value = true;
  await createObjectType({
    datasetId: selectedDataset.value.id,
    objectTypeName: metadata.value.objectTypeName || "回归测试1",
    objectTypeId: metadata.value.objectTypeId || "regression-test-1",
    description: metadata.value.description,
    attributes: attributes.value,
    actions: actions.value
      .filter((action) => action.selected)
      .map((action) => action.id),
  });
  submitting.value = false;
  message.success("创建成功");
  router.push("/object-types");
};

const onPrimaryKeyRisk = (): void => {
  Modal.confirm({
    title: "确认修改主键？",
    content: "修改主键可能影响已有关联属性与动作配置，请确认是否继续。",
    okText: "确认",
    cancelText: "取消",
  });
};

onMounted(async () => {
  const [summary, datasetResponse] = await Promise.all([
    getWorkbenchSummary(),
    getAvailableDatasets(),
  ]);
  menus.value = summary.menus;
  datasets.value = datasetResponse.rows;
  selectedDataset.value = datasetResponse.rows[0];
  titleKey.value = "emp_no";
});
</script>

<template>
  <MatrixShell active-key="objectType" :breadcrumb="['返回首页', '对象类型', '创建对象类型']" :menus="menus">
    <div class="create-page">
      <WizardSteps :current="currentStep" />

      <section class="step-panel" :class="`step-panel-${currentStep}`">
        <DatasetStep v-if="currentStep === 0" :selected-dataset="selectedDataset" @open-picker="pickerOpen = true" />
        <MetadataStep v-else-if="currentStep === 1" v-model="metadata" />
        <AttributeStep
          v-else-if="currentStep === 2"
          :fields="fields"
          :attributes="attributes"
          :title-key="titleKey"
          @add="onAddAttribute"
          @remove="onRemoveAttribute"
          @update-title-key="titleKey = $event"
        />
        <ActionStep v-else :actions="actions" @toggle="onToggleAction" />

        <div class="step-actions">
          <a-button v-if="currentStep > 0" @click="onPrevious">上一步</a-button>
          <a-button v-if="currentStep === 2" @click="onPrimaryKeyRisk">主键风险提示</a-button>
          <a-button v-if="currentStep < 3" type="primary" :disabled="!canContinue" @click="onNext">下一步</a-button>
          <a-button v-else type="primary" :loading="submitting" @click="onFinish">完成</a-button>
        </div>
      </section>

      <DatasetPickerModal :open="pickerOpen" :datasets="datasets" :selected-id="selectedDataset?.id" @close="pickerOpen = false" @select="onDatasetSelect" />
    </div>
  </MatrixShell>
</template>

<style scoped lang="scss">
.create-page {
  position: relative;
  z-index: 1;
}

.step-panel {
  position: relative;
  min-height: 460px;
  margin-top: 16px;
  padding: 1px 40px 88px;
  background: var(--matrix-white);
  border-radius: 6px;
}

.step-panel-0 {
  min-height: 302px;
}

.step-actions {
  position: absolute;
  right: 96px;
  bottom: 36px;
  display: flex;
  gap: 12px;
}
</style>

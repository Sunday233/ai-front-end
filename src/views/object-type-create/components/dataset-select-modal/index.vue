<template>
  <Modal
    :open="open"
    title="选择数据集"
    width="1000px"
    class="dataset-modal"
    ok-text="选择"
    cancel-text="取消"
    @cancel="$emit('close')"
    @ok="onConfirm"
  >
    <div class="modal-toolbar">
      <Input v-model:value="keyword" placeholder="输入数据集名称" />
      <Button @click="keyword = ''">清空</Button>
    </div>
    <div class="modal-body">
      <aside class="dataset-list">
        <div class="list-crumb">返回 &gt; 全部 &gt; 全部项目 &gt; 查询结果</div>
        <div class="list-count">14 数据集</div>
        <button
          v-for="dataset in filteredDatasets"
          :key="dataset.datasetId"
          class="dataset-row"
          :class="{active: activeDatasetId === dataset.datasetId}"
          type="button"
          @click="activeDatasetId = dataset.datasetId"
        >
          <strong>{{ dataset.name }}</strong>
          <small>{{ dataset.path }}</small>
          <span>
            <Tag :color="dataset.sourceType === 'integration' ? 'blue' : 'default'">
              {{ dataset.sourceType === 'integration' ? '接入' : '手工' }}
            </Tag>
            <Tag>表格</Tag>
          </span>
        </button>
      </aside>
      <section class="dataset-detail">
        <h3>{{ activeDataset?.name ?? 'employees' }}</h3>
        <Tabs v-model:activeKey="activeTab">
          <TabPane key="basic" tab="基本信息">
            <dl class="basic-info">
              <div>
                <dt>数据集名称</dt>
                <dd>{{ activeDataset?.name }}</dd>
              </div>
              <div>
                <dt>所属路径</dt>
                <dd>{{ activeDataset?.path }}</dd>
              </div>
              <div>
                <dt>数据集类型</dt>
                <dd>表格</dd>
              </div>
            </dl>
          </TabPane>
          <TabPane key="columns" tab="列信息">
            <Table
              size="small"
              row-key="fieldName"
              :pagination="false"
              :columns="columnColumns"
              :data-source="activeDataset?.columns ?? []"
            />
          </TabPane>
          <TabPane key="preview" tab="数据预览">
            <Table
              size="small"
              row-key="emp_no"
              :pagination="false"
              :scroll="{x: 760}"
              :columns="previewColumns"
              :data-source="activeDataset?.previewRows ?? []"
            />
          </TabPane>
        </Tabs>
      </section>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {
  Button,
  Input,
  Modal,
  Table,
  TabPane,
  Tabs,
  Tag,
} from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import type { DatasetListItem } from '@/types/object-type-create/model';

const props = defineProps<{
  open: boolean;
  datasets: DatasetListItem[];
  selectedDatasetId?: string;
}>();

const emit = defineEmits<{
  close: [];
  select: [dataset: DatasetListItem];
}>();

const keyword = ref('');
const activeTab = ref('basic');
const activeDatasetId = ref('');

const filteredDatasets = computed(() => {
  const normalized = keyword.value.trim().toLowerCase();

  if (!normalized) {
    return props.datasets;
  }

  return props.datasets.filter((dataset) =>
    dataset.name.toLowerCase().includes(normalized),
  );
});

const activeDataset = computed(() => {
  return (
    props.datasets.find(
      (dataset) => dataset.datasetId === activeDatasetId.value,
    ) ??
    props.datasets[1] ??
    props.datasets[0]
  );
});

const columnColumns = [
  { title: '字段', dataIndex: 'fieldName', key: 'fieldName' },
  { title: '显示名', dataIndex: 'displayName', key: 'displayName' },
  { title: '类型', dataIndex: 'fieldType', key: 'fieldType' },
];

const previewColumns = [
  { title: 'emp_no INTEGER', dataIndex: 'emp_no', key: 'emp_no', width: 140 },
  {
    title: 'birth_date DATE',
    dataIndex: 'birth_date',
    key: 'birth_date',
    width: 160,
  },
  {
    title: 'first_name STRING',
    dataIndex: 'first_name',
    key: 'first_name',
    width: 160,
  },
  {
    title: 'last_name STRING',
    dataIndex: 'last_name',
    key: 'last_name',
    width: 160,
  },
  { title: 'gender STRING', dataIndex: 'gender', key: 'gender', width: 140 },
  { title: 'hight FLOAT', dataIndex: 'hight', key: 'hight', width: 140 },
];

const onConfirm = () => {
  if (activeDataset.value) {
    emit('select', activeDataset.value);
  }
};

watch(
  () => props.open,
  (open) => {
    if (open) {
      activeDatasetId.value =
        props.selectedDatasetId ??
        props.datasets[1]?.datasetId ??
        props.datasets[0]?.datasetId ??
        '';
    }
  },
);
</script>

<style scoped lang="scss">
.modal-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.modal-body {
  display: grid;
  min-height: 480px;
  grid-template-columns: 320px 1fr;
  gap: 18px;
}

.dataset-list {
  border-right: 1px solid var(--shentu-color-divider);
  padding-right: 14px;
}

.list-crumb,
.list-count {
  color: var(--shentu-color-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.list-count {
  margin: 8px 0;
  color: var(--shentu-color-text);
}

.dataset-row {
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 0;
  border-bottom: 1px solid var(--shentu-color-divider);
  background: transparent;
  cursor: pointer;
  text-align: left;

  &.active {
    color: var(--shentu-color-primary);
  }

  strong,
  small {
    display: block;
  }

  strong {
    font-size: 14px;
    line-height: 22px;
  }

  small {
    margin: 4px 0 6px;
    color: var(--shentu-color-text-tertiary);
    font-size: 12px;
  }
}

.dataset-detail h3 {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 24px;
}

.basic-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  dt {
    color: var(--shentu-color-text-tertiary);
    font-size: 12px;
    line-height: 20px;
  }

  dd {
    margin: 4px 0 0;
    color: var(--shentu-color-text);
    font-size: 14px;
    line-height: 22px;
  }
}
</style>

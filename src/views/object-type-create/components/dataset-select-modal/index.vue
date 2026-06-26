<template>
  <a-modal
    :open="open"
    width="1000px"
    title="选择数据集"
    class="dataset-modal"
    @cancel="$emit('cancel')"
  >
    <template #footer>
      <a-button @click="$emit('cancel')">取消</a-button>
      <a-button type="primary" @click="$emit('select', selectedDataset)">选择</a-button>
    </template>

    <div class="modal-toolbar">
      <a-input placeholder="输入数据集名称" allow-clear>
        <template #suffix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button>清空</a-button>
    </div>

    <div class="modal-meta">
      <span><RollbackOutlined /> 返回</span>
      <span>全部</span>
      <span>></span>
      <span>全部项目</span>
      <span>></span>
      <strong>查询结果</strong>
      <span class="count">14 数据集</span>
    </div>

    <div class="dataset-body">
      <div class="dataset-list">
        <button
          v-for="dataset in draft.datasets"
          :key="dataset.datasetId"
          type="button"
          class="dataset-row"
          :class="{active: dataset.datasetId === selectedDataset.datasetId}"
          @click="selectedDataset = dataset"
        >
          <span class="dataset-name">{{ dataset.name }}</span>
          <span class="dataset-path">路径：{{ dataset.path }}</span>
          <span class="dataset-tags">
            <span class="tag primary">{{ dataset.sourceType }}</span>
            <span class="tag success">{{ dataset.tableType }}</span>
          </span>
        </button>
      </div>

      <div class="dataset-detail">
        <h3>{{ selectedDataset.name }}</h3>
        <a-tabs v-model:active-key="activeTab">
          <a-tab-pane key="basic" tab="基本信息">
            <dl class="detail-list">
              <dt>路径：</dt>
              <dd>{{ selectedDataset.path }}</dd>
              <dt>版本：</dt>
              <dd>{{ draft.datasetDetail.version }}</dd>
              <dt>类型：</dt>
              <dd>{{ selectedDataset.sourceType }} + {{ selectedDataset.tableType }}</dd>
              <dt>数据更新时间：</dt>
              <dd>{{ draft.datasetDetail.updateTime }}</dd>
            </dl>
          </a-tab-pane>
          <a-tab-pane key="columns" tab="列信息">
            <div class="column-list">
              <div v-for="column in draft.datasetDetail.columns" :key="column.fieldName" class="column-row">
                <span class="field-type">{{ column.fieldType }}</span>
                <span>{{ column.fieldName }}</span>
                <span>{{ column.displayName }}</span>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="preview" tab="数据预览">
            <div class="preview-table">
              <table>
                <thead>
                  <tr>
                    <th>emp_no</th>
                    <th>birth_date</th>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>gender</th>
                    <th>hight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in draft.datasetDetail.previewRows" :key="row.empNo">
                    <td>{{ row.empNo }}</td>
                    <td>{{ row.birthDate }}</td>
                    <td>{{ row.firstName }}</td>
                    <td>{{ row.lastName }}</td>
                    <td>{{ row.gender }}</td>
                    <td>{{ row.hight }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {RollbackOutlined, SearchOutlined} from '@ant-design/icons-vue';
import {ref, watch} from 'vue';
import type {DatasetRow, ObjectTypeCreateDraft} from '@/types/object-type-create/model';

const props = defineProps<{
  open: boolean;
  draft: ObjectTypeCreateDraft;
}>();

defineEmits<{
  cancel: [];
  select: [dataset: DatasetRow];
}>();

const activeTab = ref('basic');
const selectedDataset = ref<DatasetRow>(props.draft.selectedDataset ?? props.draft.datasets[0]!);

watch(
  () => props.open,
  () => {
    selectedDataset.value = props.draft.selectedDataset ?? props.draft.datasets[0]!;
    activeTab.value = 'basic';
  },
);
</script>

<style scoped lang="scss">
.modal-toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin-bottom: 14px;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--matrix-color-text-secondary);
  margin-bottom: 10px;

  .count {
    margin-left: auto;
  }
}

.dataset-body {
  display: grid;
  height: 430px;
  grid-template-columns: 55% 45%;
  border: 1px solid var(--matrix-color-divider);
}

.dataset-list {
  overflow: auto;
  border-right: 1px solid var(--matrix-color-divider);
}

.dataset-row {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 78px;
  grid-template-columns: 1fr auto;
  gap: 6px 12px;
  padding: 14px 28px;
  text-align: left;
  cursor: pointer;
  background: var(--matrix-color-panel-bg);
  border: 0;
  border-bottom: 1px solid var(--matrix-color-divider);

  &.active {
    color: var(--matrix-color-primary);
    background: var(--matrix-color-row-alt);
  }
}

.dataset-name {
  font-weight: 500;
}

.dataset-path {
  grid-column: 1 / -1;
  color: var(--matrix-color-text-muted);
}

.dataset-tags {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.tag,
.field-type {
  display: inline-flex;
  height: 28px;
  align-items: center;
  padding: 0 10px;
  border-radius: var(--matrix-radius-sm);
}

.tag.primary {
  color: var(--matrix-color-primary);
  background: var(--matrix-color-primary-soft);
}

.tag.success {
  color: var(--matrix-color-success);
  background: #ecf8f0;
}

.dataset-detail {
  padding: 18px 24px;

  h3 {
    margin: 0 0 8px;
    font-size: 15px;
  }
}

.detail-list {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 16px 4px;
  padding-top: 16px;

  dt {
    text-align: right;
  }

  dd {
    margin: 0;
  }
}

.column-list {
  display: grid;
  gap: 8px;
}

.column-row {
  display: grid;
  grid-template-columns: 70px 1fr 1fr;
  align-items: center;
  gap: 8px;
}

.field-type {
  height: 24px;
  color: var(--matrix-color-primary);
  background: var(--matrix-color-primary-soft);
}

.preview-table {
  overflow-x: auto;

  table {
    min-width: 560px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid var(--matrix-color-divider);
  }
}
</style>

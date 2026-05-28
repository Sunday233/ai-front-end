<script setup lang="ts">
import type { DatasetSummary } from "@/types/matrix/model";
import { SearchOutlined } from "@ant-design/icons-vue";
import { computed, ref } from "vue";

interface DatasetPickerModalProps {
  open: boolean;
  datasets: DatasetSummary[];
  selectedId?: string;
}

const props = defineProps<DatasetPickerModalProps>();

const emit = defineEmits<{
  close: [];
  select: [dataset: DatasetSummary];
}>();

const keyword = ref("");
const activeId = ref(props.selectedId ?? "ds_employees");
const activeTab = ref("base");

const filteredDatasets = computed(() =>
  props.datasets.filter((dataset) =>
    dataset.name.toLowerCase().includes(keyword.value.trim().toLowerCase()),
  ),
);
const activeDataset = computed(
  () =>
    props.datasets.find((dataset) => dataset.id === activeId.value) ??
    props.datasets[0],
);

const onSelect = (): void => {
  if (activeDataset.value) {
    emit("select", activeDataset.value);
  }
};
</script>

<template>
  <a-modal :open="open" title="选择数据集" width="1000px" :footer="null" @cancel="emit('close')">
    <div class="modal-search">
      <a-input v-model:value="keyword" placeholder="输入数据集名称">
        <template #suffix><SearchOutlined /></template>
      </a-input>
      <a-button @click="keyword = ''">清空</a-button>
    </div>
    <div class="modal-meta">
      <span>返回</span>
      <span>全部</span>
      <span>全部项目</span>
      <b>查询结果</b>
      <em>{{ datasets.length }} 数据集</em>
    </div>
    <div class="dataset-pane">
      <div class="dataset-list">
        <button v-for="dataset in filteredDatasets" :key="dataset.id" type="button" class="dataset-row" :class="{ active: dataset.id === activeId }" @click="activeId = dataset.id">
          <strong>{{ dataset.name }}</strong>
          <span>路径：{{ dataset.path }}</span>
          <i>{{ dataset.mode === "access" ? "接入" : "手工" }}</i>
          <i class="green">表格</i>
        </button>
      </div>
      <div v-if="activeDataset" class="dataset-detail">
        <h3>{{ activeDataset.name }}</h3>
        <a-tabs v-model:active-key="activeTab">
          <a-tab-pane key="base" tab="基本信息">
            <p>路径：{{ activeDataset.path }}</p>
            <p>版本：{{ activeDataset.version }}</p>
            <p>类型：{{ activeDataset.mode === "access" ? "接入" : "手工" }} 表格</p>
            <p>数据更新时间：{{ activeDataset.updatedAt }}</p>
          </a-tab-pane>
          <a-tab-pane key="fields" tab="列信息">
            <a-tag v-for="field in activeDataset.fields" :key="field.name">{{ field.name }} / {{ field.type }}</a-tag>
          </a-tab-pane>
          <a-tab-pane key="preview" tab="数据预览">
            <a-empty description="暂无预览数据" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="modal-footer">
      <a-button @click="emit('close')">取消</a-button>
      <a-button type="primary" @click="onSelect">选择</a-button>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
.modal-search {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin-bottom: 14px;
}

.modal-meta {
  display: flex;
  align-items: center;
  color: var(--matrix-text-muted);
  gap: 18px;
  margin-bottom: 12px;
}

.modal-meta b {
  color: var(--matrix-text);
  font-weight: 500;
}

.modal-meta em {
  margin-left: auto;
  font-style: normal;
}

.dataset-pane {
  display: grid;
  grid-template-columns: 55% 45%;
  min-height: 430px;
  border: 1px solid var(--matrix-divider);
}

.dataset-list {
  border-right: 1px solid var(--matrix-divider);
}

.dataset-row {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 78px;
  padding: 14px 112px 12px 28px;
  text-align: left;
  background: var(--matrix-white);
  border: 0;
  border-bottom: 1px solid var(--matrix-divider);
  cursor: pointer;
  gap: 8px;
}

.dataset-row.active,
.dataset-row:hover {
  background: var(--matrix-soft-bg);
}

.dataset-row span {
  color: var(--matrix-text-muted);
}

.dataset-row i {
  position: absolute;
  top: 18px;
  right: 58px;
  padding: 3px 8px;
  color: var(--matrix-primary);
  font-style: normal;
  background: #e8f3ff;
  border: 1px solid #b8d7ff;
  border-radius: 2px;
}

.dataset-row i.green {
  right: 12px;
  color: #14a85a;
  background: #ecf8f0;
  border-color: #b1e9c8;
}

.dataset-detail {
  padding: 18px 24px;
}

.dataset-detail h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 10px;
}
</style>

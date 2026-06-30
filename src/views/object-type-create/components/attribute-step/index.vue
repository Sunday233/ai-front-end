<template>
  <div class="attribute-step">
    <section class="attribute-step__column">
      <label>主键</label>
      <Select :value="primaryRowId" class="attribute-step__select" @change="onPrimaryChange">
        <SelectOption v-for="row in rows" :key="row.id" :value="row.id">
          {{ row.sourceField.name }}
        </SelectOption>
      </Select>

      <label>数据集字段</label>
      <div v-for="row in rows" :key="row.id" class="attribute-step__field">
        <span class="attribute-step__type">{{ typeText[row.sourceField.type] }}</span>
        <span>{{ row.sourceField.name }}</span>
        <Tag v-if="row.primaryKey">主键</Tag>
        <DownOutlined />
      </div>
      <Button>
        <template #icon>
          <PlusOutlined />
        </template>
        添加属性
      </Button>
    </section>

    <section class="attribute-step__column attribute-step__column--target">
      <label>标题键</label>
      <Select :value="titleRowId" class="attribute-step__select" @change="onTitleChange">
        <SelectOption v-for="row in rows" :key="row.id" :value="row.id">
          {{ row.attributeName }}
        </SelectOption>
      </Select>

      <label>属性名称</label>
      <div v-for="row in rows" :key="row.id" class="attribute-step__mapping">
        <Select :value="row.attributeType" class="attribute-step__type-select">
          <SelectOption value="int">Int</SelectOption>
          <SelectOption value="float">Float</SelectOption>
          <SelectOption value="date">Date</SelectOption>
          <SelectOption value="string">String</SelectOption>
        </Select>
        <Input :value="row.attributeName" :maxlength="64" @change="onNameChange(row.id, $event)" />
        <Tag v-if="row.primaryKey">主键</Tag>
        <span class="attribute-step__count">{{ row.attributeName.length }} / 64</span>
        <Button v-if="row.removable" type="text" danger class="attribute-step__delete" @click="removeRow(row.id)">
          <DeleteOutlined />
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type {
  AttributeMappingRow,
  AttributeType,
} from "@/types/object-type-create/model";
import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { Button, Input, Select, SelectOption, Tag } from "ant-design-vue";
import { computed } from "vue";

interface AttributeStepProps {
  rows: AttributeMappingRow[];
}

const props = defineProps<AttributeStepProps>();

const emit = defineEmits<{
  update: [rows: AttributeMappingRow[]];
  "primary-change": [row: AttributeMappingRow];
}>();

const typeText: Record<AttributeType, string> = {
  int: "INT",
  float: "FLO",
  string: "Aa",
  boolean: "Bool",
  datetime: "Date",
  date: "Date",
};

const primaryRowId = computed(
  () => props.rows.find((row) => row.primaryKey)?.id,
);
const titleRowId = computed(() => props.rows.find((row) => row.titleKey)?.id);

const onPrimaryChange = (rowId: unknown) => {
  const row = props.rows.find((item) => item.id === rowId);

  if (row) {
    emit("primary-change", row);
  }
};

const onTitleChange = (rowId: unknown) => {
  const nextRows = props.rows.map((row) => ({
    ...row,
    titleKey: row.id === rowId,
  }));
  emit("update", nextRows);
};

const onNameChange = (rowId: string, event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const nextRows = props.rows.map((row) =>
    row.id === rowId ? { ...row, attributeName: value } : row,
  );
  emit("update", nextRows);
};

const removeRow = (rowId: string) => {
  emit(
    "update",
    props.rows.filter((row) => row.id !== rowId),
  );
};
</script>

<style scoped lang="scss">
.attribute-step {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 260px;
  padding: 56px 74px;
}

.attribute-step__column {
  label {
    display: block;
    margin-bottom: 10px;
    color: var(--matrix-text-secondary);
  }

  label + .attribute-step__select {
    margin-bottom: 16px;
  }
}

.attribute-step__select {
  width: 352px;
}

.attribute-step__field,
.attribute-step__mapping {
  display: grid;
  align-items: center;
  min-height: 32px;
  margin-bottom: 8px;
}

.attribute-step__field {
  grid-template-columns: 28px 1fr auto 18px;
  gap: 8px;
  width: 352px;
  padding: 0 8px;
  border: 1px solid var(--matrix-border);
  border-radius: 4px;
}

.attribute-step__mapping {
  grid-template-columns: 120px 220px auto 58px 32px;
  gap: 8px;
}

.attribute-step__type {
  color: var(--matrix-primary);
  font-size: 11px;
}

.attribute-step__type-select {
  width: 120px;
}

.attribute-step__count {
  color: var(--matrix-text-muted);
  text-align: right;
}

.attribute-step__delete {
  padding: 0;
}
</style>

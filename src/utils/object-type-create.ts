import type {
  AttributeMappingRow,
  DatasetColumn,
} from '@/types/object-type-create/model';

const DATASET_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]{0,127}$/;
const OBJECT_TYPE_NAME_PATTERN = /^[\u4e00-\u9fa5A-Za-z0-9-]{1,64}$/;
const OBJECT_TYPE_ID_PATTERN = /^[a-z][a-z0-9-]{0,63}$/;

export const createInitialMappingRows = (
  columns: DatasetColumn[],
): AttributeMappingRow[] => {
  return columns.map((column) => {
    const isPrimary = Boolean(column.primary);

    return {
      id: column.fieldName,
      sourceField: {
        name: column.fieldName,
        type: column.fieldType,
        primary: isPrimary,
      },
      targetAttribute: {
        name: column.displayName,
        type: column.fieldType,
        readonly: true,
      },
      removable: !isPrimary,
    };
  });
};

export const validateDatasetName = (datasetName: string) => {
  if (!datasetName.trim()) {
    return '数据集名称必填';
  }

  if (!DATASET_NAME_PATTERN.test(datasetName)) {
    return '数据集名称需以字母开头，仅支持字母、数字、下划线';
  }

  return null;
};

export const validateObjectTypeName = (objectTypeName: string) => {
  if (!objectTypeName.trim()) {
    return '对象类型显示名称必填';
  }

  if (!OBJECT_TYPE_NAME_PATTERN.test(objectTypeName)) {
    return '对象类型显示名称仅支持中英文、数字、短横线';
  }

  return null;
};

export const validateObjectTypeId = (objectTypeId: string) => {
  if (!objectTypeId.trim()) {
    return '对象类型 ID 必填';
  }

  if (!OBJECT_TYPE_ID_PATTERN.test(objectTypeId)) {
    return '对象类型 ID 仅支持小写字母、数字、短横线，且需以小写字母开头';
  }

  return null;
};

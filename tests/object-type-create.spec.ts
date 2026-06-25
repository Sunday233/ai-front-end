import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it } from 'vitest';
import { setupObjectTypeCreateMock } from '@/services/object-type-create.mock';
import type { DatasetColumn } from '@/types/object-type-create/model';
import {
  createInitialMappingRows,
  validateDatasetName,
  validateObjectTypeId,
  validateObjectTypeName,
} from '@/utils/object-type-create';

const columns: DatasetColumn[] = [
  {
    fieldName: 'emp_no',
    displayName: 'emp_no',
    fieldType: 'int',
    primary: true,
  },
  { fieldName: 'hight', displayName: 'hight', fieldType: 'float' },
];

describe('object type create utilities', () => {
  it('creates one-to-one mapping rows from dataset columns and preserves hight spelling', () => {
    expect(createInitialMappingRows(columns)).toEqual([
      {
        id: 'emp_no',
        sourceField: { name: 'emp_no', type: 'int', primary: true },
        targetAttribute: { name: 'emp_no', type: 'int', readonly: true },
        removable: false,
      },
      {
        id: 'hight',
        sourceField: { name: 'hight', type: 'float', primary: false },
        targetAttribute: { name: 'hight', type: 'float', readonly: true },
        removable: true,
      },
    ]);
  });

  it('validates dataset, object type name, and object type id rules from the PRD', () => {
    expect(validateDatasetName('Dataset_001')).toBeNull();
    expect(validateDatasetName('1bad')).toBe(
      '数据集名称需以字母开头，仅支持字母、数字、下划线',
    );
    expect(validateObjectTypeName('回归测试-1')).toBeNull();
    expect(validateObjectTypeName('bad name')).toBe(
      '对象类型显示名称仅支持中英文、数字、短横线',
    );
    expect(validateObjectTypeId('object-type-1')).toBeNull();
    expect(validateObjectTypeId('Object-Type')).toBe(
      '对象类型 ID 仅支持小写字母、数字、短横线，且需以小写字母开头',
    );
  });

  it('keeps local object type name validation messages before duplicate-name checks', async () => {
    const instance = axios.create();
    const mock = new MockAdapter(instance);
    setupObjectTypeCreateMock(mock);

    const invalidFormat = await instance.get(
      '/mock/object-type-create/validate-name',
      {
        params: { objectTypeName: 'bad name' },
      },
    );
    const duplicateName = await instance.get(
      '/mock/object-type-create/validate-name',
      {
        params: { objectTypeName: '回归测试1' },
      },
    );

    expect(invalidFormat.data.data).toEqual({
      valid: false,
      message: '对象类型显示名称仅支持中英文、数字、短横线',
    });
    expect(duplicateName.data.data).toEqual({
      valid: false,
      message: '对象类型显示名称已存在',
    });
  });
});

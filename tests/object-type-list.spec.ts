import { describe, expect, it } from 'vitest';
import type { ObjectTypeListItem } from '@/types/object-type-list/model';
import {
  filterObjectTypeRows,
  getHighlightedSegments,
} from '@/utils/object-type-list';

const rows: ObjectTypeListItem[] = [
  {
    id: 'ot-1',
    rid: 'RID-001',
    icon: 'object',
    name: '回归测试1',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2026-01-06 16:41:43',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-2',
    rid: 'RID-002',
    icon: 'object',
    name: 'employee',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2025-11-27 17:52:56',
    operatorPermissions: ['detail'],
  },
];

describe('object type list utilities', () => {
  it('filters by name, id, or rid and keeps results ordered by updatedAt descending', () => {
    expect(
      filterObjectTypeRows(rows, 'RID-002').map((row) => row.name),
    ).toEqual(['employee']);
    expect(filterObjectTypeRows(rows, 'ot-1').map((row) => row.name)).toEqual([
      '回归测试1',
    ]);
    expect(filterObjectTypeRows(rows, '').map((row) => row.name)).toEqual([
      '回归测试1',
      'employee',
    ]);
  });

  it('splits highlighted keyword segments without changing the source text', () => {
    expect(getHighlightedSegments('employee', 'plo')).toEqual([
      { text: 'em', hit: false },
      { text: 'plo', hit: true },
      { text: 'yee', hit: false },
    ]);
  });
});

import dayjs from 'dayjs';
import type { ObjectTypeListItem } from '@/types/object-type-list/model';

export interface HighlightSegment {
  text: string;
  hit: boolean;
}

const compareByUpdatedAtDesc = (
  left: ObjectTypeListItem,
  right: ObjectTypeListItem,
) => {
  return dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf();
};

export const filterObjectTypeRows = (
  rows: ObjectTypeListItem[],
  keyword: string,
) => {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const sortedRows = [...rows].sort(compareByUpdatedAtDesc);

  if (!normalizedKeyword) {
    return sortedRows;
  }

  return sortedRows.filter((row) => {
    return [row.id, row.rid, row.name].some((value) => {
      return value.toLowerCase().includes(normalizedKeyword);
    });
  });
};

export const getHighlightedSegments = (
  text: string,
  keyword: string,
): HighlightSegment[] => {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return [{ text, hit: false }];
  }

  const lowerText = text.toLowerCase();
  const segments: HighlightSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const hitIndex = lowerText.indexOf(normalizedKeyword, cursor);

    if (hitIndex === -1) {
      segments.push({ text: text.slice(cursor), hit: false });
      break;
    }

    if (hitIndex > cursor) {
      segments.push({ text: text.slice(cursor, hitIndex), hit: false });
    }

    segments.push({
      text: text.slice(hitIndex, hitIndex + normalizedKeyword.length),
      hit: true,
    });
    cursor = hitIndex + normalizedKeyword.length;
  }

  return segments.filter((segment) => segment.text.length > 0);
};

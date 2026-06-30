export interface SearchableObject {
  id: string;
  rid?: string;
  name: string;
  updatedAt?: string;
}

export const normalizeKeyword = (keyword?: string) =>
  keyword?.trim().toLowerCase() ?? "";

export const filterByObjectKeyword = <T extends SearchableObject>(
  items: T[],
  keyword?: string,
) => {
  const normalized = normalizeKeyword(keyword);

  if (!normalized) {
    return [...items];
  }

  return items.filter((item) => {
    const fields = [item.id, item.rid, item.name]
      .filter(Boolean)
      .map((field) => String(field).toLowerCase());
    return fields.some(
      (field) =>
        field === normalized ||
        field.startsWith(normalized) ||
        field.includes(normalized),
    );
  });
};

export const sortByUpdatedAtDesc = <T extends SearchableObject>(items: T[]) => {
  return [...items].sort((left, right) => {
    const leftTime = left.updatedAt ? new Date(left.updatedAt).getTime() : 0;
    const rightTime = right.updatedAt ? new Date(right.updatedAt).getTime() : 0;
    return rightTime - leftTime;
  });
};

export const paginate = <T>(items: T[], pageNo: number, pageSize: number) => {
  const safePageNo = Math.max(1, pageNo);
  const safePageSize = Math.max(1, pageSize);
  const start = (safePageNo - 1) * safePageSize;
  return items.slice(start, start + safePageSize);
};

export const highlightKeyword = (text: string, keyword?: string) => {
  const normalized = normalizeKeyword(keyword);

  if (!normalized) {
    return text;
  }

  const index = text.toLowerCase().indexOf(normalized);

  if (index < 0) {
    return text;
  }

  return `${text.slice(0, index)}<mark>${text.slice(index, index + normalized.length)}</mark>${text.slice(
    index + normalized.length,
  )}`;
};

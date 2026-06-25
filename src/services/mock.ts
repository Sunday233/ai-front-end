import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '@/services/client';
import { setupObjectTypeCreateMock } from '@/services/object-type-create.mock';
import { setupObjectTypeListMock } from '@/services/object-type-list.mock';
import { setupWorkbenchMock } from '@/services/workbench.mock';

export const setupApiMock = () => {
  const apiMode = import.meta.env.VITE_API_MODE ?? 'mock';

  if (apiMode !== 'mock') {
    return;
  }

  const mock = new MockAdapter(axiosInstance, { delayResponse: 220 });

  setupWorkbenchMock(mock);
  setupObjectTypeListMock(mock);
  setupObjectTypeCreateMock(mock);
};

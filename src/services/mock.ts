import { axiosInstance } from "@/services/client";
import { setupObjectTypeCreateMock } from "@/services/object-type-create.mock";
import { setupObjectTypeListMock } from "@/services/object-type-list.mock";
import { setupWorkbenchMock } from "@/services/workbench.mock";
import MockAdapter from "axios-mock-adapter";

let activeMock: MockAdapter | null = null;

export const resetApiMock = () => {
  activeMock?.restore();
  activeMock = null;
};

export const setupApiMock = () => {
  const mode = import.meta.env.VITE_API_MODE ?? "mock";

  if (mode !== "mock") {
    return;
  }

  if (activeMock) {
    return;
  }

  activeMock = new MockAdapter(axiosInstance, { delayResponse: 120 });
  setupWorkbenchMock(activeMock);
  setupObjectTypeListMock(activeMock);
  setupObjectTypeCreateMock(activeMock);
};

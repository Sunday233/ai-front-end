import { axiosInstance } from "@/services/client";
import { setupObjectTypeCreateMock } from "@/services/object-type-create.mock";
import { setupObjectTypeListMock } from "@/services/object-type-list.mock";
import { setupWorkbenchMock } from "@/services/workbench.mock";
import MockAdapter from "axios-mock-adapter";

export const setupApiMock = () => {
  if (import.meta.env.VITE_API_MODE === "real") {
    return;
  }

  const mock = new MockAdapter(axiosInstance, { delayResponse: 240 });

  setupWorkbenchMock(mock);
  setupObjectTypeListMock(mock);
  setupObjectTypeCreateMock(mock);
};

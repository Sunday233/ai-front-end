import {defineStore} from 'pinia';

import type {
  AttributeConfigItem,
  CreateObjectTypePayload,
  DataSourceMode,
} from '@/types/object-type/api';

const createDefaultAttributes = (): AttributeConfigItem[] => [
  {
    id: 'primary-key',
    type: 'string',
    name: '人员ID',
    role: 'primary',
  },
  {
    id: 'label-key',
    type: 'string',
    name: '人员名称',
    role: 'label',
  },
  {
    id: 'created-at',
    type: 'date',
    name: '创建时间',
  },
];

const createInitialForm = (): CreateObjectTypePayload => ({
  source: {
    mode: 'new-schema',
    dataSourceName: '',
    savePath: '',
  },
  metadata: {
    objectTypeName: '',
    alias: '',
    description: '',
    groups: [],
  },
  attributes: {
    primaryKey: '人员ID',
    labelKey: '人员名称',
    attributes: createDefaultAttributes(),
  },
  actions: {
    actions: [],
    actorGroup: '用户组1',
  },
});

export const useObjectTypeCreateStore = defineStore('objectTypeCreate', {
  state: () => ({
    currentStep: 0,
    form: createInitialForm(),
  }),
  actions: {
    setStep(step: number) {
      this.currentStep = Math.max(0, Math.min(3, step));
    },
    nextStep() {
      this.setStep(this.currentStep + 1);
    },
    prevStep() {
      this.setStep(this.currentStep - 1);
    },
    setSourceMode(mode: DataSourceMode) {
      this.form.source.mode = mode;
    },
    addAttribute() {
      this.form.attributes.attributes.push({
        id: `attr-${Date.now()}`,
        type: 'string',
        name: '',
      });
    },
    removeAttribute(attributeId: string) {
      this.form.attributes.attributes = this.form.attributes.attributes.filter(
        (item) => item.id !== attributeId || item.role === 'primary' || item.role === 'label'
      );
    },
    reset() {
      this.currentStep = 0;
      this.form = createInitialForm();
    },
  },
});

<template>
  <div class="pageWrap">
    <h2 class="pageTitle">创建对象类型</h2>

    <a-card :bordered="false" class="stepCard">
      <a-steps :current="store.currentStep" :items="stepItems" />
    </a-card>

    <a-card :bordered="false" class="contentCard">
      <StepSource
        v-if="store.currentStep === 0"
        :form="store.form.source"
        @update:form="onSourceFormUpdate"
      />
      <StepMetadata
        v-if="store.currentStep === 1"
        :form="store.form.metadata"
        @update:form="onMetadataFormUpdate"
      />
      <StepAttributes
        v-if="store.currentStep === 2"
        :form="store.form.attributes"
        @update:form="onAttributesFormUpdate"
        @add-attribute="store.addAttribute"
        @remove-attribute="store.removeAttribute"
      />
      <StepActions
        v-if="store.currentStep === 3"
        :form="store.form.actions"
        @update:form="onActionsFormUpdate"
      />

      <div class="actionRow">
        <a-button v-if="store.currentStep > 0" @click="onPrev">上一步</a-button>
        <a-button v-if="store.currentStep < 3" type="primary" @click="onNext">下一步</a-button>
        <a-button v-else type="primary" :loading="submitting" @click="onFinish">完成</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {message} from 'ant-design-vue';
import {useRouter} from 'vue-router';

import {createObjectType} from '@/services/objectType';
import {useObjectTypeCreateStore} from '@/stores/objectTypeCreate';
import type {
  ActionConfig,
  AttributeConfig,
  MetadataConfig,
  SourceConfig,
} from '@/types/object-type/api';

import StepActions from './components/step-actions.vue';
import StepAttributes from './components/step-attributes.vue';
import StepMetadata from './components/step-metadata.vue';
import StepSource from './components/step-source.vue';

const router = useRouter();
const store = useObjectTypeCreateStore();

const submitting = ref(false);

const stepItems = [
  {
    title: '选择数据源',
    description: '请选择一个数据源创建',
  },
  {
    title: '元数据配置',
    description: '请配置元数据信息',
  },
  {
    title: '属性配置',
    description: '请关联所需属性',
  },
  {
    title: '动作配置',
    description: '请关联动作配置',
  },
];

const canProceed = computed(() => {
  if (store.currentStep === 0) {
    return store.form.source.dataSourceName.trim().length > 0 && store.form.source.savePath.length > 0;
  }
  if (store.currentStep === 1) {
    return store.form.metadata.objectTypeName.trim().length > 0;
  }
  if (store.currentStep === 2) {
    return store.form.attributes.attributes.every((item) => item.name.trim().length > 0);
  }
  return store.form.actions.actions.length > 0;
});

const onSourceFormUpdate = (value: SourceConfig) => {
  store.form.source = value;
};

const onMetadataFormUpdate = (value: MetadataConfig) => {
  store.form.metadata = value;
};

const onAttributesFormUpdate = (value: AttributeConfig) => {
  store.form.attributes = value;
};

const onActionsFormUpdate = (value: ActionConfig) => {
  store.form.actions = value;
};

const onPrev = () => {
  store.prevStep();
};

const onNext = () => {
  if (!canProceed.value) {
    message.warning('请先补齐当前步骤的必填信息');
    return;
  }
  store.nextStep();
};

const onFinish = async () => {
  if (!canProceed.value) {
    message.warning('请先选择至少一个动作类型');
    return;
  }

  submitting.value = true;
  try {
    await createObjectType(store.form);
    message.success('对象类型创建成功');
    store.reset();
    await router.push('/object-type/list');
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  store.reset();
});
</script>

<style scoped lang="scss">
.pageWrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pageTitle {
  margin: 0;
  color: var(--shell-title);
  font-size: 24px;
}

.stepCard,
.contentCard {
  border-radius: 8px;
  box-shadow: var(--shell-card-shadow);
}

.contentCard {
  min-height: 420px;
}

.actionRow {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>

<script setup lang="ts">
import { Admin } from '@/features/admin';
import { t } from '@/localization';
import { HOUR_IN_MS, MINUTE_IN_MS } from '@/shared/constants';
import { AppRadio } from '@/components';
import { computed } from 'vue';

const model = defineModel<number>();

const intervalOptions = [
  {
    label: t('interval.hour'),
    value: HOUR_IN_MS
  },
  {
    label: t('interval.minute'),
    value: MINUTE_IN_MS
  },
  {
    label: t('interval.order'),
    value: 0
  }
];

const hideTitle = computed(() => model.value === MINUTE_IN_MS)
</script>

<template>
  <Admin>
    <div v-if="!hideTitle" class="text-body-2">
      {{ t('interval.title') }}
    </div>

    <AppRadio v-model="model" :options="intervalOptions" />
  </Admin>
</template>

<style scoped lang="scss"></style>

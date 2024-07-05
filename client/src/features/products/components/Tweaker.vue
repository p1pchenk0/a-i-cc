<script setup lang="ts">
import Admin from '@/features/admin/Admin.vue';
import { HOUR_IN_MS, MINUTE_IN_MS } from '@/features/products/constants';
import { t } from '@/localization';

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
</script>

<template>
  <Admin>
    <div class="text-body-2">
      {{ t('interval.title') }}
    </div>

    <v-radio-group v-model="model">
      <v-radio
        v-for="option in intervalOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>
  </Admin>
</template>

<style scoped lang="scss"></style>

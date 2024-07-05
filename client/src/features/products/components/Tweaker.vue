<script setup lang="ts">
import Admin from '@/features/admin/Admin.vue';
import { HOUR_IN_MS, MINUTE_IN_MS } from '@/features/products/constants';

const model = defineModel<number>();

const intervalOptions = [
  {
    label: 'One hour',
    value: HOUR_IN_MS
  },
  {
    label: 'One minute',
    value: MINUTE_IN_MS
  },
  {
    label: "Ain't nobody got time for that (once per order)",
    value: 0
  }
];
</script>

<template>
  <Admin>
    <div class="text-body-2">
      Waiting whole hour to check whether lottery works as expected can be... dramatically boring.
      With the help of these switches we can reduce waiting time:
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

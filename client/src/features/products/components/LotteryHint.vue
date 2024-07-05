<script setup lang="ts">
import { t } from '@/localization';

const lotteryText = t('lottery.hint');
</script>

<template>
  <v-tooltip :text="lotteryText" content-class="bg-teal" :width="300" location="bottom">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props">
        <div>{{ t('lottery.title') }}</div>
        <v-icon class="ml-2" icon="mdi-information-outline" />
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { t } from '@/localization';
import { AppChip, AppIcon, AppTooltip } from '@/components';

const lotteryText = t('lottery.hint');
</script>

<template>
  <AppTooltip :text="lotteryText" content-class="bg-teal" :width="300" location="bottom">
    <template v-slot:activator="{ props }">
      <AppChip v-bind="props">
        <div>{{ t('lottery.title') }}</div>
        <AppIcon class="ml-2" name="mdi-information-outline" />
      </AppChip>
    </template>
  </AppTooltip>
</template>

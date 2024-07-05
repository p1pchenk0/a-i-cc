<script setup lang="ts">
import { FONTS, MAX_CHARS_ON_CANVAS } from '@/features/photo/constants';

const inputRules = [(v: string) => v.length < MAX_CHARS_ON_CANVAS || 'Limit exceeded'];

const mirror = defineModel<boolean>('mirror');
const activeFont = defineModel<string>('activeFont');
const textOnScreen = defineModel<string>('textOnScreen');

const hint = `No more than ${MAX_CHARS_ON_CANVAS} chars`;

function onTextUpdate(e: string | null) {
  textOnScreen.value = (e || '').slice(0, MAX_CHARS_ON_CANVAS);
}
</script>

<template>
  <div class="d-flex ga-2 ga-md-4 flex-column flex-md-row w-100">
    <v-checkbox hide-details label="Toggle mirror" v-model="mirror" />
    <v-text-field
      label="Text on screen"
      :hint="hint"
      clearable
      persistent-hint
      persistent-clear
      :rules="inputRules"
      :model-value="textOnScreen"
      @update:model-value="onTextUpdate"
    />
    <v-select v-model="activeFont" label="Font" :items="FONTS"></v-select>
  </div>
</template>

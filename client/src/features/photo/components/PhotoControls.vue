<script setup lang="ts">
import { FONTS, MAX_CHARS_ON_CANVAS } from '@/features/photo/constants';
import { t } from '@/localization';

const inputRules = [(v: string) => v.length < MAX_CHARS_ON_CANVAS || 'Limit exceeded'];

const mirror = defineModel<boolean>('mirror');
const activeFont = defineModel<string>('activeFont');
const textOnScreen = defineModel<string>('textOnScreen');

const hint = t('photo-controls.char-limit', { count: MAX_CHARS_ON_CANVAS });

function onTextUpdate(e: string | null) {
  textOnScreen.value = (e || '').slice(0, MAX_CHARS_ON_CANVAS);
}
</script>

<template>
  <div class="d-flex ga-2 ga-md-4 flex-column flex-md-row w-100">
    <v-checkbox hide-details :label="t('photo-controls.toggle-mirror')" v-model="mirror" />
    <v-text-field
      :label="t('photo-controls.text-on-screen')"
      :hint="hint"
      clearable
      persistent-hint
      persistent-clear
      :rules="inputRules"
      :model-value="textOnScreen"
      @update:model-value="onTextUpdate"
    />
    <v-select v-model="activeFont" :label="t('photo-controls.font')" :items="FONTS"></v-select>
  </div>
</template>

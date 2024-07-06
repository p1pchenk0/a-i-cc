<script setup lang="ts">
import { Admin } from '@/features/admin';
import { computed } from 'vue';
import { t } from '@/localization';

const hint = t('reverse.hint');

const props = defineProps<{ text: string }>();

const fullyReversedText = computed(() => props.text.split('').reverse().join(''));
const wordsReversed = computed(() => props.text.split(' ').reverse().join(' '));
</script>

<template>
  <Admin>
    <div>{{ t('reverse.all') }}</div>
    <div class="font-weight-bold">{{ fullyReversedText || hint }}</div>
    <div>{{ t('reverse.words') }}</div>
    <div class="font-weight-bold">{{ wordsReversed || hint }}</div>
  </Admin>
</template>

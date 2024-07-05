<script setup lang="ts">
import Admin from '@/features/admin/Admin.vue';
import { computed } from 'vue';

const hint = 'Write something in input';

const props = defineProps<{ text: string }>();

const fullyReversedText = computed(() => props.text.split('').reverse().join(''));
const wordsReversed = computed(() => props.text.split(' ').reverse().join(' '));
</script>

<template>
  <Admin>
    <div>Who doesn't like good old string reverse?</div>
    <div class="font-weight-bold">{{ fullyReversedText || hint }}</div>
    <div>Or only words order? Hold my lemonade</div>
    <div class="font-weight-bold">{{ wordsReversed || hint }}</div>
  </Admin>
</template>

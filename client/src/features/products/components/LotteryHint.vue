<script setup lang="ts">
const lotteryText =
  'Each time you make a new order, our lottery system checks whether you can get two other prints for free';
</script>

<template>
  <v-tooltip :text="lotteryText" content-class="bg-teal" :width="300" location="bottom">
    <template v-slot:activator="{ props }">
      <v-chip v-bind="props">
        <div>Chance to win extra prints!</div>
        <v-icon class="ml-2" icon="mdi-information-outline" />
      </v-chip>
    </template>
  </v-tooltip>
</template>

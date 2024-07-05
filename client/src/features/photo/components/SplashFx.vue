<script setup lang="ts">
const model = defineModel<boolean>();

function onFxEnd() {
  model.value = false;
}
</script>

<template>
  <div
    :class="[
      'position-absolute left-0 right-0 top-0 bottom-0 photo-fx',
      { 'photo-fx--active': model }
    ]"
    @transitionend="onFxEnd"
  ></div>
</template>

<style scoped lang="scss">
.photo-fx {
  transition: opacity 0.1s linear;
  opacity: 0;
  background-color: white;

  &--active {
    opacity: 1;
  }
}
</style>

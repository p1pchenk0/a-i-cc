<template>
  <div class="admin-panel position-fixed bottom-0 text-green bg-grey-darken-4 pa-4">
    <div class="mb-3 text-h5">Admin panel</div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.admin-panel {
  width: 500px;
  right: -430px;
  transition: all 0.3s ease-in-out;

  &:hover {
    right: 0;
  }

  &,
  * {
    font-family: monospace !important;
  }
}
</style>

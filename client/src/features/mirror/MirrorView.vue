<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { streamVideo } from '@/features/mirror/utils';
import type { VCard } from 'vuetify/components';

const maxChars = 30;
const isSnackbarShown = ref(false);
const isMirrorOn = ref(false);
const textOnScreen = ref('');
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const containerRef = ref<InstanceType<typeof VCard>>();

const onTextUpdate = (e: string | null) => {
  textOnScreen.value = (e || '').slice(0, maxChars);
};

async function initVideo() {
  try {
    await streamVideo({
      videoEl: videoRef.value,
      canvas: canvasRef.value,
      container: containerRef.value?.$el,
      mirrorGetter: () => isMirrorOn.value,
      textGetter: () => textOnScreen.value
    });
  } catch (err) {
    isSnackbarShown.value = true;
  }
}

onMounted(async () => {
  await initVideo();
});
</script>

<template>
  <v-card class="mirror-container my-10 mx-auto" ref="containerRef" elevation="16">
    <template #title> Mirror screen </template>
    <template #text>
      Use actions to toggle mirror mode and input field to add text on image
    </template>

    <video ref="videoRef" autoplay hidden></video>
    <canvas ref="canvasRef"></canvas>

    <template #actions>
      <div class="d-flex ga-sm-0 ga-md-4 flex-column flex-sm-column flex-md-row w-100">
        <v-checkbox hide-details label="Toggle mirror" v-model="isMirrorOn"></v-checkbox>
        <v-text-field
          label="Text on screen"
          :hint="`No more than ${maxChars} chars`"
          clearable
          persistent-hint
          persistent-clear
          :model-value="textOnScreen"
          @update:model-value="onTextUpdate"
          :rules="[(v) => v.length < maxChars || 'Limit exceeded']"
        ></v-text-field>
      </div>
    </template>
  </v-card>

  <v-snackbar v-model="isSnackbarShown">
    <div>Please, give permission for video capturing</div>
  </v-snackbar>
</template>

<style scoped lang="scss">
.mirror-container,
video {
  width: 640px;
  max-width: 50%;
}
</style>

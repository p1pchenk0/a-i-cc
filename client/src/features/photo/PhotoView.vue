<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { streamVideo } from '@/features/photo/utils';
import { FONTS } from '@/features/photo/constants';
import PageLayout from '@/layouts/PageLayout.vue';
import { usePhotoStore } from '@/features/photo/photo.store';
import { saveFile } from '@/shared/utils';
import AppButton from '@/components/AppButton.vue';
import PhotoControls from '@/features/photo/components/PhotoControls.vue';
import SplashFx from '@/features/photo/components/SplashFx.vue';
import Extras from '@/features/photo/components/Extras.vue';
import { useRouter } from 'vue-router';
import { routes } from '@/router/routes';

const router = useRouter();
const isPhotoTaken = ref(false);
const isSnackbarShown = ref(false);
const isMirrorOn = ref(false);
const textOnScreen = ref('Oh hi!');
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const layoutRef = ref<InstanceType<typeof PageLayout>>();
const stopListenToVideoStream = ref<Function | null>(null);
const activeFont = ref(FONTS[0]);

const isCameraStreaming = computed(() => !!stopListenToVideoStream.value);

function savePhoto(goToCart = false) {
  const dataURL = canvasRef.value!.toDataURL('image/png');

  if (goToCart) {
    usePhotoStore().setLastPhotoUrl(dataURL);

    router.push({ name: routes.products.name });

    return;
  }

  saveFile(dataURL, 'photo.png');

  isPhotoTaken.value = true;
}

async function initVideo() {
  try {
    stopListenToVideoStream.value = await streamVideo({
      videoEl: videoRef.value!,
      canvasEl: canvasRef.value!,
      containerEl: layoutRef.value!.getContainer(),
      mirrorFlagGetter: () => isMirrorOn.value,
      textGetter: () => textOnScreen.value,
      fontGetter: () => activeFont.value
    });

    // user may leave this page before webcam is fully on
    if (!videoRef.value) stopListenToVideoStream.value?.();
  } catch (err) {
    isSnackbarShown.value = true;
  }
}

onMounted(async () => {
  await initVideo();
});

onBeforeUnmount(() => {
  stopListenToVideoStream.value?.();
});
</script>

<template>
  <PageLayout ref="layoutRef">
    <template #title> Photo booth </template>
    <template #text>
      Use actions to toggle mirror mode and input field to add text on image
    </template>

    <video ref="videoRef" autoplay hidden class="w-100"></video>
    <div class="position-relative d-flex rounded overflow-hidden">
      <SplashFx v-model="isPhotoTaken" />
      <canvas ref="canvasRef"></canvas>
    </div>

    <PhotoControls
      class="mt-2 px-4"
      v-model:mirror="isMirrorOn"
      v-model:text-on-screen="textOnScreen"
      v-model:active-font="activeFont"
    />

    <template #actions>
      <AppButton
        :disabled="!isCameraStreaming"
        @click="savePhoto(false)"
        icon="mdi-content-save-outline"
      >
        Save photo
      </AppButton>

      <AppButton
        :disabled="!isCameraStreaming"
        @click="savePhoto(true)"
        color="success"
        icon="mdi-camera"
      >
        Take photo & proceed
      </AppButton>
    </template>
  </PageLayout>

  <v-snackbar v-model="isSnackbarShown">
    <div>Please, give permission for video capturing</div>
  </v-snackbar>

  <Extras :text="textOnScreen" />
</template>

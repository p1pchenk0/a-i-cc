<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { streamVideo } from '@/features/photo/utils';
import { FONTS } from '@/features/photo/constants';
import { PageLayout } from '@/layouts';
import { usePhotoStore } from '@/features/photo/photo.store';
import { saveFile } from '@/shared/utils';
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';
import { routes } from '@/router/routes';
import { t } from '@/localization';
import { Extras, PhotoControls, SplashFx } from '@/features/photo/components';

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
    <template #title>{{ t('photo-booth-page.title') }}</template>
    <template #text>
      {{ t('photo-booth-page.subtitle') }}
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
        @click="savePhoto(true)"
        color="success"
        icon="mdi-camera"
        size="large"
      >
        {{ t('photo-booth-page.take-and-proceed') }}
      </AppButton>

      <AppButton
        :disabled="!isCameraStreaming"
        @click="savePhoto(false)"
        icon="mdi-content-save-outline"
      >
        {{ t('photo-booth-page.save') }}
      </AppButton>
    </template>
  </PageLayout>

  <v-snackbar v-model="isSnackbarShown">
    <div>{{ t('photo-booth-page.no-permission') }}</div>
  </v-snackbar>

  <Extras :text="textOnScreen" />
</template>

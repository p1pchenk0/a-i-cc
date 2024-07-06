<script setup lang="ts">
import { Extras, PhotoActions, PhotoControls, SplashFx } from '@/features/photo/components';
import { FONTS } from '@/features/photo/constants';
import { PageLayout } from '@/layouts';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { routes } from '@/router/routes';
import { streamVideo } from '@/features/photo/utils';
import { t } from '@/localization';
import { usePhotoStore } from '@/features/photo/photo.store';
import { useRouter } from 'vue-router';
import { AppSnackbar } from '@/components';

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

const { savePhoto, setLastPhotoUrl } = usePhotoStore();

const isCameraStreaming = computed(() => !!stopListenToVideoStream.value);

function onPhotoAction(type: string) {
  const dataURL = canvasRef.value!.toDataURL('image/png');

  if (type === 'proceed') {
    setLastPhotoUrl(dataURL);

    router.push({ name: routes.products.name });

    return;
  }

  savePhoto(dataURL);

  isPhotoTaken.value = true;
}

async function initVideo() {
  try {
    stopListenToVideoStream.value = await streamVideo({
      videoEl: videoRef.value!,
      canvasEl: canvasRef.value!,
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
      <PhotoActions :disabled="!isCameraStreaming" @action="onPhotoAction" />
    </template>
  </PageLayout>

  <AppSnackbar v-model="isSnackbarShown">
    <div>{{ t('photo-booth-page.no-permission') }}</div>
  </AppSnackbar>

  <Extras :text="textOnScreen" />
</template>

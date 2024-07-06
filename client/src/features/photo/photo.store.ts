import { defineStore } from 'pinia';
import { ref } from 'vue';
import { saveFile } from '@/shared/utils';

export const usePhotoStore = defineStore('photo', () => {
  const lastPhotoUrl = ref('');
  function setLastPhotoUrl(url: string) {
    lastPhotoUrl.value = url;
  }

  function savePhoto(url: string) {
    saveFile(url, 'photo.png');
  }

  return { lastPhotoUrl, setLastPhotoUrl, savePhoto };
});

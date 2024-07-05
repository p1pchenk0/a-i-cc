import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePhotoStore = defineStore('photo', () => {
  const lastPhotoUrl = ref('');
  function setLastPhotoUrl(url: string) {
    lastPhotoUrl.value = url;
  }

  return { lastPhotoUrl, setLastPhotoUrl };
});

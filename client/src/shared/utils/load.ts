import { ref } from 'vue';

export const useLoader = <T extends (...args: any[]) => Promise<boolean>>(fn: T) => {
  const isLoading = ref(false);
  const isError = ref(false);

  async function load(...args: Parameters<T>): Promise<void> {
    isLoading.value = true;
    isError.value = false;

    const success = await fn(...args);

    isError.value = !success;
    isLoading.value = false;
  }

  return {
    load,
    isLoading,
    isError
  };
};

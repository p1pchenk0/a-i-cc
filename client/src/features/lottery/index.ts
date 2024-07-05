import { HOUR_IN_MS } from '@/features/products/constants';
import { getRandomBoolean } from '@/shared/utils';
import { ref } from 'vue';

export const useLottery = () => {
  const lastLotteryTimestamp = ref(0);
  const selectedLotteryInterval = ref(HOUR_IN_MS);
  const isLotteryPlayed = ref(false);

  function resetLottery() {
    isLotteryPlayed.value = false;
  }

  function isPrizeWon(): boolean {
    const currentTimestamp = Date.now();

    if (currentTimestamp - lastLotteryTimestamp.value < selectedLotteryInterval.value) return false;

    lastLotteryTimestamp.value = currentTimestamp;

    const shouldPlayLottery = getRandomBoolean();

    if (!shouldPlayLottery) return false;

    return getRandomBoolean();
  }

  function attemptLotteryPlay<T>(possiblePrize: T): T | null {
    if (isLotteryPlayed.value || !isPrizeWon()) {
      isLotteryPlayed.value = true;
      return null;
    }

    isLotteryPlayed.value = true;

    return possiblePrize;
  }

  return {
    attemptLotteryPlay,
    resetLottery,
    selectedLotteryInterval
  };
};

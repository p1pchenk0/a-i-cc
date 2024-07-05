import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { RawReport } from '@/features/report/types';
import { reportService } from '@/features/report/report.service';
import { useLoader } from '@/shared/utils/load';

export const useReportStore = defineStore('report', () => {
  const report = ref<RawReport>();

  const { load, isLoading, isError } = useLoader(getReport);

  async function getReport(month: number, year: number) {
    const result = await reportService.getReport(month, year);

    report.value = result.report;

    return result.success;
  }

  const isReportReady = computed(() => !!report.value && !isLoading.value);

  return {
    isErrorLoadingReport: isError,
    isReportReady,
    isReportLoading: isLoading,
    report,
    getReport: load
  };
});

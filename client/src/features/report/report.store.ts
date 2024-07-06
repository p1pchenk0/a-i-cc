import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { RawReport } from '@/features/report/types';
import { reportService } from '@/features/report/report.service';
import { useLoader } from '@/shared/utils/load';

export const useReportStore = defineStore('report', () => {
  const report = ref<RawReport>();

  const { load, isLoading, isError } = useLoader(getReport);
  const {
    load: loadCustomReport,
    isLoading: isCustomReportLoading,
    isError: isCustomReportError
  } = useLoader(getCustomReport);

  async function getCustomReport(income: number) {
    const result = await reportService.getCustomReport(income);

    report.value = result.report;

    return result.success;
  }

  async function getReport(month: number, year: number) {
    const result = await reportService.getReport(month, year);

    report.value = result.report;

    return result.success;
  }

  const isReportLoading = computed(() => isLoading.value || isCustomReportLoading.value);
  const isErrorLoadingReport = computed(() => isError.value || isCustomReportError.value);
  const isReportReady = computed(() => !!report.value && !isReportLoading.value);

  return {
    isErrorLoadingReport,
    isReportReady,
    isReportLoading,
    report,
    getReport: load,
    getCustomReport: loadCustomReport
  };
});

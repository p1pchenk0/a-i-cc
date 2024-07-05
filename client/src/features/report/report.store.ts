import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RawReport } from '@/features/report/types';
import { reportService } from '@/features/report/report.service';

export const useReportStore = defineStore('report', () => {
  const report = ref<RawReport>();

  async function getReport(month: number, year: number) {
    report.value = await reportService.getReport(month, year);
  }

  return {
    report,
    getReport
  };
});
